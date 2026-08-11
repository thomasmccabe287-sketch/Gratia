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
