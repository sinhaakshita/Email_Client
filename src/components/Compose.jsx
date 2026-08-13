"use client";

import { useEffect, useState } from "react";

export default function Compose({
  email,
  draft,
  onClose,
  onSend,
  onSaveDraft,
  onDeleteDraft,
}) {
  const [to, setTo] = useState("");
  const [subject, setSubject] =
    useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (draft) {
      setTo(draft.to || "");
      setSubject(
        draft.subject || ""
      );
      setBody(draft.body || "");
      return;
    }

    if (email) {
      setTo(
        email.sender?.email || ""
      );

      setSubject(
        email.subject
          ? `Re: ${email.subject}`
          : ""
      );

      setBody(
        `\n\nOn ${email.timestamp}, ${email.sender.name} wrote:\n> ${email.body}`
      );

      return;
    }

    setTo("");
    setSubject("");
    setBody("");
  }, [draft, email]);

  const handleSend = (event) => {
    event.preventDefault();

    if (
      !to.trim() ||
      !body.trim()
    ) {
      return;
    }

    onSend({
      to: to.trim(),
      subject:
        subject.trim() ||
        "(No subject)",
      body: body.trim(),
      draftId: draft?.id,
    });
  };

  const handleSaveDraft = () => {
    if (
      !to.trim() &&
      !subject.trim() &&
      !body.trim()
    ) {
      onClose();
      return;
    }

    onSaveDraft({
      id: draft?.id,
      to: to.trim(),
      subject: subject.trim(),
      body,
    });
  };

  const handleClose = () => {
    handleSaveDraft();
  };

  const handleDiscard = () => {
    if (
      draft &&
      onDeleteDraft
    ) {
      onDeleteDraft(draft.id);
      return;
    }

    onClose();
  };

  return (
    <div
      className="compose-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >
      <div className="compose-window">
        <div className="compose-header">
          <strong>
            {draft
              ? "Edit draft"
              : email
                ? "Reply"
                : "New message"}
          </strong>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close compose"
          >
            ×
          </button>
        </div>

        <form
          className="compose-form"
          onSubmit={handleSend}
        >
          <input
            className="compose-input"
            type="email"
            placeholder="To"
            value={to}
            onChange={(event) =>
              setTo(
                event.target.value
              )
            }
          />

          <input
            className="compose-input"
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(event) =>
              setSubject(
                event.target.value
              )
            }
          />

          <textarea
            className="compose-textarea"
            placeholder="Write your message..."
            value={body}
            onChange={(event) =>
              setBody(
                event.target.value
              )
            }
          />

          <div className="compose-footer">
            <button
              type="button"
              className="action-button"
              onClick={
                handleDiscard
              }
            >
              Discard
            </button>

            <button
              type="button"
              className="action-button"
              onClick={
                handleSaveDraft
              }
            >
              Save draft
            </button>

            <button
              type="submit"
              className="action-button primary"
              disabled={
                !to.trim() ||
                !body.trim()
              }
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}