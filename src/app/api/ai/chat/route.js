import { NextResponse } from "next/server";

const AI_API_URL =
  "https://ai-api.userfacet.com/v1/chat/completions";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return NextResponse.json(
        {
          error: {
            message:
              "Messages must be a non-empty array.",
          },
        },
        { status: 400 }
      );
    }

    const response = await fetch(AI_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${process.env.AI_API_TOKEN}`,
      },

      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("AI API Error:", error);

    return NextResponse.json(
      {
        error: {
          message:
            "Failed to communicate with the AI service.",
        },
      },
      { status: 500 }
    );
  }
}