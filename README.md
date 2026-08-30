# Particle Physics Demo

A minimal interactive particle simulator built with plain HTML5 Canvas and JavaScript
(no frameworks, no build step) — meant as a starting point for a GitHub Pages site.

## Files
- `index.html` — page structure and canvas element
- `style.css` — styling
- `script.js` — the simulation loop (gravity, wall collisions, click-to-spawn)

## Run locally
Just open `index.html` in a browser. No server or build tools needed.

## Deploy to GitHub Pages
1. Create a new public repo on GitHub (e.g. `physics-demo` or `yourusername.github.io`
   if you want it at the root of your GitHub domain).
2. Push these three files to the repo's default branch:
   ```
   git init
   git add .
   git commit -m "Initial particle simulator"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set the source to the `main` branch
   (root folder), and save.
4. Your site will be live within a minute or two at:
   - `https://<you>.github.io/<repo>/` (project repo), or
   - `https://<you>.github.io/` (if the repo is named `<you>.github.io`)

## Extending this
- Swap the bouncing-ball physics for something closer to your research — e.g. an
  active Brownian particle model (self-propulsion + rotational noise) would only
  need a new `step()` method on `Particle`.
- Add a Jekyll blog layer alongside this (`_posts/`, `_config.yml`) and link to it
  from the nav bar in `index.html` — GitHub Pages builds Jekyll sites automatically.
- To reuse existing C/C++ simulation code instead of rewriting physics in JS, look
  into compiling it to WebAssembly with Emscripten and calling it from `script.js`.
