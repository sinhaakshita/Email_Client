"use client";

import { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Inbox from "../components/Inbox";
import EmailViewer from "../components/EmailViewer";
import Compose from "../components/Compose";
import { emails as initialEmails } from "../data/emails";

export default function Home() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmailId, setSelectedEmailId] =
    useState(null);
  const [activeFolder, setActiveFolder] =
    useState("Inbox");
  const [search, setSearch] = useState("");
  const [composeOpen, setComposeOpen] =
    useState(false);
  const [composeDraft, setComposeDraft] =
    useState(null);

  const selectedEmail = useMemo(() => {
    return (
      emails.find(
        (email) => email.id === selectedEmailId
      ) || null
    );
  }, [emails, selectedEmailId]);

  const filteredEmails = useMemo(() => {
    let result = emails;

    if (activeFolder === "Inbox") {
      result = result.filter(
        (email) =>
          !email.trashed &&
          !email.archived &&
          !email.sent &&
          !email.draft
      );
    }

    if (activeFolder === "Starred") {
      result = result.filter(
        (email) =>
          email.starred &&
          !email.trashed
      );
    }

    if (activeFolder === "Sent") {
      result = result.filter(
        (email) =>
          email.sent &&
          !email.trashed
      );
    }

    if (activeFolder === "Drafts") {
      result = result.filter(
        (email) =>
          email.draft &&
          !email.trashed
      );
    }

    if (activeFolder === "Archive") {
      result = result.filter(
        (email) =>
          email.archived &&
          !email.trashed
      );
    }

    if (activeFolder === "Trash") {
      result = result.filter(
        (email) => email.trashed
      );
    }

    if (search.trim()) {
      const query = search
        .toLowerCase()
        .trim();

      result = result.filter((email) => {
        const searchableText = [
          email.sender?.name,
          email.sender?.email,
          email.subject,
          email.preview,
          email.body,
          email.to,
          ...(email.attachments || []).map(
            (attachment) =>
              attachment.name
          ),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          query
        );
      });
    }

    return result;
  }, [emails, activeFolder, search]);

  const unreadCount = emails.filter(
    (email) =>
      email.unread &&
      !email.trashed &&
      !email.archived &&
      !email.sent &&
      !email.draft
  ).length;

  const draftCount = emails.filter(
    (email) =>
      email.draft &&
      !email.trashed
  ).length;

  function handleSelectEmail(email) {
    if (email.draft) {
      setComposeDraft(email);
      setComposeOpen(true);
      setSelectedEmailId(null);
      return;
    }

    setSelectedEmailId(email.id);

    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );
  }

  function handleToggleStar(email) {
    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? {
              ...item,
              starred: !item.starred,
            }
          : item
      )
    );
  }

  function handleDelete(email) {
    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? {
              ...item,
              trashed: true,
              archived: false,
            }
          : item
      )
    );

    setSelectedEmailId(null);
  }

  function handleArchive(email) {
    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? {
              ...item,
              archived: true,
              trashed: false,
            }
          : item
      )
    );

    setSelectedEmailId(null);
  }

  function handleRestore(email) {
    setEmails((current) =>
      current.map((item) =>
        item.id === email.id
          ? {
              ...item,
              trashed: false,
              archived: false,
            }
          : item
      )
    );

    setSelectedEmailId(null);
  }

  function handlePermanentDelete(email) {
    setEmails((current) =>
      current.filter(
        (item) => item.id !== email.id
      )
    );

    setSelectedEmailId(null);
  }

  function handleSend(message) {
    const newEmail = {
      id: `sent-${Date.now()}`,
      threadId: `thread-${Date.now()}`,

      sender: {
        name: "You",
        email: "you@company.com",
        avatar: "YO",
      },

      subject:
        message.subject ||
        "(No subject)",

      body: message.body || "",

      preview:
        message.body?.slice(0, 100) ||
        "",

      timestamp: "Just now",
      date: "Today",

      unread: false,
      starred: false,
      trashed: false,
      archived: false,
      draft: false,
      sent: true,

      to: message.to || "",

      attachments: [],
      labels: [],
    };

    setEmails((current) => {
      const withoutDraft =
        message.draftId
          ? current.filter(
              (email) =>
                email.id !==
                message.draftId
            )
          : current;

      return [
        newEmail,
        ...withoutDraft,
      ];
    });

    setComposeOpen(false);
    setComposeDraft(null);
  }

  function handleSaveDraft(draftData) {
    const draftId =
      draftData.id ||
      `draft-${Date.now()}`;

    const draft = {
      id: draftId,
      threadId: `thread-${draftId}`,

      sender: {
        name: "You",
        email: "you@company.com",
        avatar: "YO",
      },

      subject:
        draftData.subject ||
        "(No subject)",

      body: draftData.body || "",

      preview:
        draftData.body?.slice(0, 100) ||
        "",

      timestamp: "Just now",
      date: "Today",

      unread: false,
      starred: false,
      trashed: false,
      archived: false,
      draft: true,
      sent: false,

      to: draftData.to || "",

      attachments: [],
      labels: [],
    };

    setEmails((current) => {
      const exists = current.some(
        (email) =>
          email.id === draftId
      );

      if (exists) {
        return current.map((email) =>
          email.id === draftId
            ? draft
            : email
        );
      }

      return [
        draft,
        ...current,
      ];
    });

    setComposeOpen(false);
    setComposeDraft(null);
  }

  function handleDeleteDraft(draftId) {
    setEmails((current) =>
      current.filter(
        (email) =>
          email.id !== draftId
      )
    );

    setComposeOpen(false);
    setComposeDraft(null);
  }

  function handleFolderChange(folder) {
    setActiveFolder(folder);
    setSelectedEmailId(null);
    setComposeDraft(null);
    setSearch("");
  }

  function handleCompose() {
    setSelectedEmailId(null);
    setComposeDraft(null);
    setComposeOpen(true);
  }

  function handleReply() {
    setComposeDraft(null);
    setComposeOpen(true);
  }

  function handleAIReply(reply) {
    setSelectedEmailId(null);

    setComposeDraft({
      id: undefined,
      to: reply.to,
      subject: reply.subject,
      body: reply.body,
    });

    setComposeOpen(true);
  }

  return (
    <main className="email-app">
      <Sidebar
        activeFolder={activeFolder}
        onFolderChange={
          handleFolderChange
        }
        onCompose={handleCompose}
        unreadCount={unreadCount}
        draftCount={draftCount}
      />

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-title">
            Mail
          </div>

          <div className="search-box">
            <span className="search-icon">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search mail..."
              aria-label="Search mail"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
                style={{
                  position:
                    "absolute",
                  right: "10px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  border: "none",
                  background:
                    "transparent",
                  color:
                    "var(--text-muted)",
                  fontSize: "16px",
                  cursor:
                    "pointer",
                }}
              >
                ×
              </button>
            )}
          </div>
        </header>

        <div className="mail-layout">
          <Inbox
            emails={filteredEmails}
            selectedEmail={
              selectedEmail
            }
            onSelectEmail={
              handleSelectEmail
            }
            onToggleStar={
              handleToggleStar
            }
            activeFolder={
              activeFolder
            }
          />

          {selectedEmail ? (
            <EmailViewer
              email={selectedEmail}
              activeFolder={
                activeFolder
              }
              onBack={() =>
                setSelectedEmailId(
                  null
                )
              }
              onToggleStar={
                handleToggleStar
              }
              onDelete={
                handleDelete
              }
              onArchive={
                handleArchive
              }
              onRestore={
                handleRestore
              }
              onPermanentDelete={
                handlePermanentDelete
              }
              onReply={
                handleReply
              }
              onAIReply={
                handleAIReply
              }
            />
          ) : (
            <div className="empty-state">
              <div>
                <div className="empty-state-icon">
                  ✉
                </div>

                <div className="empty-state-title">
                  Select an email to
                  read
                </div>

                <div className="empty-state-description">
                  Choose an email from
                  your inbox to view
                  its contents.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {composeOpen && (
        <Compose
          email={
            composeDraft
              ? null
              : selectedEmail
          }
          draft={composeDraft}
          onClose={() => {
            setComposeOpen(false);
            setComposeDraft(
              null
            );
          }}
          onSend={handleSend}
          onSaveDraft={
            handleSaveDraft
          }
          onDeleteDraft={
            handleDeleteDraft
          }
        />
      )}
    </main>
  );
}