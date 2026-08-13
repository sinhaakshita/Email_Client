"use client";

import { emails } from "@/data/emails";

export default function Inbox({ onSelectEmail }) {
  return (
    <section className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Inbox
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {emails.length} messages
        </p>
      </div>

      {/* Email List */}
      <div className="overflow-hidden rounded-xl border border-gray-800">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`cursor-pointer border-b border-gray-800 p-5 transition last:border-b-0 hover:bg-gray-900 ${
              !email.read ? "bg-gray-950" : ""
            }`}
          >
            {/* Sender + Time */}
            <div className="flex items-center justify-between">
              <span
                className={
                  !email.read
                    ? "font-semibold"
                    : "font-normal"
                }
              >
                {email.sender.name}
              </span>

              <span className="text-sm text-gray-500">
                {email.timestamp}
              </span>
            </div>

            {/* Subject */}
            <div
              className={`mt-1 ${
                !email.read ? "font-semibold" : ""
              }`}
            >
              {email.subject}
            </div>

            {/* Preview */}
            <p className="mt-1 truncate text-sm text-gray-500">
              {email.preview}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}