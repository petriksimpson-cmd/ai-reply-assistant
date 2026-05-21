"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  id: number;
  message: string;
  subject: string;
  reply: string;
  tone: string;
  language: string;
};

const templates = [
  {
    title: "Late Delivery",
    text: "My order arrived late and I am disappointed.",
  },
  {
    title: "Refund Request",
    text: "I would like a refund for my recent order.",
  },
  {
    title: "Damaged Product",
    text: "The product arrived damaged and unusable.",
  },
  {
    title: "Wrong Item",
    text: "I received the wrong item in my package.",
  },
  {
    title: "Angry Customer",
    text: "I am very unhappy with your service and support.",
  },
];

export default function Home() {
  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");
  const [subject, setSubject] = useState("");

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
    setSubject("");

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
        setSubject(data.subject);

        const newItem = {
          id: Date.now(),
          message,
          subject: data.subject,
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
    setSubject("");
  }

  function clearHistory() {
    localStorage.removeItem("reply-history");
    setHistory([]);
  }

  function copyEmail() {
    navigator.clipboard.writeText(
      `Subject: ${subject}\n\n${reply}`
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <header className="border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              ReplyFlow AI
            </h1>

            <p className="text-zinc-500 text-sm">
              AI Customer Support Assistant
            </p>
          </div>

          <div className="hidden md:flex gap-4">
            <a
              href="#generator"
              className="text-zinc-400 hover:text-white transition"
            >
              Generator
            </a>

            <a
              href="#features"
              className="text-zinc-400 hover:text-white transition"
            >
              Features
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-sm text-zinc-300">
                AI Powered Customer Support Workflow
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-none">
              Respond to
              <br />
              customers
              <br />
              instantly.
            </h1>

            <p className="text-zinc-400 text-xl leading-9 max-w-2xl mt-10">
              Generate professional support emails and customer replies with AI.
              Save hours every week and answer customers faster.
            </p>

            <div className="flex flex-wrap gap-4 mt-12">
              <a
                href="#generator"
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
              >
                Try The Generator
              </a>

              <button className="bg-zinc-900 border border-zinc-800 px-8 py-4 rounded-2xl hover:bg-zinc-800 transition">
                Live Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <p className="text-4xl font-bold">
                  10x
                </p>

                <p className="text-zinc-500 mt-2">
                  Faster Replies
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <p className="text-4xl font-bold">
                  AI
                </p>

                <p className="text-zinc-500 mt-2">
                  Smart Workflow
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <p className="text-4xl font-bold">
                  24/7
                </p>

                <p className="text-zinc-500 mt-2">
                  Customer Support
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <p className="text-4xl font-bold">
                  🌍
                </p>

                <p className="text-zinc-500 mt-2">
                  Multi-language
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-b border-zinc-900"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
              <div className="text-5xl mb-6">⚡</div>

              <h3 className="text-2xl font-semibold mb-4">
                Instant AI Replies
              </h3>

              <p className="text-zinc-400 leading-8">
                Generate professional customer support responses in seconds.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
              <div className="text-5xl mb-6">🎯</div>

              <h3 className="text-2xl font-semibold mb-4">
                Tone Control
              </h3>

              <p className="text-zinc-400 leading-8">
                Professional, friendly or apologetic replies instantly.
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
              <div className="text-5xl mb-6">📧</div>

              <h3 className="text-2xl font-semibold mb-4">
                Email Ready
              </h3>

              <p className="text-zinc-400 leading-8">
                Generate email subjects and complete support responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APP */}
      <section id="generator">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* LEFT */}
            <div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-semibold">
                      AI Reply Generator
                    </h2>

                    <p className="text-zinc-500 mt-2">
                      Generate AI customer support emails
                    </p>
                  </div>

                  <button
                    onClick={clearAll}
                    className="text-sm text-zinc-500 hover:text-white"
                  >
                    Clear
                  </button>
                </div>

                {/* TEMPLATES */}
                <div className="mb-6">
                  <p className="text-sm text-zinc-500 mb-3">
                    Smart Templates
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.title}
                        onClick={() => setMessage(template.text)}
                        className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition px-4 py-2 rounded-xl text-sm"
                      >
                        {template.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TEXTAREA */}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Paste customer message here..."
                  className="w-full h-60 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-lg outline-none focus:border-white resize-none"
                />

                {/* SETTINGS */}
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
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

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
                  >
                    <option value="English">English</option>
                    <option value="Czech">Czech</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Slovak">Slovak</option>
                  </select>
                </div>

                {/* BUTTON */}
                <button
                  onClick={generateReply}
                  disabled={loading}
                  className="w-full mt-5 bg-white text-black rounded-2xl p-5 font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading
                    ? "Generating AI Reply..."
                    : "Generate AI Reply"}
                </button>

                {/* OUTPUT */}
                {(reply || subject) && (
                  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          Generated Email
                        </h2>

                        <p className="text-zinc-500 text-sm mt-1">
                          AI generated support response
                        </p>
                      </div>

                      <button
                        onClick={copyEmail}
                        className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-xl text-sm"
                      >
                        Copy Email
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-zinc-500 text-sm mb-2">
                          Subject
                        </p>

                        <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                          {subject}
                        </div>
                      </div>

                      <div>
                        <p className="text-zinc-500 text-sm mb-2">
                          Reply
                        </p>

                        <div className="bg-black border border-zinc-800 rounded-2xl p-5 whitespace-pre-wrap leading-8">
                          {reply}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 h-fit sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    History
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    Previous generations
                  </p>
                </div>

                <button
                  onClick={clearHistory}
                  className="text-sm text-zinc-500 hover:text-white"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {history.length === 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <p className="text-zinc-500 text-sm">
                      No generations yet.
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
                      Subject
                    </p>

                    <p className="text-sm text-zinc-300 mb-4">
                      {item.subject}
                    </p>

                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                      Customer
                    </p>

                    <p className="text-sm text-zinc-300 line-clamp-3 mb-4">
                      {item.message}
                    </p>

                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                      Reply
                    </p>

                    <p className="text-sm text-zinc-300 line-clamp-5">
                      {item.reply}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="font-semibold text-lg">
              ReplyFlow AI
            </p>

            <p className="text-zinc-500 mt-2">
              AI Customer Support Workflow Platform
            </p>
          </div>

          <div className="text-zinc-500 text-sm">
            Built with Next.js + OpenAI
          </div>
        </div>
      </footer>
    </main>
  );
}