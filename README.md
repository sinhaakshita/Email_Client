# AI Mail — Intelligent Email Client

A modern AI-powered email client built with Next.js and React.

The application combines a clean email management interface with AI-assisted workflows such as email summarization and automatic reply generation.

This project was developed as an assignment/demo project using the temporary AI API credentials provided for evaluation.

---

## Features

### Email Management

- View emails in the inbox
- Read emails and automatically mark them as read
- Search emails
- Star and unstar emails
- View starred emails
- Archive emails
- View archived emails
- Delete emails
- Restore deleted emails
- Permanently delete emails
- View sent emails
- Compose new emails
- Save emails as drafts
- Edit saved drafts
- Delete drafts
- Send emails

### AI Features

- AI-powered email summarization
- Summaries focus on:
  - Main points
  - Important dates
  - Decisions
  - Action items
- AI-generated email replies
- Multiple reply tones:
  - Professional
  - Friendly
  - Concise
- AI-generated replies are automatically placed into the compose window
- Loading states for AI requests
- Error handling for failed AI requests

### UI / UX

- Light mode
- Dark mode
- Responsive email layout
- Animated inbox list
- Interactive AI assistant card
- Spotlight hover effect
- Smooth email interactions
- Unread email indicators
- Attachment display
- Modern sidebar navigation
- Lucide icons
- Empty states for folders
- Hover and transition effects

---

# Tech Stack

## Frontend

- Next.js
- React
- JavaScript
- CSS
- Tailwind CSS utilities

## AI

- OpenAI-compatible Chat Completions API
- `gpt-4o-mini`
- Provided assignment AI API

## UI and Animation

- Motion
- Lucide React
- React Bits-inspired components

---

# Project Structure

```text
project/
│
├── .env
├── package.json
├── README.md
│
├── public/
│
└── src/
    │
    ├── app/
    │   ├── page.js
    │   ├── globals.css
    │   │
    │   └── api/
    │       └── ai/
    │           └── chat/
    │               └── route.js
    │
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Inbox.jsx
    │   ├── EmailViewer.jsx
    │   ├── Compose.jsx
    │   ├── AnimatedList.jsx
    │   └── SpotlightCard.jsx
    │
    ├── data/
    │   └── emails.js
    │
    └── lib/
        └── ai.js