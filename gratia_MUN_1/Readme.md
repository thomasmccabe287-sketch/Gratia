# Updating the Gratia MUN website — no coding required

Everything you'll ever need to change for a new conference year lives in
the `content/` folder, as plain text files ending in `.yaml`. You do
**not** need to open, understand, or touch anything in the `templates/`
folder or any file ending in `.py` — those control how the site *looks*,
not what it *says*, and they don't need to change year to year.

## The files, and what each one controls

| File | Controls |
|---|---|
| `content/site.yaml` | The year in the footer, the contact email, the site description |
| `content/secretariat.yaml` | The "Meet our Secretariat" section on About Us |
| `content/committees.yaml` | The Committees page, and the thank-you note below it |
| `content/conference.yaml` | Everything on the Conference Info page: date, fees, schedule, links, venue |
| `content/guides.yaml` | The guide cards on Delegate Resources |
| `content/production_team.yaml` | The "Special thanks to our production team!" section |

## How to edit one

1. Open the file in any plain text editor (Notepad, VS Code, even GitHub's own web editor if you don't want to install anything).
2. Find the line you want to change. Each field is `something: the actual text`.
3. Type your change *after* the colon. Leave the colon and the field name (the part before the colon) exactly as it is.
4. Save the file.
5. Send the updated file to whoever deploys the site, or push it to GitHub yourself if you have access — the website updates automatically the next time it restarts.

**Example** — to update the conference date, open `content/conference.yaml` and find:

```yaml
date: November 14, 2026
```

Change it to next year's date and save:

```yaml
date: November 20, 2027
```

That's it — nothing else in that file needs to change for this edit.

## Adding a new person (secretariat, committee chair, etc.)

Copy an existing entry, paste it right below, and change the details. For
example, in `content/secretariat.yaml`:

```yaml
- name: Sean Callihan
  title: Sponsor
  email: sean.callihan@iwhs-satx.org
  photo: secretariat/sean_callihan.jpg
```

Copy those four lines, paste them again, and fill in the new person's info.
The dash (`-`) at the start marks "this is a new entry" — every entry needs
one, and the lines under it need to line up with the same indentation
(spacing) as the ones above.

For the `photo` line: that's just the filename. The actual photo needs to
be uploaded separately to the matching folder inside `static/images/`
(e.g. a secretariat photo goes in `static/images/secretariat/`).

## A few things that will cause an error if you're not careful

- **Keep the indentation (spacing) consistent.** YAML uses spacing to know what belongs to what — if a line is indented differently than its neighbors, the file can fail to load.
- **If text contains a colon (`:`) or starts with a special character**, wrap it in quotes. For example, a committee named `"Crisis Room: Panem"` needs the quotes because of the colon inside it — without them, YAML would think you're trying to start a new field.
- **Leave a link as an empty pair of quotes (`""`) if it isn't ready yet** — e.g. `paper_url: ""`. Don't delete the line entirely, just leave the value empty. The site is built to hide a "read more" button automatically when a link is missing, instead of showing a broken one.
- **If something breaks**, the previous version of the file (from before your edit) will still work — so if you're ever unsure, save a copy of the file before you start editing, and you can always revert.

## The one thing that *does* require touching code

Adding a whole new *kind* of section (not just new entries in an existing
list, but something the site has never shown before — a new page, a new
kind of card) is a real coding change, not a content change. That's the
one case where you'd want help from whoever set this up, or from Claude,
walking through it the same way this site was originally built.







# Gratia MUN — CS50x Final Project

**Video demo:** <link here>

## What this is

Gratia MUN is the official website for [conference name], a Model UN
conference. It's a Flask application that serves five pages — Home, About
Us, Conference Info, Committees, and Delegate Resources — plus a custom
404 page, all built on a shared Bootstrap-based layout.

## Why I built it this way

The site needs to be updated every year by non-technical conference
organizers (new secretariat members, new dates, new committee topics),
but I didn't want to hand a future organizer a Python file to edit, or
set up and pay for a database for what is fundamentally a small, mostly
static site. So I split the project into two layers:

- **Content** lives in plain YAML files under `content/` — readable and
  editable by anyone with a text editor, no coding knowledge required.
  See the section below for the guide I wrote for the people who'll
  actually maintain this after I'm gone.
- **Presentation** lives in Jinja templates under `templates/`, which
  pull that YAML data in through `loader.py` and render it with
  Bootstrap 5 for layout and a small amount of custom CSS/JS for the
  parts Bootstrap doesn't cover (modals with member details, entrance
  animations via anime.js).

This means a conference organizer can add next year's secretariat member
or update the venue address without ever touching a template, a route,
or a line of Python — and I (or whoever maintains the code) never have
to touch YAML content files to change how the site looks.

## File overview

