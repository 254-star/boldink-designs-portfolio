import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { greeting, getBotResponse, type ChatMessage, type QuickReply } from "@/data/chatbot";

const STORAGE_KEY = "boldink-chat-session";

function makeUserMessage(text: string): ChatMessage {
  return { id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, role: "user", text };
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Restore session on mount.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore storage errors.
    }

    // Small nudge after the visitor has been on the page a while.
    const timer = setTimeout(() => setShowHint(true), 6000);
    const hideTimer = setTimeout(() => setShowHint(false), 14000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Persist session whenever messages change.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors.
    }
  }, [messages]);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when opened.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Close on Escape key.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = makeUserMessage(trimmed);
    const botMsg = getBotResponse(trimmed);

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleQuickReply(reply: QuickReply) {
    if (reply.intent === "whatsapp") {
      const userMsg = makeUserMessage(reply.label);
      const botMsg = getBotResponse("whatsapp");
      setMessages((prev) => [...prev, userMsg, botMsg]);
      window.open(site.whatsapp, "_blank", "noopener,noreferrer");
      return;
    }

    if (reply.intent === "email") {
      const userMsg = makeUserMessage(reply.label);
      const botMsg = getBotResponse("email");
      setMessages((prev) => [...prev, userMsg, botMsg]);
      window.location.href = `mailto:${site.email}`;
      return;
    }

    handleSend(reply.label);
  }

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 left-5 z-40 flex items-end gap-3">
        {showHint && !open && (
          <div className="mb-2 hidden max-w-[200px] rounded-xl border border-border bg-surface px-3 py-2 text-xs text-foreground shadow-lg sm:block">
            Need help? Ask about services, pricing, or projects.
          </div>
        )}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            open ? "bg-muted text-foreground" : "bg-primary text-primary-foreground",
          )}
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="BOLDINK chat"
          className="fixed bottom-[4.5rem] left-5 z-50 flex w-[calc(100%-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:bottom-20 sm:left-5"
          style={{ height: "min(600px, calc(100dvh - 7rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{site.name}</p>
                <p className="text-xs text-muted-foreground">Replies within a few hours</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm border border-border bg-surface text-foreground",
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies attached to the last assistant message */}
            {(() => {
              const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
              if (!lastAssistant?.quickReplies?.length) return null;
              return (
                <div className="mt-3 flex flex-wrap gap-2">
                  {lastAssistant.quickReplies.map((reply) => (
                    <button
                      key={reply.intent}
                      type="button"
                      onClick={() => handleQuickReply(reply)}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="border-t border-border bg-surface p-3"
          >
            <div className="flex items-end gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message"
                className="flex-1 rounded-full border-border bg-background px-4 py-2.5 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                aria-label="Send message"
                className="h-10 w-10 shrink-0 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-subtle-foreground">
              Messages are stored locally in your browser.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
