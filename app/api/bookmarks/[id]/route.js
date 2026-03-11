import { NextResponse } from "next/server";
import db from "../../../../lib/db";

// This function handles DELETE requests to remove a bookmark by its id
export async function DELETE(request, { params }) {
  try {
    const rawId = params?.id;
    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { message: "Invalid bookmark id." },
        { status: 400 }
      );
    }

    const statement = db.prepare("DELETE FROM bookmarks WHERE id = ?");
    const result = statement.run(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { message: "Bookmark not found." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Bookmark deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting bookmark:", error);

    return NextResponse.json(
      { message: "Failed to delete bookmark." },
      { status: 500 }
    );
  }
}

// This function handles PUT requests to update an existing bookmark by its id
export async function PUT(request, { params }) {
  try {
    const rawId = params?.id;
    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { message: "Invalid bookmark id." },
        { status: 400 }
      );
    }

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

    const update = db.prepare(
      "UPDATE bookmarks SET title = ?, url = ?, tag = ? WHERE id = ?"
    );
    const result = update.run(trimmedTitle, trimmedUrl, trimmedTag, id);

    if (result.changes === 0) {
      return NextResponse.json(
        { message: "Bookmark not found." },
        { status: 400 }
      );
    }

    const query = db.prepare(
      "SELECT id, title, url, tag FROM bookmarks WHERE id = ?"
    );
    const updatedBookmark = query.get(id);

    return NextResponse.json(updatedBookmark, { status: 200 });
  } catch (error) {
    console.error("Error updating bookmark:", error);

    return NextResponse.json(
      { message: "Failed to update bookmark." },
      { status: 500 }
    );
  }
}
