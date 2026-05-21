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

const translations: any = {
  English: {
    heroTitle: "AI customer support that works instantly.",

    heroSubtitle:
      "Generate professional support emails and customer replies with AI in seconds.",

    generator: "AI Reply Generator",

    templates: "Smart Templates",

    tone: "Reply Tone",

    language: "Reply Language",

    generate: "Generate AI Reply",

    generating: "Generating AI Reply...",

    subject: "Subject",

    reply: "Reply",

    copy: "Copy Email",

    history: "History",

    noHistory: "No generations yet.",

    stats1: "AI Replies",

    stats2: "Languages",

    stats3: "AI Status",

    live: "Live",
  },

  Czech: {
    heroTitle:
      "AI zákaznická podpora během několika sekund.",

    heroSubtitle:
      "Generujte profesionální zákaznické odpovědi pomocí AI.",

    generator: "AI Generátor Odpovědí",

    templates: "Chytré Šablony",

    tone: "Tón Odpovědi",

    language: "Jazyk Odpovědi",

    generate: "Generovat Odpověď",

    generating: "Generuji Odpověď...",

    subject: "Předmět",

    reply: "Odpověď",

    copy: "Kopírovat Email",

    history: "Historie",

    noHistory: "Zatím žádná historie.",

    stats1: "AI Odpovědi",

    stats2: "Jazyky",

    stats3: "AI Status",

    live: "Aktivní",
  },

  German: {
    heroTitle:
      "KI-Kundensupport in Sekunden.",

    heroSubtitle:
      "Erstellen Sie professionelle Kundenantworten mit KI.",

    generator: "KI Antwort Generator",

    templates: "Intelligente Vorlagen",

    tone: "Antwortstil",

    language: "Antwortsprache",

    generate: "KI Antwort Generieren",

    generating: "Antwort wird generiert...",

    subject: "Betreff",

    reply: "Antwort",

    copy: "E-Mail Kopieren",

    history: "Verlauf",

    noHistory: "Noch keine Historie.",

    stats1: "KI Antworten",

    stats2: "Sprachen",

    stats3: "KI Status",

    live: "Aktiv",
  },
};

