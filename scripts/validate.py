#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

class IdParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ("src", "href"):
            value = attrs.get(key, "")
            if value.startswith("./") and not value.startswith("./#"):
                self.refs.append(value.split("?")[0].split("#")[0])

parser = IdParser()
parser.feed(HTML.read_text(encoding="utf-8"))

duplicates = sorted({x for x in parser.ids if parser.ids.count(x) > 1})
if duplicates:
    print("Duplicate HTML ids:", ", ".join(duplicates))
    sys.exit(1)

missing = []
for ref in parser.refs:
    target = (ROOT / ref[2:]).resolve()
    if not target.exists() and not ref.startswith("./audio/"):
        missing.append(ref)

if missing:
    print("Missing local assets:", ", ".join(sorted(set(missing))))
    sys.exit(1)

required = {
    "home","practice","breath","sounds","programs","progress",
    "playerDialog","settingsDialog","breathDialog","sleepDialog"
}
missing_ids = required - set(parser.ids)
if missing_ids:
    print("Missing required ids:", ", ".join(sorted(missing_ids)))
    sys.exit(1)

print(f"HTML OK: {len(parser.ids)} unique ids, required views present.")
