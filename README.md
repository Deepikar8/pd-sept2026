# The Beach School @ Port Dickson · 9–13 Sept 2026

A single-page trip guide for fellow travellers: day-by-day plan, meals, and a packing checklist.
No build step, no login. Hosted on GitHub Pages.

## Editing

All content is in `data.js`. Change a time, a venue, or a packing item there, commit, and push.
GitHub Pages redeploys in about a minute.

- `index.html` – page shell
- `style.css` – styles
- `app.js` – renders the data, handles day tabs, the "Now" marker, and packing ticks
- `data.js` – **all trip content**
- `sw.js` – lets the page work offline once it has been opened

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000
