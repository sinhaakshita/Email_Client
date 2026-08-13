"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Inbox from "@/components/Inbox";
import EmailViewer from "@/components/EmailViewer";

export default function Home() {
  const [selectedEmail, setSelectedEmail] =
    useState(null);

  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />

      {!selectedEmail ? (
        <Inbox
          onSelectEmail={setSelectedEmail}
        />
      ) : (
        <EmailViewer
          email={selectedEmail}
          onBack={() => setSelectedEmail(null)}
        />
      )}
    </main>
  );
}