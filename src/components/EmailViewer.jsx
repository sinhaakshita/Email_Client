"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

export default function EmailViewer({ email, onBack }) {
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState("");

  if (!email) {
    return (
      <section className="flex flex-1 items-center justify-center">
        <p className="text-gray-500">
          Select an email to read
        </p>
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
      setSummaryError(error.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <section className="flex-1 overflow-y-auto p-8">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-gray-500 transition hover:text-white"
      >
        ← Back to inbox
      </button>

      <div className="max-w-4xl">
        {/* Email Header */}
        <div className="mb-8 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-semibold">
            {email.subject}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 font-semibold">
              {email.sender.avatar}
            </div>

            <div>
              <p className="font-medium">
                {email.sender.name}
              </p>

              <p className="text-sm text-gray-500">
                {email.sender.email}
              </p>
            </div>

            <span className="ml-auto text-sm text-gray-500">
              {email.timestamp}
            </span>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-8 rounded-xl border border-gray-800 bg-gray-950 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              ✨ AI Summary
            </h2>

            <button
              onClick={summarizeEmail}
              disabled={loadingSummary}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingSummary
                ? "Summarizing..."
                : summary
                  ? "Regenerate"
                  : "Summarize email"}
            </button>
          </div>

          {summary && (
            <div className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-300">
              {summary}
            </div>
          )}

          {summaryError && (
            <p className="mt-4 text-sm text-red-400">
              {summaryError}
            </p>
          )}

          {!summary && !loadingSummary && !summaryError && (
            <p className="mt-3 text-sm text-gray-500">
              Get a quick summary of this email, including
              important dates and action items.
            </p>
          )}
        </div>

        {/* Email Body */}
        <div className="whitespace-pre-line leading-7 text-gray-300">
          {email.body}
        </div>

        {/* Attachments */}
        {email.attachments.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 font-semibold">
              Attachments
            </h3>

            <div className="space-y-3">
              {email.attachments.map((attachment) => (
                <div
                  key={attachment.name}
                  className="flex items-center justify-between rounded-lg border border-gray-800 p-4"
                >
                  <div>
                    <p className="font-medium">
                      {attachment.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {attachment.size}
                    </p>
                  </div>

                  <button className="text-sm text-blue-400 transition hover:text-blue-300">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex gap-3">
          <button className="rounded-lg border border-gray-700 px-5 py-2 transition hover:bg-gray-900">
            Reply
          </button>

          <button className="rounded-lg border border-gray-700 px-5 py-2 transition hover:bg-gray-900">
            Forward
          </button>
        </div>
      </div>
    </section>
  );
}