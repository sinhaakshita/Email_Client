"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-800 p-6">
      <h1 className="mb-10 text-2xl font-bold">
        Mail
      </h1>

      <nav className="space-y-2">
        <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-900">
          Inbox
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-900">
          Starred
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-900">
          Sent
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-900">
          Drafts
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-900">
          Trash
        </button>
      </nav>
    </aside>
  );
}