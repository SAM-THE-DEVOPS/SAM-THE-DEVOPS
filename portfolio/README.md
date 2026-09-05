# SAM-THE-DEVOPS — Portfolio

Personal portfolio site for SAM-THE-DEVOPS — DevOps Engineer / AI Engineering / Cloud & Automation.

🌐 Live (after Pages is enabled): `https://SAM-THE-DEVOPS.github.io/<repo-name>/`

## About

A single dark, blue/cyan "systems terminal" themed portfolio: a booting terminal hero, grouped tech stack,
two real projects, education & certifications, a live GitHub contribution graph, and a contact panel with
a downloadable resume.

## Structure

```
.
├── index.html                  # all page content
├── assets/
│   ├── style.css               # design system + layout
│   ├── script.js                # terminal typing effect, mobile nav, live contribution graph
│   └── resume.pdf              # downloadable resume
└── .github/workflows/static.yml # GitHub Pages deploy workflow
```

## Before you publish

- [ ] Replace `assets/resume.pdf` with your latest resume whenever it changes.
- [ ] Add a real photo: drop it in as `assets/avatar.jpg`, then in `index.html` swap the
      `.avatar-placeholder` `<div>` for an `<img src="assets/avatar.jpg" alt="Sam, DevOps Engineer">`.
- [ ] Double-check the two project GitHub links in `index.html` point at your actual repos.

## Run locally

No build step — it's static HTML/CSS/JS. Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (repo name can be anything, e.g. `portfolio`).
2. In the repo, go to **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` — `.github/workflows/static.yml` builds and deploys automatically.
4. Your site will be live at `https://SAM-THE-DEVOPS.github.io/<repo-name>/`.

## License

© 2026 SAM-THE-DEVOPS. This is an original design and personal portfolio — not a copy of any
third-party portfolio's code, text, or images.