| Path | Purpose |
|---|---|
| `app.py` | Flask routes, one per page, plus a 404 handler and two context processors that inject `site` and `navigation` data into every template automatically |
| `loader.py` | Reads each YAML file in `content/` and hands back plain Python dicts/lists — the only place that knows the content lives in YAML at all |
| `content/*.yaml` | The actual site content — see the maintainer guide below |
| `templates/Layout.html` | The shared base template: `<head>`, nav bar, footer, script tags. Every page extends this and fills in `{% block content %}` |
| `templates/_macros.html` | Reusable Jinja macros (currently `secretariat_card`) so repeated markup (like a person's photo/name/email card) isn't duplicated across templates |
| `templates/*.html` | One template per route, each extending `Layout.html` |
| `static/css/styles.css` | Custom styles layered on top of Bootstrap 5 |
| `static/js/script.js` | Modal population (secretariat + committee detail popups), a hero animation, and the 404-page countdown |

## Design decisions worth calling out

- **YAML over a database**: this site's content changes a handful of
  times a year, by non-developers, and needs to be reviewable in a
  pull request/diff the same way code is. A database would add
  operational overhead (hosting, migrations, backups) with no real
  benefit at this scale.
- **`StrictUndefined` is *not* currently enabled** in the Jinja
  environment, meaning a typo in a template variable name fails
  silently (renders blank) rather than raising an error. This is a
  known trade-off I'm aware of — see the maintenance notes below for
  why I'd change this before handing the site off long-term.
- **Content is re-read from disk on every request** (`loader.py` has no
  caching). For a site this size the performance cost is negligible,
  and it means a content edit is visible immediately without restarting
  the server — a deliberate trade favoring editor convenience over raw
  performance.

## Running it locally

```bash
pip install -r requirements.txt
python app.py
```

Then visit `http://127.0.0.1:5000`.

---

# Updating the Gratia MUN website — no coding required

Everything you'll ever need to change for a new conference year lives in
the `content/` folder, as plain text files ending in `.yaml`. You do
**not** need to open, understand, or touch anything in the `templates/`
folder or any file ending in `.py` — those control how the site *looks*,
not what it *says*, and they don't need to change year to year.

## The files, and what each one controls

| File | Controls |
|---|---|
| `content/site.yaml` | The year in the footer, the contact email, the site description |
| `content/secretariat.yaml` | The "Meet our Secretariat" section on About Us |
| `content/committees.yaml` | The Committees page, and the thank-you note below it |
| `content/conference.yaml` | Everything on the Conference Info page: date, fees, schedule, links, venue |
| `content/guides.yaml` | The guide cards on Delegate Resources |
| `content/production_team.yaml` | The "Special thanks to our production team!" section |

## How to edit one

1. Open the file in any plain text editor (Notepad, VS Code, even GitHub's own web editor if you don't want to install anything).
2. Find the line you want to change. Each field is `something: the actual text`.
3. Type your change *after* the colon. Leave the colon and the field name (the part before the colon) exactly as it is.
4. Save the file.
5. Send the updated file to whoever deploys the site, or push it to GitHub yourself if you have access — the website updates automatically the next time it restarts.

**Example** — to update the conference date, open `content/conference.yaml` and find:

```yaml
date: November 14, 2026
```

Change it to next year's date and save:

```yaml
date: November 20, 2027
```

That's it — nothing else in that file needs to change for this edit.

## Adding a new person (secretariat, committee chair, etc.)

Copy an existing entry, paste it right below, and change the details. For
example, in `content/secretariat.yaml`:

```yaml
- name: Sean Callihan
  title: Sponsor
  email: sean.callihan@iwhs-satx.org
  photo: secretariat/sean_callihan.jpg
```

Copy those four lines, paste them again, and fill in the new person's info.
The dash (`-`) at the start marks "this is a new entry" — every entry needs
one, and the lines under it need to line up with the same indentation
(spacing) as the ones above.

For the `photo` line: that's just the filename. The actual photo needs to
be uploaded separately to the matching folder inside `static/images/`
(e.g. a secretariat photo goes in `static/images/secretariat/`).

## A few things that will cause an error if you're not careful

- **Keep the indentation (spacing) consistent.** YAML uses spacing to know what belongs to what — if a line is indented differently than its neighbors, the file can fail to load.
- **If text contains a colon (`:`) or starts with a special character**, wrap it in quotes. For example, a committee named `"Crisis Room: Panem"` needs the quotes because of the colon inside it — without them, YAML would think you're trying to start a new field.
- **Leave a link as an empty pair of quotes (`""`) if it isn't ready yet** — e.g. `paper_url: ""`. Don't delete the line entirely, just leave the value empty. The site is built to hide a "read more" button automatically when a link is missing, instead of showing a broken one.
- **If something breaks**, the previous version of the file (from before your edit) will still work — so if you're ever unsure, save a copy of the file before you start editing, and you can always revert.

## The one thing that *does* require touching code

Adding a whole new *kind* of section (not just new entries in an existing
list, but something the site has never shown before — a new page, a new
kind of card) is a real coding change, not a content change. That's the
one case where you'd want help from whoever set this up, or from Claude,
walking through it the same way this site was originally built.