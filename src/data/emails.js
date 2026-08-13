export const emails = [
  {
    id: 1,
    threadId: "thread-1",

    sender: {
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "SC",
    },

    subject: "Q3 Product Launch Update",

    preview:
      "We've finalized the launch timeline and need your feedback on...",

    body: `Hi team,

We've finalized the launch timeline for the Q3 product release.

The new target launch date is September 15. Before then, we need to complete the final design review and QA testing.

Please send your feedback by Friday so we can keep everything on schedule.

Thanks,
Sarah`,

    timestamp: "10:42 AM",
    date: "Today",

    read: false,
    starred: true,

    attachments: [],

    labels: ["Work"],
  },

  {
    id: 2,
    threadId: "thread-2",

    sender: {
      name: "Michael Rodriguez",
      email: "michael.rodriguez@company.com",
      avatar: "MR",
    },

    subject: "Updated API Documentation",

    preview:
      "I've uploaded the latest version of the API documentation...",

    body: `Hi,

I've uploaded the latest version of the API documentation.

The authentication section has been updated and I've added examples for the new endpoints.

Let me know if anything needs clarification.

Best,
Michael`,

    timestamp: "9:18 AM",
    date: "Today",

    read: true,
    starred: false,

    attachments: [
      {
        name: "API-Documentation.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
    ],

    labels: ["Work"],
  },

  {
    id: 3,
    threadId: "thread-3",

    sender: {
      name: "Emily Watson",
      email: "emily.watson@company.com",
      avatar: "EW",
    },

    subject: "Team Meeting — Tomorrow",

    preview:
      "Just a reminder that our weekly team meeting is scheduled for...",

    body: `Hi everyone,

Just a reminder that our weekly team meeting is scheduled for tomorrow at 10:00 AM.

We'll discuss:

• Current sprint progress
• Upcoming deadlines
• Open blockers

See you there!

Emily`,

    timestamp: "Yesterday",
    date: "Yesterday",

    read: true,
    starred: false,

    attachments: [],

    labels: ["Meetings"],
  },

  {
    id: 4,
    threadId: "thread-4",

    sender: {
      name: "James Wilson",
      email: "james.wilson@company.com",
      avatar: "JW",
    },

    subject: "Design Review Feedback",

    preview:
      "I've reviewed the latest dashboard designs and have a few...",

    body: `Hi Sarah,

I've reviewed the latest dashboard designs.

Overall they look great. I have a few suggestions regarding the navigation and notification system.

I've attached my detailed feedback.

Regards,
James`,

    timestamp: "Yesterday",
    date: "Yesterday",

    read: false,
    starred: false,

    attachments: [
      {
        name: "Design-Feedback.pdf",
        size: "1.1 MB",
        type: "pdf",
      },
    ],

    labels: ["Work"],
  },
];