export default function Home() {
  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");
  const [subject, setSubject] = useState("");

  const [loading, setLoading] = useState(false);

  const [tone, setTone] = useState("professional");

  const [language, setLanguage] =
    useState("English");

  const [uiLanguage, setUiLanguage] =
    useState("English");

  const [history, setHistory] = useState<
    HistoryItem[]
  >([]);

  const t = translations[uiLanguage];

  useEffect(() => {
    const saved = localStorage.getItem(
      "reply-history"
    );

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

      setReply(data.reply || "");
      setSubject(data.subject || "");

      const newItem = {
        id: Date.now(),
        message,
        subject: data.subject,
        reply: data.reply,
        tone,
        language,
      };

      const updatedHistory = [
        newItem,
        ...history,
      ];

      setHistory(updatedHistory);

      localStorage.setItem(
        "reply-history",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  function copyEmail() {
    navigator.clipboard.writeText(
      `Subject: ${subject}\n\n${reply}`
    );
  }

  function clearHistory() {
    localStorage.removeItem("reply-history");

    setHistory([]);
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 blur-[180px]" />
      </div>

      {/* NAVBAR */}
      <header className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-black/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              ReplyFlow AI
            </h1>

            <p className="text-zinc-400 text-sm">
              AI Support Workspace
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={uiLanguage}
              onChange={(e) =>
                setUiLanguage(e.target.value)
              }
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2"
            >
              <option value="English">
                🇺🇸 English
              </option>

              <option value="Czech">
                🇨🇿 Čeština
              </option>
            
              <option value="German">
                🇩🇪 Deutsch
           </option>

            <button className="hidden md:block bg-white text-black px-5 py-2 rounded-xl font-medium">
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-sm text-zinc-300">
              AI Powered Customer Support
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-none">
            {t.heroTitle}
          </h1>

          <p className="text-zinc-400 text-xl leading-9 max-w-2xl mt-10">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
              Start Generating
            </button>

            <button className="border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl hover:bg-white/10 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  {t.stats1}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {history.length}
                </h2>
              </div>

              <div className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  {t.stats2}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  4
                </h2>
              </div>

              <div className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl p-6">
                <p className="text-zinc-400 text-sm">
                  {t.stats3}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {t.live}
                </h2>
              </div>
            </div>

            {/* GENERATOR */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[32px] p-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold">
                  {t.generator}
                </h2>

                <p className="text-zinc-400 mt-2">
                  Generate support emails instantly
                </p>
              </div>

              {/* TEMPLATES */}
              <div className="mb-6">
                <p className="text-zinc-400 text-sm mb-3">
                  {t.templates}
                </p>

                <div className="flex flex-wrap gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.title}
                      onClick={() =>
                        setMessage(template.text)
                      }
                      className="border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-2 rounded-xl"
                    >
                      {template.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* TEXTAREA */}
              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Paste customer message here..."
                className="w-full h-60 bg-black/30 border border-white/10 rounded-3xl p-6 text-lg outline-none focus:border-white/30 resize-none"
              />

              {/* OPTIONS */}
              <div className="grid md:grid-cols-2 gap-4 mt-5">
                <div>
                  <p className="text-zinc-400 text-sm mb-2">
                    {t.tone}
                  </p>

                  <select
                    value={tone}
                    onChange={(e) =>
                      setTone(e.target.value)
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4"
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
                      Short
                    </option>
                  </select>
                </div>

                <div>
                  <p className="text-zinc-400 text-sm mb-2">
                    {t.language}
                  </p>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-2xl p-4"
                  >
                    <option value="English">
                      English
                    </option>

                    <option value="Czech">
                      Czech
                    </option>

                    <option value="German">
                      German
                    </option>

                    <option value="Spanish">
                      Spanish
                    </option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={generateReply}
                disabled={loading}
                className="w-full mt-5 bg-white text-black rounded-2xl p-5 font-semibold text-lg hover:scale-[1.01] transition disabled:opacity-50"
              >
                {loading
                  ? t.generating
                  : t.generate}
              </button>

              {/* OUTPUT */}
              {(subject || reply) && (
                <div className="mt-8 border border-white/10 bg-black/30 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Generated Email
                      </h2>

                      <p className="text-zinc-400 text-sm mt-1">
                        AI generated response
                      </p>
                    </div>

                    <button
                      onClick={copyEmail}
                      className="bg-white text-black px-5 py-3 rounded-xl font-medium"
                    >
                      {t.copy}
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-zinc-400 text-sm mb-2">
                        {t.subject}
                      </p>

                      <div className="border border-white/10 bg-black/30 rounded-2xl p-4">
                        {subject}
                      </div>
                    </div>

                    <div>
                      <p className="text-zinc-400 text-sm mb-2">
                        {t.reply}
                      </p>

                      <div className="border border-white/10 bg-black/30 rounded-2xl p-5 whitespace-pre-wrap leading-8">
                        {reply}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[32px] p-6 h-fit sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {t.history}
                </h2>

                <p className="text-zinc-400 mt-2">
                  Previous generations
                </p>
              </div>

              <button
                onClick={clearHistory}
                className="text-zinc-500 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
              {history.length === 0 && (
                <div className="border border-white/10 bg-black/20 rounded-2xl p-5">
                  <p className="text-zinc-500">
                    {t.noHistory}
                  </p>
                </div>
              )}

              {history.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 bg-black/20 rounded-2xl p-4"
                >
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-zinc-300">
                      {item.tone}
                    </span>

                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-zinc-300">
                      {item.language}
                    </span>
                  </div>

                  <p className="text-zinc-500 text-xs uppercase mb-2">
                    {t.subject}
                  </p>

                  <p className="font-medium mb-4">
                    {item.subject}
                  </p>

                  <p className="text-zinc-500 text-xs uppercase mb-2">
                    Customer
                  </p>

                  <p className="text-sm text-zinc-300 line-clamp-3 mb-4">
                    {item.message}
                  </p>

                  <p className="text-zinc-500 text-xs uppercase mb-2">
                    {t.reply}
                  </p>

                  <p className="text-sm text-zinc-300 line-clamp-5">
                    {item.reply}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}