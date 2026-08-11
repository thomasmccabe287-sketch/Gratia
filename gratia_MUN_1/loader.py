"""
Reads the YAML files in content/ and hands back plain Python data —
the same lists/dicts that used to live directly in data.py.

Nothing in templates/ or _macros.html needs to change because of this
file: Jinja doesn't care whether a dict came from a Python literal or
a parsed YAML file, so `committee.name` works identically either way.

Each load_* function re-reads its file on every call rather than
caching the result. For a small site like this, the performance cost
is irrelevant, and it means content edits show up immediately without
restarting the app.
"""

from pathlib import Path
import yaml

CONTENT_DIR = Path(__file__).parent / "content"


def _load_yaml(filename):
    path = CONTENT_DIR / filename
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_site():
    return _load_yaml("site.yaml")


def load_secretariat():
    return _load_yaml("secretariat.yaml")


def load_committees():
    """Returns (committees_list, acknowledgement_dict)."""
    data = _load_yaml("committees.yaml")
    return data["committees"], data["acknowledgement"]


def load_conference():
    return _load_yaml("conference.yaml")


def load_guides():
    return _load_yaml("guides.yaml")


def load_production_team():
    return _load_yaml("production_team.yaml")
