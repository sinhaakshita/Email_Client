"use client";

import {
  Paperclip,
  Star,
} from "lucide-react";
import AnimatedList from "./AnimatedList";

export default function Inbox({
  emails,
  selectedEmail,
  onSelectEmail,
  onToggleStar,
  activeFolder,
}) {
  const folderTitles = {
    Inbox: "Inbox",
    Starred: "Starred",
    Sent: "Sent",
    Drafts: "Drafts",
    Archive: "Archive",
    Trash: "Trash",
  };

  const title =
    folderTitles[activeFolder] ||
    "Inbox";

  const unreadCount = emails.filter(
    (email) => email.unread
  ).length;

  const handleStarClick = (
    event,
    email
  ) => {
    event.stopPropagation();
    onToggleStar(email);
  };

  const renderEmail = (email) => {
    const isSelected =
      selectedEmail?.id === email.id;

    return (
      <div
        onClick={() =>
          onSelectEmail(email)
        }
        className={`email-card ${
          email.unread ? "unread" : ""
        } ${
          isSelected ? "selected" : ""
        }`}
      >
        <div className="email-card-top">
          {email.unread && (
            <span className="unread-dot" />
          )}

          <span className="email-sender">
            {email.sender?.name ||
              "Unknown sender"}
          </span>

          <span className="email-time">
            {email.timestamp}
          </span>

          {activeFolder !== "Trash" && (
            <button
              type="button"
              onClick={(event) =>
                handleStarClick(
                  event,
                  email
                )
              }
              aria-label={
                email.starred
                  ? "Unstar email"
                  : "Star email"
              }
              className="star-button"
            >
              <Star
                size={18}
                strokeWidth={1.8}
                fill={
                  email.starred
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          )}
        </div>

        <div className="email-subject">
          {email.subject}
        </div>

        <div className="email-preview">
          {email.preview ||
            email.body?.slice(0, 120)}
        </div>

        <div className="email-meta">
          {email.attachments?.length >
            0 && (
            <span>
              <Paperclip size={13} />
              {email.attachments.length}
            </span>
          )}

          {email.starred &&
            activeFolder !== "Trash" && (
              <span>Starred</span>
            )}

          {email.unread && (
            <span>Unread</span>
          )}

          {email.draft && (
            <span>Draft</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="inbox-panel">
      <div className="inbox-header">
        <h2>{title}</h2>

        <p>
          {emails.length}{" "}
          {emails.length === 1
            ? "message"
            : "messages"}

          {unreadCount > 0 && (
            <>
              {" · "}
              <strong>
                {unreadCount} unread
              </strong>
            </>
          )}
        </p>
      </div>

      {emails.length === 0 ? (
        <div className="empty-state">
          <div>
            <div className="empty-state-icon">
              {activeFolder === "Trash"
                ? "⌫"
                : activeFolder ===
                    "Starred"
                  ? "☆"
                  : activeFolder ===
                      "Archive"
                    ? "▣"
                    : activeFolder ===
                        "Drafts"
                      ? "▱"
                      : "✉"}
            </div>

            <div className="empty-state-title">
              No emails here
            </div>

            <div className="empty-state-description">
              {activeFolder ===
              "Starred"
                ? "Star an email to find it here."
                : activeFolder ===
                    "Trash"
                  ? "Deleted emails will appear here."
                  : activeFolder ===
                      "Archive"
                    ? "Archived emails will appear here."
                    : activeFolder ===
                        "Drafts"
                      ? "Saved drafts will appear here."
                      : "Your inbox is currently empty."}
            </div>
          </div>
        </div>
      ) : (
        <div className="email-list">
          <AnimatedList
            items={emails}
            renderItem={renderEmail}
          />
        </div>
      )}
    </section>
  );
}