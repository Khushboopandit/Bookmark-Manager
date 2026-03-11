import { NextResponse } from "next/server";
import db from "../../../lib/db";

// This function handles GET requests to fetch all bookmarks from the database
export async function GET() {
  try {
    const rows = db
      .prepare("SELECT id, title, url, tag FROM bookmarks ORDER BY id DESC")
      .all();

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);

    return NextResponse.json(
      { message: "Failed to fetch bookmarks." },
      { status: 500 }
    );
  }
}

// This function handles POST requests to add a new bookmark to the database
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, url, tag } = body || {};

    const trimmedTitle = typeof title === "string" ? title.trim() : "";
    const trimmedUrl = typeof url === "string" ? url.trim() : "";
    const trimmedTag = typeof tag === "string" ? tag.trim() : null;

    if (!trimmedTitle || !trimmedUrl) {
      return NextResponse.json(
        { message: "Title and URL are required." },
        { status: 400 }
      );
    }

    const insert = db.prepare(
      "INSERT INTO bookmarks (title, url, tag) VALUES (?, ?, ?)"
    );
    const result = insert.run(trimmedTitle, trimmedUrl, trimmedTag);

    const query = db.prepare(
      "SELECT id, title, url, tag FROM bookmarks WHERE id = ?"
    );
    const newBookmark = query.get(result.lastInsertRowid);

    return NextResponse.json(newBookmark, { status: 201 });
  } catch (error) {
    console.error("Error creating bookmark:", error);

    return NextResponse.json(
      { message: "Failed to create bookmark." },
      { status: 500 }
    );
  }
}
