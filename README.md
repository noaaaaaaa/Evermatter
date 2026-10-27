# Evermatter company website

Current site: all five routes now share the selected white/green panorama design. `npm run build` runs `scripts/build-unified.mjs`; page content and shared components are in `src/site/`, with the approved homepage retained in `src/home/home.html`. The original compiled reference files remain as historical source, not the active inner-page renderer.

The circular header mark and favicon are generated from the original logo with an undistorted SVG viewport. AMBC photography is in `src/assets/ambc-pitch.jpg`. The active process film is `src/assets/evermatter-process-clean.mp4`, encoded from raw frames without watermarks or baked labels. Captions describe the visible process. Research-development status remains in body copy. The old video URL is served the clean export too.

Standalone reconstruction of the company-owned reference website, preserving its dark teal/lime visual identity. Five routes: Home, Technology, About, Milestones and Contact. No Alibaba tracking, platform banner, external image services or backend dependencies.

## Build and preview

Install Node.js 22 or later. No npm dependencies are required.

```
npm run build
npm start
```

Open http://127.0.0.1:4173. Upload/publish the generated `dist` directory, not `src`.

## GitHub Pages

This independent repository is `noaaaaaaa/Evermatter`. It does not change the personal website repository.

1. Repository Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Run the included **Deploy Evermatter to GitHub Pages** workflow (or push to `main`).
3. Before attaching the company domain, the preview address is https://noaaaaaaa.github.io/Evermatter/ .
4. Follow [DEPLOYMENT.md](DEPLOYMENT.md) to configure `evermatter.tech` safely.

The application detects the GitHub project prefix and custom-domain root automatically. Physical route entry files support direct page loads. A 404 entry also supports client-side routing.

## Editing

- `src/copy-edits.json`: explicit factual corrections to the original compiled application. The build fails if a source phrase no longer matches.
- `src/reference.app.js` / `src/reference.css`: original company reference implementation; third-party licence notices retained.
- `src/assets`: local logo, portraits and concept illustrations. Illustrations are labelled and are not evidence of achieved recovery or a commissioned plant.
- `scripts/build.mjs`: deterministic static build; no external service credentials.

The contact form validates fields and opens a mail draft to `postmaster@evermatter.tech`. It does **not** submit or store enquiries. Mailbox delivery and ownership should be confirmed by the company before public promotion. There is no analytics or cookie tracking added by this build.

Research copy reflects the information confirmed by the company in October 2026. Revenue, cost, output and maturity figures are clearly qualified. Update time-sensitive milestone copy after the scheduled event.
