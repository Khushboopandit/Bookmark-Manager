import Database from "better-sqlite3";

// This constant creates a single shared database connection for the whole app
const db = new Database("bookmarks.db");

// This statement ensures the bookmarks table exists before it is used
db.exec(`
  CREATE TABLE IF NOT EXISTS bookmarks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    tag TEXT
  )
`);

export default db;
