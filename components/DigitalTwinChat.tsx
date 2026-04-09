"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  "What are your biggest reliability wins at Google?",
  "How did your career evolve from research to SRE?",
  "What technologies do you use most often?",
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Vaibhav's digital twin. Ask me about his career journey, projects, skills, and research.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  async function sendMessage(content: string) {
    const userMessage: ChatMessage = { role: "user", content: content.trim() };
    if (!userMessage.content) return;

    setError(null);
    setIsLoading(true);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const payload = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !payload.reply) {
        throw new Error(payload.error || "Unable to get a response right now.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: payload.reply as string },
      ]);
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Request failed. Please retry."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage(input);
  }

  return (
    <div className="glass-panel p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white md:text-2xl">
          Talk to My Digital Twin
        </h3>
        <span className="rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
          OpenRouter
        </span>
      </div>

      <p className="mb-5 text-sm text-white/70">
        Ask anything about career milestones, projects, technical strengths, or
        mentoring experience.
      </p>

      <div className="mb-5 max-h-96 space-y-3 overflow-y-auto rounded-2xl border border-white/15 bg-black/20 p-4">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto max-w-[85%] bg-cyan-300/20 text-cyan-50"
                : "mr-auto max-w-[90%] bg-white/10 text-white/85"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading ? (
          <div className="mr-auto max-w-[90%] rounded-xl bg-white/10 px-4 py-3 text-sm text-white/70">
            Thinking...
          </div>
        ) : null}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
            onClick={() => void sendMessage(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={3}
          placeholder="Ask about career journey, impact, and projects..."
          className="w-full rounded-xl border border-white/20 bg-black/20 p-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-cyan-300/60"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-rose-200">{error ?? ""}</p>
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-full border border-cyan-200/40 bg-cyan-300/20 px-5 py-2 text-sm font-medium text-cyan-50 transition hover:-translate-y-0.5 hover:bg-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
