"""Exercise responsive navigation, filters, tabs, and the calculator locally."""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

out = Path("artifacts/responsive")
out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    for width in map(int, sys.argv[1:] or [320, 768, 992, 1440]):
        page.set_viewport_size({"width": width, "height": 800})
        page.goto("http://localhost:3000/listing-topmap-grid")
        if width < 1200:
            page.get_by_role("button", name="Buka menu").click()
            expect(page.get_by_role("button", name="Tutup menu")).to_be_visible()
            page.wait_for_function("() => {const r=document.querySelector('.offcanvas.show')?.getBoundingClientRect(); return r && r.left >= -1 && r.right <= innerWidth + 1;}")
            expect(page.locator('#menu-mobile-menu a').first).to_be_in_viewport()
            page.screenshot(path=str(out / f"menu-{width}.png"))
            page.get_by_role("button", name="Tutup menu").click()
        page.get_by_role("button", name="Fasilitas & Aturan").click()
        dialog = page.get_by_role("dialog")
        expect(dialog.locator('[class*="panel"]')).to_be_visible()
        panel = dialog.locator('[class*="panel"]').bounding_box()
        assert panel["x"] >= -1 and panel["x"] + panel["width"] <= width + 1
        page.screenshot(path=str(out / f"filters-{width}.png"))
        page.get_by_role("button", name="Tutup filter").click()
        page.get_by_role("button", name="Lokasi", exact=True).click()
        options = page.get_by_role("listbox")
        expect(options).to_be_visible()
        box = options.bounding_box()
        assert box["x"] >= -1 and box["x"] + box["width"] <= width + 1
        page.keyboard.press("Escape")
        page.goto("http://localhost:3000/property-details-2/1")
        for name in ["Ukuran Kamar", "Lokasi", "Galeri Foto"]:
            tab = page.get_by_role("tab", name=name)
            tab.click()
            expect(tab).to_have_attribute("aria-selected", "true")
        page.locator("#rent-count").fill("2")
        page.locator("#rent-utilities").fill("50000")
        page.locator("#rent-deposit").fill("100000")
        page.get_by_role("button", name="Hitung Estimasi").click()
        expect(page.locator("ul[aria-live=polite]")).to_contain_text("1.500.000")
        calc = page.locator(".properties-calculator")
        calc.screenshot(path=str(out / f"calculator-{width}.png"))
        controls = page.locator('#rent-period, #rent-count, #rent-utilities, #rent-deposit').evaluate_all("els => els.map(e => {const r=e.getBoundingClientRect();return {top:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)};})")
        assert len(set(item["width"] for item in controls)) == 1
        assert all(item["height"] == 56 for item in controls)
        if width >= 992:
            assert len(set(item["top"] for item in controls)) == 1
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        print(json.dumps({"width": width, "menu_filters_tabs_calculator": "passed", "controls": controls}), flush=True)
    (out / "interaction-errors.json").write_text(json.dumps(errors, indent=2), encoding="utf-8")
    print(json.dumps({"browser_errors": errors}), flush=True)
    browser.close()
