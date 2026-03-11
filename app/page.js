import AddBookmarkForm from "../components/AddBookmarkForm";
import SearchInput from "../components/SearchInput";
import BookmarkList from "../components/BookmarkList";

// This function renders the main page layout and bookmark list UI
export default function Page() {
  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="border-b border-yellow-200 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bookmark Manager
          </h1>
          <p className="mt-1 text-sm text-yellow-800">
            Simple UI preview using dummy data only.
          </p>
        </header>
        <AddBookmarkForm />
        <SearchInput />
        <BookmarkList />
      </div>
    </div>
  );
}

