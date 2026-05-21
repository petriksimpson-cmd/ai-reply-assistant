"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  id: number;
  message: string;
  reply: string;
  tone: string;
  language: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("English");

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("reply-history");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  async function generateReply() {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          tone,
          language,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setReply("ERROR: " + data.error);
      } else {
        setReply(data.reply);

        const newItem = {
          id: Date.now(),
          message,
          reply: data.reply,
          tone,
          language,
        };

        const updatedHistory = [newItem, ...history];

        setHistory(updatedHistory);

        localStorage.setItem(
          "reply-history",
          JSON.stringify(updatedHistory)
        );
      }
    } catch (error) {
      setReply("Something went wrong.");
    }

    setLoading(false);
  }

  function clearAll() {
    setMessage("");
    setReply("");
  }

  function clearHistory() {
    localStorage.removeItem("reply-history");
    setHistory([]);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* LEFT */}
          <div>
            {/* HERO */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                <span className="text-sm text-zinc-300">
                  AI Powered Customer Support
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none mb-6">
                AI Reply
                <br />
                Assistant
              </h1>

              <p className="text-zinc-400 text-xl max-w-2xl leading-8">
                Generate professional customer support replies instantly using AI.
              </p>
            </div>

            {/* MAIN CARD */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Customer Message
                </h2>

                <button
                  onClick={clearAll}
                  className="text-sm text-zinc-500 hover:text-white transition"
                >
                  Clear
                </button>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    generateReply();
                  }
                }}
                placeholder="Paste customer message here..."
                className="w-full h-52 bg-zinc-900 border border-zinc-700 rounded-2xl p-5 text-lg outline-none focus:border-white resize-none"
              />

              {/* OPTIONS */}
              <div className="grid md:grid-cols-2 gap-4 mt-5">
                <div>
                  <p className="text-sm text-zinc-500 mb-2">
                    Reply Tone
                  </p>

                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
                  >
                    <option value="professional">
                      Professional
                    </option>

                    <option value="friendly">
                      Friendly
                    </option>

                    <option value="apologetic">
                      Apologetic
                    </option>

                    <option value="short">
                      Short Reply
                    </option>
                  </select>
                </div>

                <div>
                  <p className="text-sm text-zinc-500 mb-2">
                    Language
                  </p>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
                  >
                    <option value="English">English</option>
                    <option value="Czech">Czech</option>
                    <option value="Slovak">Slovak</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={generateReply}
                disabled={loading}
                className="w-full mt-5 bg-white text-black rounded-2xl p-5 font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Generating Reply..." : "Generate AI Reply"}
              </button>

              <p className="text-zinc-500 text-sm mt-4">
                Press CTRL + ENTER to generate faster
              </p>

              {/* REPLY */}
              {reply && (
                <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        AI Reply
                      </h2>

                      <p className="text-zinc-500 text-sm mt-1">
                        Generated with AI
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(reply)
                      }
                      className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-xl text-sm"
                    >
                      Copy Reply
                    </button>
                  </div>

                  <div className="border-t border-zinc-800 pt-5">
                    <p className="text-zinc-300 whitespace-pre-wrap leading-8 text-lg">
                      {reply}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  Reply History
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                  Saved locally
                </p>
              </div>

              <button
                onClick={clearHistory}
                className="text-sm text-zinc-500 hover:text-white transition"
              >
                Clear
              </button>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
              {history.length === 0 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <p className="text-zinc-500 text-sm">
                    No reply history yet.
                  </p>
                </div>
              )}

              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
                >
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-zinc-400">
                      {item.tone}
                    </span>

                    <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-zinc-400">
                      {item.language}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Customer
                  </p>

                  <p className="text-sm text-zinc-300 line-clamp-4 mb-5">
                    {item.message}
                  </p>

                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    AI Reply
                  </p>

                  <p className="text-sm text-zinc-300 line-clamp-6">
                    {item.reply}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}