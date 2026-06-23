# File Manager — Hope UI Clone

A pixel-accurate clone of the [Hope UI Pro Admin Dashboard](https://templates.iqonic.design/hope-ui/pro/html/file-manager/image-folder.html) File Manager module, built with React + Vite.

---

## Live Demo

> _Deploy link here (Vercel / Netlify)_

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
| Routing | React Router v7 (`/file-manager/images`, `/file-manager/videos`, …) |
| Styling | Plain CSS with CSS custom properties + Tailwind CSS v4 |
| State | React built-in (`useState`, Context API) |
| Icons | react-icons (Material Design) |
| Data | Local mock array (`src/data/files.js`) |

---

## Project Structure

```
src/
├── context/
│   └── FilesContext.jsx     # Centralized state — files, search, textSize, markViewed
├── components/
│   ├── FileCard.jsx         # Reusable card — thumbnail + metadata (images, videos, docs)
│   ├── FileModal.jsx        # Read-only lightbox / video player / document preview
│   ├── Navbar.jsx           # Top bar — breadcrumb, search, text-size, cart, profile dropdowns
│   └── Sidebar.jsx          # Grouped nav links, profile card, active-link highlight
├── layouts/
│   └── AppLayout.jsx        # Shell: sidebar + navbar + <Outlet>
├── pages/
│   ├── ImagesPage.jsx       # Image folder — recently viewed + all images grid
│   ├── VideosPage.jsx       # Video folder — recently viewed + all videos grid
│   ├── DocumentsPage.jsx    # Document folder — recently viewed + all documents grid
│   ├── AllFilesPage.jsx     # Dashboard — folder cards + all files grid
│   └── TrashPage.jsx        # Trash — restore / permanent delete / empty trash
├── data/
│   └── files.js             # 21 mock file objects (12 images, 5 videos, 4 documents)
└── index.css                # CSS variables (design tokens) + responsive utilities
```

---

## State Management Rationale

### Why React built-in state + Context API?

The app has a single shared data domain — a list of files — with a handful of derived views (filtered by type, filtered by search, recently viewed, trash). That maps directly onto a single Context provider with `useState` and a few `useCallback` actions.

**Local `useState`** is used for genuinely component-private state:
- `sidebarOpen` in `AppLayout` — only the layout shell cares
- `selectedFile` in each page — only that page needs to know which modal is open
- `open` in the `Dropdown` component — purely a UI toggle

**Shared state (Context API)** lives in `FilesContext` and covers everything that crosses component boundaries:
- `files` — single source of truth; never duplicated
- `searchQuery` / `setSearchQuery` — written by Navbar, read by every page
- `textSize` / `setTextSize` — written by Navbar, applied globally via `body` class
- `markViewed(id)` — updates `lastOpenedAt` in state; Recently Viewed is derived by sorting, not a second array
- `moveToTrash` / `restoreFromTrash` / `deletePermanently` / `emptyTrash` — bonus CRUD actions wired to state

### Why not Redux Toolkit or Zustand?

One domain, simple operations, no async side-effects. Context adds zero dependencies and handles this in ~80 lines. If the app scaled to multiple domains with cross-slice selectors or async fetching, Zustand would be the natural next step for its minimal API and lack of provider boilerplate.

---

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| `< 640px` (mobile) | 1-column grid · sidebar slides in as overlay · navbar search hidden · modal slides up from bottom |
| `640px – 1023px` (tablet) | 2-column grid · sidebar overlay still used |
| `≥ 1024px` (desktop) | 4-column grid · sidebar always visible in flow · hamburger hidden |

---

## Features Implemented

### Core (required)
- Sidebar with 3 grouped nav sections + active-link highlight (left border + primary color)
- Sticky navbar with cart dropdown, notifications dropdown, profile dropdown
- `/file-manager/images` — "Recently Viewed" horizontal scroller + "All Images" grid
- `/file-manager/videos` — same pattern for videos
- `/file-manager/documents` — same pattern for documents
- `/file-manager/all-files` — folder cards dashboard + all files grid
- `/file-manager/trash` — restore / permanent delete / empty trash
- `FileCard` — reusable across all types; relative "opened X ago" timestamp derived from state
- `FileModal` — read-only image lightbox, native video player, document text preview
- Live search/filter in navbar narrows grids by file name
- Empty states on all grids and Trash page
- Fully responsive across mobile / tablet / desktop

### Bonus (extra credit)
- **Add file** — working forms on Images, Videos, Documents pages that update Context state
- **Trash + Restore flow** — "Move to Trash" on every card; restore or permanently delete from Trash page
- **Text size switcher** — small / medium / large controls in navbar persist via Context + `body` class

---

## Known Limitations

- Add/Edit/Delete flows are bonus implementations; the core assignment scope is read-only
- Images use [picsum.photos](https://picsum.photos) placeholder URLs — no real file upload
- Videos use public Google sample MP4s — no real media storage
- No persistence — state resets on page refresh (no localStorage or backend)
- No dark mode (not implemented this round)
