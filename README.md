# Semyon Tyo — Windows 7 Portfolio

An interactive portfolio that turns a familiar Windows 7-style desktop into a
home for my projects, background, resume, and contact links. The interface is
built with React rather than being a static desktop mockup. I’m a Computer
Science freshman at Colorado State University in Fort Collins, Colorado.

**Live site:** [aerosness.github.io](https://aerosness.github.io/)

![Windows 7-inspired portfolio desktop](public/resources/optimized/projects/project2.webp)

## Highlights

- Desktop-style windows with familiar open, focus, minimize, maximize, and
  close interactions
- Start menu, taskbar, desktop shortcuts, and an optional startup experience
- Curated project case studies plus smaller experiments and game-jam work
- Responsive window content for desktop and mobile viewports
- Keyboard-friendly controls, semantic content, and reduced-motion support
- Locally served, optimized project imagery with no remote badge dependency

## Built with

- React 19
- Vite 6
- JavaScript, HTML, and CSS
- GitHub Pages

Portfolio copy and project details are centralized in
[`src/data/portfolio.js`](src/data/portfolio.js). Window content lives in
[`src/components/WindowContents`](src/components/WindowContents), while the
desktop shell and shared visual system live in [`src/App.jsx`](src/App.jsx) and
[`src/App.css`](src/App.css).

##

The web-desktop collection at
[simone.computer](https://simone.computer/#/webdesktops) was an important source
of inspiration for the format.
