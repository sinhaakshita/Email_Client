"use client";

import { useEffect, useState } from "react";
import {
  Archive,
  FileText,
  Inbox as InboxIcon,
  Moon,
  Send,
  Star,
  Sun,
  Trash2,
  PenLine,
} from "lucide-react";

export default function Sidebar({
  activeFolder = "Inbox",
  onFolderChange,
  onCompose,
  unreadCount = 0,
  draftCount = 0,
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add(
        "dark"
      );
      setDark(true);
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !dark;

    setDark(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme
    );

    localStorage.setItem(
      "theme",
      nextTheme ? "dark" : "light"
    );
  };

  const folders = [
    {
      name: "Inbox",
      icon: InboxIcon,
    },
    {
      name: "Starred",
      icon: Star,
    },
    {
      name: "Sent",
      icon: Send,
    },
    {
      name: "Drafts",
      icon: FileText,
    },
    {
      name: "Archive",
      icon: Archive,
    },
    {
      name: "Trash",
      icon: Trash2,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>Mail</h1>
        <p>Your intelligent inbox</p>
      </div>

      <button
        className="compose-button"
        onClick={onCompose}
        type="button"
      >
        <PenLine size={17} />
        <span>Compose</span>
      </button>

      <nav className="nav-section">
        {folders.map((folder) => {
          const Icon = folder.icon;

          return (
            <button
              key={folder.name}
              type="button"
              className={`nav-item ${
                activeFolder ===
                folder.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onFolderChange(
                  folder.name
                )
              }
            >
              <Icon
                size={18}
                strokeWidth={1.8}
              />

              <span>{folder.name}</span>

              {folder.name ===
                "Inbox" &&
                unreadCount > 0 && (
                  <span className="nav-count">
                    {unreadCount}
                  </span>
                )}

              {folder.name ===
                "Drafts" &&
                draftCount > 0 && (
                  <span className="nav-count">
                    {draftCount}
                  </span>
                )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
        >
          {dark ? (
            <>
              <Sun size={17} />
              <span>Light mode</span>
            </>
          ) : (
            <>
              <Moon size={17} />
              <span>Dark mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}