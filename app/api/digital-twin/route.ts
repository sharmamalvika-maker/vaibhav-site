import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { careerKnowledgeBase } from "@/lib/careerProfile";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const OPENROUTER_MODEL = "openai/gpt-oss-120b:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function extractApiKeyFromRootEnv(): string | undefined {
  try {
    const envPath = join(process.cwd(), "..", ".env");
    const envFile = readFileSync(envPath, "utf8");
    const match = envFile.match(
      /(?:^|\r?\n)\s*OPENROUTER_API_KEY\s*=\s*("?)([^"\r\n]+)\1/
    );
    return match?.[2]?.trim();
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const incomingMessages = Array.isArray(body.messages) ? body.messages : [];

    const sanitizedMessages = incomingMessages
      .filter((message) => message && typeof message.content === "string")
      .map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: message.content.trim().slice(0, 2000),
      }))
      .filter((message) => message.content.length > 0)
      .slice(-10);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one message." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.OPENROUTER_API_KEY?.trim() ?? extractApiKeyFromRootEnv();

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENROUTER_API_KEY was not found. Add it to vaibhav-site/.env.local or the project root .env.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Vaibhav Digital Twin",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: careerKnowledgeBase,
          },
          ...sanitizedMessages,
        ],
        temperature: 0.3,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `OpenRouter request failed (${response.status}). ${errorText}`,
        },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "No response was returned by the model." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
