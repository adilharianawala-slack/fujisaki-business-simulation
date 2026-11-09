# Fujisaki Plc. Business Simulation — v0.1

A static browser-based prototype for a six-year university finance and management simulation.

## Run locally
Open `index.html` in a modern browser. No build tools or server are required.

## Publish free with GitHub Pages
1. Sign in to GitHub and create a new **public** repository, for example `fujisaki-business-simulation`.
2. Upload `index.html`, `styles.css`, and `app.js` to the repository root (or upload this folder's contents).
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub to publish the site. Your game will be available at `https://YOUR-USERNAME.github.io/fujisaki-business-simulation/`.

## Current prototype features
- Six annual rounds and twelve business situations.
- Four strategic options per situation.
- Team name, decision rationale and completion tracking.
- Instructor-selected Adverse / Base / Favourable market outcomes.
- Illustrative financial statements and selected ratios.
- Browser-local persistence using `localStorage`.

## Important limitations before classroom deployment
- This is a **single-browser prototype**. Data is stored in the browser that is being used.
- The leaderboard currently shows only the current browser's team. It is not a shared cross-device leaderboard.
- Instructor controls are not protected by authentication. Do not treat them as secure or publish confidential instructor settings.
- The financial engine is an educational approximation, not a complete accounting model. It should be reconciled to the approved Excel model before formal assessment.
- For multi-team play across separate devices, connect the front end to a shared database such as Supabase. GitHub Pages remains the free static host; Supabase stores team records, decisions, round state and instructor-controlled market outcomes.

## Suggested next build
1. Add Supabase project and tables for teams, decisions, market settings and round status.
2. Add team access codes and instructor authentication / role permissions.
3. Make each year's outcomes release only when the instructor advances the round.
4. Add a shared leaderboard and market-share interaction between teams.
5. Reconcile the financial engine to the approved Fujisaki workbook and add balance-sheet integrity checks.
