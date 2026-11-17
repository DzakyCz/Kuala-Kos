"""Local browser audit; saves viewport screenshots and measured layout issues."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path("artifacts/responsive")
OUT.mkdir(parents=True, exist_ok=True)
ROUTES = ["/", "/about-us", "/listing-topmap-grid", "/property-details-2/1", "/contacts", "/FAQs", "/privacy-policy", "/login", "/register", "/missing-page"]
MEASURE = """() => {
 const w = innerWidth;
 const visible = e => {const s=getComputedStyle(e),r=e.getBoundingClientRect();return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none';};
 const outside = [...document.querySelectorAll('#wrapper *')].filter(e=>{
   if(!visible(e))return false;
   const r=e.getBoundingClientRect(); if(r.right<=w+1&&r.left>=-1)return false;
   for(let a=e.parentElement;a&&a.id!=='wrapper';a=a.parentElement){const s=getComputedStyle(a);if(['hidden','clip','auto','scroll'].includes(s.overflowX))return false;}
   return true;
 }).slice(0,18).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.trim().slice(0,70),left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)}));
 return {width:w,scrollWidth:document.documentElement.scrollWidth,outside};
}"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(device_scale_factor=1)
    results = []
    for width in [320, 390, 576, 768, 992, 1200, 1440]:
        page.set_viewport_size({"width": width, "height": 900})
        for route in ROUTES:
            response = page.goto("http://localhost:3000" + route, wait_until="domcontentloaded", timeout=90000)
            page.wait_for_timeout(700)
            page.evaluate("document.fonts.ready")
            # Reveal sections animated on scroll before taking a full-page capture.
            if route == "/":
                page.evaluate("async () => {for(let y=0;y<document.body.scrollHeight;y+=650){scrollTo(0,y); await new Promise(r=>setTimeout(r,150));}await new Promise(r=>setTimeout(r,1800));scrollTo(0,0);}")
            data = {"route": route, "status": response.status, **page.evaluate(MEASURE)}
            results.append(data)
            name = route.strip("/").replace("/", "-") or "home"
            if width in [320, 768, 1440] and not os.environ.get("AUDIT_NO_SCREENSHOTS"):
                page.screenshot(path=str(OUT / f"{name}-{width}.png"), full_page=True)
            print(json.dumps(data), flush=True)
    (OUT / "audit.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    browser.close()
