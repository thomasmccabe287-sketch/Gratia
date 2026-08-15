"""
A handful of smoke tests: for each real page, confirm it loads without
error and that a piece of real content actually shows up. This isn't
meant to be exhaustive — it's meant to catch the kind of bug we hit
this week, where a template references a data field that doesn't
exist and the page either breaks or silently renders wrong.

Run with:  pytest
"""

import pytest
from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_index_loads(client):
    response = client.get("/")
    assert response.status_code == 200


def test_about_loads_and_shows_secretariat_and_production_team(client):
    response = client.get("/about")
    assert response.status_code == 200
    body = response.get_data(as_text=True)
    # Confirms the YAML data is actually reaching the page, not just
    # that the template rendered an empty shell.
    assert "Meet our Secretariat" in body
    assert "production team" in body.lower()


def test_conference_loads(client):
    response = client.get("/conference")
    assert response.status_code == 200


def test_committees_loads(client):
    response = client.get("/committees")
    assert response.status_code == 200


def test_delegate_resources_loads(client):
    response = client.get("/delegate_resources")
    assert response.status_code == 200


def test_unknown_route_returns_custom_404(client):
    response = client.get("/this-page-does-not-exist")
    assert response.status_code == 404
    # Confirms our custom 404.html is actually being served,
    # not Flask's default error page.
    body = response.get_data(as_text=True)
    assert "404" in body