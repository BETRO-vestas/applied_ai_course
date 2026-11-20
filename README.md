# applied-ai-course

A mobile-first course in applied AI and agentic workflows for grid connection
teams working in Australia's National Electricity Market. Daily micro-lessons on
the phone, weekly hands-on labs in VS Code + GitHub Copilot, and a capstone team
efficiency strategy.

All scenarios and data are fictional.

**App:** https://btrowlinson.github.io/applied-ai-course/
(on iPhone: open in Safari, then Share, then *Add to Home Screen*)

- Plan: [`docs/PLAN.md`](docs/PLAN.md)
- Rules for contributors and AI agents: [`CLAUDE.md`](CLAUDE.md)
- Course content: [`content/`](content) (Markdown + YAML)
- Lab files for the work laptop: [`labs-sandbox/`](labs-sandbox)

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check and build to dist/
```

Pushes to `main` run the content guard, then build and deploy to GitHub Pages.
The content guard reads a newline-separated list of banned terms from the
`BANNED_TERMS` repository secret.
