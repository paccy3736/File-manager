# File Manager

A responsive file manager UI built with React 19 + Vite. Browse, search, and preview images across a sidebar-driven layout.

---

## Setup

**Requirements:** Node 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v6 |
| Styling | Plain CSS with CSS custom properties |
| State | React built-in (`useState`, Context API) |
| Icons | react-icons (Material Design) |
| Data | Local mock array (`src/data/images.js`) |

---

## Project Structure

```
src/
├── context/
│   └── ImagesContext.jsx   # Centralized images state (Context API)
├── components/
│   ├── ImageCard.jsx        # Reusable card — thumbnail + metadata
│   ├── ImageModal.jsx       # Read-only lightbox preview
│   ├── Navbar.jsx           # Top bar — search, cart, profile dropdowns
│   └── Sidebar.jsx          # Nav links, storage bar, mobile overlay
├── layouts/
│   └── AppLayout.jsx        # Shell: sidebar + navbar + <Outlet>
├── pages/
│   ├── ImagesPage.jsx       # Main images view (Phase 1–2 complete)
│   ├── VideosPage.jsx       # Placeholder
│   ├── DocumentsPage.jsx    # Placeholder
│   ├── AllFilesPage.jsx     # Placeholder
│   └── TrashPage.jsx        # Placeholder
├── data/
│   └── images.js            # Mock image objects
└── index.css                # Design tokens + responsive utilities
```

---

## State Management Rationale

### Why React built-in state + Context API?

The spec requires `useState` / `useReducer` plus Context API for anything shared across components — no third-party store.

**Local state (`useState`)** is used where state is genuinely component-private:
- `sidebarOpen` in `AppLayout` — only the layout shell cares about it
- `selectedImage` in `ImagesPage` — only the page needs to know which modal is open
- `open` in the `Dropdown` component inside Navbar — purely UI toggle

**Shared state (Context API)** lives in `ImagesContext` and covers everything that crosses component boundaries:
- `images` — the master list, updated when an image is marked as viewed
- `recentImages` — derived from runtime view events, not hardcoded
- `searchQuery` + `setSearchQuery` — written by both the Navbar search bar and the page-level filter, read by `ImagesPage` to filter results and by Navbar to reflect current value
- `filteredImages` — computed inside the provider so any consumer gets the same filtered list without duplicating logic
- `markViewed(id)` — called from `ImagesPage` when a card is clicked; updates `lastOpenedAt` and pushes to the recently-viewed list

This keeps the data flow unidirectional and explicit: context owns the truth, components read and dispatch, no prop-drilling through the layout shell.

### Why not Redux Toolkit or Zustand?

The app's shared state is a single domain (images) with simple operations. The overhead of a separate store library — boilerplate, devtools setup, learning curve — isn't justified here. Context API handles it in ~60 lines with no added dependencies. If the app were to grow to multiple data domains with frequent cross-slice updates, migrating to Zustand would be the natural next step given its minimal API and lack of provider boilerplate.

---

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| `< 640px` (mobile) | Single column grid, sidebar slides in as overlay, navbar search hidden, modal slides up from bottom |
| `640px – 1023px` (tablet) | Two column grid, sidebar overlay still used |
| `≥ 1024px` (desktop) | Four column grid, sidebar always visible in flow, hamburger hidden |
