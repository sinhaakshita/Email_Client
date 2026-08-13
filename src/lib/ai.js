export async function askAI(messages) {
  const response = await fetch("/api/ai/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "AI authentication failed."
      );
    }

    if (response.status === 429) {
      throw new Error(
        "You've reached your AI usage limit."
      );
    }

    throw new Error(
      data?.error?.message ||
        data?.error ||
        "AI request failed."
    );
  }

  return data.choices[0].message.content;
}