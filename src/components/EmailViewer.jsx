"use client";

import { useState } from "react";
import {
  Archive,
  Paperclip,
  Reply,
  Star,
  Trash2,
  Undo2,
} from "lucide-react";
import { askAI } from "@/lib/ai";
import SpotlightCard from "./SpotlightCard";

export default function EmailViewer({
  email,
  activeFolder,
  onBack,
  onToggleStar,
  onDelete,
  onArchive,
  onRestore,
  onPermanentDelete,
  onReply,
  onAIReply,
}) {
  const [summary, setSummary] =
    useState("");

  const [loadingSummary, setLoadingSummary] =
    useState(false);

  const [summaryError, setSummaryError] =
    useState("");

  const [replyLoading, setReplyLoading] =
    useState(false);

  const [replyError, setReplyError] =
    useState("");

  if (!email) {
    return (
      <section className="empty-state">
        <div>
          <div className="empty-state-icon">
            ✉
          </div>

          <div className="empty-state-title">
            Select an email to read
          </div>

          <div className="empty-state-description">
            Choose an email from your inbox
            to view its contents.
          </div>
        </div>
      </section>
    );
  }

  const summarizeEmail = async () => {
    setLoadingSummary(true);
    setSummaryError("");

    try {
      const result = await askAI([
        {
          role: "system",
          content:
            "You are an AI assistant inside an email client. Summarize emails clearly and concisely. Focus on the main point, important dates, decisions, and action items. Use 3 to 5 bullet points.",
        },
        {
          role: "user",
          content: `Summarize this email:

Subject: ${email.subject}

From: ${email.sender.name}

Email:
${email.body}`,
        },
      ]);

      setSummary(result);
    } catch (error) {
      console.error(error);

      setSummaryError(
        error?.message ||
          "Unable to generate the summary."
      );
    } finally {
      setLoadingSummary(false);
    }
  };

  const generateReply = async (tone) => {
    setReplyLoading(true);
    setReplyError("");

    try {
      const result = await askAI([
        {
          role: "system",
          content: `You are an AI email assistant.

Write a reply to the email provided by the user.

Tone: ${tone}

Rules:
- Write only the email body.
- Do not include a subject.
- Do not add explanations before or after the email.
- Keep the reply natural and professional.
- Address the important points from the original email.
- Do not invent information that is not present in the original email.`,
        },
        {
          role: "user",
          content: `Write a ${tone.toLowerCase()} reply to this email.

From: ${email.sender.name}
Email: ${email.sender.email}
Subject: ${email.subject}

Original email:
${email.body}`,
        },
      ]);

      onAIReply({
        to: email.sender.email,
        subject: `Re: ${email.subject}`,
        body: result,
      });
    } catch (error) {
      console.error(error);

      setReplyError(
        error?.message ||
          "Unable to generate a reply."
      );
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <section className="viewer">
      <button
        onClick={onBack}
        className="back-button"
        type="button"
      >
        ← Back to inbox
      </button>

      <div className="max-w-4xl">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: "20px",
          }}
        >
          <h1 className="viewer-title">
            {email.subject}
          </h1>

          {activeFolder !== "Trash" && (
            <button
              type="button"
              onClick={() =>
                onToggleStar(email)
              }
              aria-label={
                email.starred
                  ? "Unstar email"
                  : "Star email"
              }
              className="viewer-star-button"
            >
              <Star
                size={20}
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

        <div className="sender-row">
          <div className="avatar">
            {email.sender.avatar}
          </div>

          <div className="sender-details">
            <p className="sender-name">
              {email.sender.name}
            </p>

            <p className="sender-email">
              {email.sender.email}
            </p>
          </div>

          <span className="sender-time">
            {email.timestamp}
          </span>
        </div>

        {activeFolder !== "Trash" && (
          <SpotlightCard className="ai-card">
            <div className="ai-header">
              <h2 className="ai-title">
                ✨ AI Assistant
              </h2>

              <button
                onClick={summarizeEmail}
                disabled={loadingSummary}
                className="ai-button"
                type="button"
              >
                {loadingSummary
                  ? "Summarizing..."
                  : summary
                    ? "Regenerate summary"
                    : "Summarize"}
              </button>
            </div>

            {summary && (
              <div className="ai-summary">
                {summary}
              </div>
            )}

            {summaryError && (
              <p
                className="ai-summary"
                style={{
                  color:
                    "var(--danger)",
                }}
              >
                {summaryError}
              </p>
            )}

            <div
              style={{
                marginTop: "18px",
                paddingTop: "16px",
                borderTop:
                  "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  color:
                    "var(--text-secondary)",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Draft a reply with AI
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <button
                  type="button"
                  className="ai-button"
                  disabled={replyLoading}
                  onClick={() =>
                    generateReply(
                      "Professional"
                    )
                  }
                >
                  Professional
                </button>

                <button
                  type="button"
                  className="ai-button"
                  disabled={replyLoading}
                  onClick={() =>
                    generateReply(
                      "Friendly"
                    )
                  }
                >
                  Friendly
                </button>

                <button
                  type="button"
                  className="ai-button"
                  disabled={replyLoading}
                  onClick={() =>
                    generateReply(
                      "Concise"
                    )
                  }
                >
                  Concise
                </button>
              </div>

              {replyLoading && (
                <p className="ai-summary">
                  Drafting your reply...
                </p>
              )}

              {replyError && (
                <p
                  className="ai-summary"
                  style={{
                    color:
                      "var(--danger)",
                  }}
                >
                  {replyError}
                </p>
              )}
            </div>
          </SpotlightCard>
        )}

        <div className="email-body">
          {email.body}
        </div>

        {email.attachments?.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 font-semibold">
              Attachments
            </h3>

            <div className="space-y-3">
              {email.attachments.map(
                (attachment) => (
                  <div
                    key={attachment.name}
                    className="attachment-card"
                  >
                    <div className="attachment-icon">
                      <Paperclip size={18} />
                    </div>

                    <div>
                      <p className="attachment-name">
                        {attachment.name}
                      </p>

                      <p className="attachment-type">
                        {attachment.size}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="action-button"
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      Download
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="email-actions">
          {activeFolder === "Trash" ? (
            <>
              <button
                type="button"
                className="action-button primary"
                onClick={() =>
                  onRestore(email)
                }
              >
                <Undo2 size={16} />
                Restore
              </button>

              <button
                type="button"
                className="action-button danger-button"
                onClick={() =>
                  onPermanentDelete(
                    email
                  )
                }
              >
                <Trash2 size={16} />
                Delete permanently
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="action-button primary"
                onClick={onReply}
              >
                <Reply size={16} />
                Reply
              </button>

              <button
                type="button"
                className="action-button"
                onClick={() =>
                  onArchive(email)
                }
              >
                <Archive size={16} />
                Archive
              </button>

              <button
                type="button"
                className="action-button danger-button"
                onClick={() =>
                  onDelete(email)
                }
              >
                <Trash2 size={16} />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}