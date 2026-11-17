"""Trace local imports from Next.js entries and static assets from reachable files.

Produces a reviewable report; deletion requires the explicit --remove flag.
Project metadata, reference material, scripts, documentation and generated folders
are excluded from deletion. Declaration modules are checked against package imports.
"""
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
PUBLIC = ROOT / "public"
REPORT = ROOT / "artifacts/cleanup" / ("removal-report.json" if "--remove" in sys.argv else "unused-files.json")
SOURCE_EXTENSIONS = {".tsx", ".ts", ".css", ".scss", ".svg"}
files = {p.resolve() for base in [SRC, PUBLIC] for p in base.rglob("*") if p.is_file()}
visited = set()
external_imports = set()
unresolved = []

def read(path):
    return path.read_text(encoding="utf-8", errors="replace")

def resolve_local(owner, spec):
    base = SRC / spec[2:] if spec.startswith("@/") else owner.parent / spec
    candidates = [base] + [Path(str(base) + ext) for ext in [".tsx", ".ts", ".css", ".scss"]]
    candidates += [base.parent / ("_" + base.name + ".scss"), base / "index.ts", base / "index.tsx", base / "_index.scss"]
    return next((p.resolve() for p in candidates if p.resolve() in files), None)

imports = re.compile(r'''(?:\bfrom\s+|\bimport\s*\(?\s*|@(?:use|forward|import)\s*)["']([^"']+)["']''')
urls = re.compile(r'''url\(\s*["']?([^\s"')]+)''')
absolute_assets = re.compile(r'''/(?:assets|images)/[\w./-]+''')

def visit(path):
    path = path.resolve()
    if path in visited or path not in files:
        return
    visited.add(path)
    if path.suffix not in SOURCE_EXTENSIONS:
        return
    text = read(path)
    for spec in imports.findall(text):
        is_local = spec.startswith(("@/", ".")) or (path.suffix == ".scss" and not spec.startswith("sass:"))
        if is_local:
            target = resolve_local(path, spec)
            if target:
                visit(target)
            else:
                unresolved.append({"file": str(path.relative_to(ROOT)), "import": spec})
        else:
            external_imports.add(spec)
    for url in set(absolute_assets.findall(text) + urls.findall(text)):
        url = unquote(urlsplit(url).path)
        if not url:
            continue
        asset = PUBLIC / url.lstrip("/") if url.startswith("/") else path.parent / url
        if asset.resolve() in files:
            visit(asset)

entry_names = {"page.tsx", "layout.tsx", "route.ts", "not-found.tsx", "error.tsx", "global-error.tsx", "loading.tsx", "template.tsx", "default.tsx", "icon.svg"}
for entry in (SRC / "app").rglob("*"):
    if entry.is_file() and entry.name in entry_names:
        visit(entry)
for path in SRC.rglob("*.d.ts"):
    modules = re.findall(r'declare module ["\x27]([^"\x27]+)', read(path))
    if not modules or any(module in external_imports for module in modules):
        visit(path)

candidates = sorted(files - visited)
REPORT.parent.mkdir(parents=True, exist_ok=True)
report = {
    "entry_files": "Next.js pages, layouts, API routes and metadata",
    "reachable_count": len(visited),
    "external_imports": sorted(external_imports),
    "unresolved_local_imports": unresolved,
    "unused_count": len(candidates),
    "unused_bytes": sum(p.stat().st_size for p in candidates),
    "unused_files": [str(p.relative_to(ROOT)).replace("\\", "/") for p in candidates],
    "removed": False,
}
if "--remove" in sys.argv:
    assert not unresolved, "Resolve local imports before deleting candidates."
    for path in candidates:
        assert path.is_relative_to(SRC) or path.is_relative_to(PUBLIC)
        assert path.is_relative_to(ROOT)
        path.unlink()
    for base in [SRC, PUBLIC]:
        for path in sorted((p for p in base.rglob("*") if p.is_dir()), key=lambda p: len(p.parts), reverse=True):
            assert path.resolve().is_relative_to(base)
            if not any(path.iterdir()):
                path.rmdir()
    report["removed"] = True
REPORT.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))
