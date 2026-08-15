import os

from jinja2 import StrictUndefined
from flask import Flask, render_template, url_for
from loader import (
    load_site,
    load_secretariat,
    load_committees,
    load_conference,
    load_guides,
    load_production_team,
)

app = Flask(__name__)
app.jinja_env.undefined = StrictUndefined

NAVIGATION = [
    {"title": "Home", "endpoint": "index"},
    {"title": "About Us", "endpoint": "about"},
    {"title": "Conference Info", "endpoint": "conference"},
    {"title": "Committees", "endpoint": "committees"},
    {"title": "Delegate Resources", "endpoint": "delegate_resources"}
]

@app.context_processor
def inject_site():
    # og:image must be an absolute URL (http(s)://...) — link-preview
    # crawlers fetch your page with no browser, so a relative path like
    # "/static/images/og-image.jpg" can't be resolved on their end.
    site = load_site()
    site["og_image"] = url_for(
        "static", filename="images/og-image.jpg", _external=True
    )
    return {"site": site}

@app.context_processor
def inject_navigation():
    return {"navigation": NAVIGATION}

@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html", active_page=None), 404

@app.route("/")
def index():
    return render_template(
        "index.html",
        active_page="index"
    )

@app.route("/about")
def about():
    return render_template(
        "about.html",
        active_page="about",
        secretariat=load_secretariat(),
        production_team=load_production_team(),
    )

@app.route("/conference")
def conference():
    return render_template(
        "conference.html",
        active_page="conference",
        conference=load_conference()
    )

@app.route("/committees")
def committees():
    committees, acknowledgement = load_committees()
    return render_template(
        "committees.html",
        active_page="committees",
        committees=committees,
        acknowledgement=acknowledgement
    )

@app.route("/delegate_resources")
def delegate_resources():
    return render_template(
        "delegate_resources.html",
        active_page="delegate_resources",
        guides=load_guides()
    )

if __name__ == "__main__":
    debug_mode = os.environ.get("FLASK_DEBUG", "1") == "1"
    app.run(debug=debug_mode)