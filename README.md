# Bookmark Manager

A simple app to save, search, and filter bookmarks. Built with Next.js and SQLite.

## What it does

- Add bookmarks (title, URL, optional tag)
- View all bookmarks in a grid
- Search by title
- Filter by tag (All + tags from your bookmarks)
- Delete with a confirmation modal

## Tech

- **Next.js 16** (App Router)
- **SQLite** (better-sqlite3) for storage
- **Tailwind CSS** for styling
- **React 19**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` – pages and API routes (`/api/bookmarks` for CRUD)
- `components/` – UI (AddBookmarkForm, BookmarkCard, FilterTags, SearchInput, modals)
- `context/` – BookmarkContext for state
- `lib/` – DB connection
