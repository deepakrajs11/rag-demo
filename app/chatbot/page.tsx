'use client'
import React, { useState, useRef, useEffect } from "react";
import { Send, FileText, Moon, Sun, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Theme {
  name: string;
  bg: string;
  card: string;
  input: string;
  button: string;
  userMsg: string;
  botMsg: string;
  text: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

type ThemeName = "midnight" | "ocean" | "light" | "forest";

const themes: Record<ThemeName, Theme> = {
  midnight: {
    name: "Midnight",
    bg: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    card: "bg-slate-800/50 backdrop-blur-xl border-purple-500/20",
    input:
      "bg-slate-700/50 border-purple-500/30 text-white placeholder-slate-400",
    button:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    userMsg: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
    botMsg: "bg-slate-700/50 text-slate-100 border border-purple-500/20",
    text: "text-slate-100",
    subtext: "text-slate-400",
    icon: Moon,
  },
  ocean: {
    name: "Ocean",
    bg: "bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900",
    card: "bg-slate-800/50 backdrop-blur-xl border-cyan-500/20",
    input:
      "bg-slate-700/50 border-cyan-500/30 text-white placeholder-slate-400",
    button:
      "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700",
    userMsg: "bg-gradient-to-r from-cyan-600 to-blue-600 text-white",
    botMsg: "bg-slate-700/50 text-slate-100 border border-cyan-500/20",
    text: "text-slate-100",
    subtext: "text-slate-400",
    icon: Sparkles,
  },
  light: {
    name: "Light",
    bg: "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50",
    card: "bg-white/80 backdrop-blur-xl border-gray-200 shadow-lg",
    input: "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
    button:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    userMsg: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    botMsg: "bg-white text-gray-900 border border-gray-200 shadow-sm",
    text: "text-gray-900",
    subtext: "text-gray-600",
    icon: Sun,
  },
  forest: {
    name: "Forest",
    bg: "bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900",
    card: "bg-slate-800/50 backdrop-blur-xl border-emerald-500/20",
    input:
      "bg-slate-700/50 border-emerald-500/30 text-white placeholder-slate-400",
    button:
      "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700",
    userMsg: "bg-gradient-to-r from-emerald-600 to-green-600 text-white",
    botMsg: "bg-slate-700/50 text-slate-100 border border-emerald-500/20",
    text: "text-slate-100",
    subtext: "text-slate-400",
    icon: Sparkles,
  },
};

export default function RAGChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("forest");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = themes[currentTheme];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const botMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setMessages((prev) => {
                  if (prev.length === 0) return prev;

                  return prev.map((msg, i) =>
                    i === prev.length - 1
                      ? { ...msg, content: msg.content + parsed.content }
                      : msg,
                  );
                });
              }


            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage) {
          lastMessage.content = "Error: Failed to get response.";
        }
        return newMessages;
      });
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const cycleTheme = () => {
    const themeKeys: ThemeName[] = ["midnight", "ocean", "light", "forest"];
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  const ThemeIcon = theme.icon;

  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-500`}>
      <div
        className={`w-full h-screen ${theme.card} flex flex-col transition-all duration-500`}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${theme.button}`}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme.text}`}>
                  RAG Assistant
                </h1>
                <p className={`text-sm ${theme.subtext}`}>
                  Ask questions about your documents
                </p>
              </div>
            </div>
            <button
              onClick={cycleTheme}
              className={`p-3 rounded-xl ${theme.button} text-white transition-all hover:scale-105`}
              title={`Switch to next theme (Current: ${theme.name})`}
            >
              <ThemeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div
                    className={`inline-flex p-6 rounded-2xl ${theme.card} border`}
                  >
                    <Sparkles className={`w-12 h-12 ${theme.subtext}`} />
                  </div>
                  <h2 className={`text-xl font-semibold ${theme.text}`}>
                    Start a conversation
                  </h2>
                  <p className={`${theme.subtext} max-w-md`}>
                    Ask questions about your uploaded documents and get
                    AI-powered answers.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.role === "user" ? theme.userMsg : theme.botMsg
                    } transition-all duration-300 animate-in slide-in-from-bottom-2`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {msg.content || (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Thinking...
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t border-white/10">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your documents..."
              className={`flex-1 px-4 py-3 rounded-xl border ${theme.input} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-all`}
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className={`px-6 py-3 rounded-xl ${theme.button} text-white font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
