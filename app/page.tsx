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
];

const translations: any = {
  English: {
    hero: "Respond to customers instantly.",
    subtitle:
      "Generate professional customer support emails using AI.",
    generator: "AI Reply Generator",
    clear: "Clear",
    generate: "Generate AI Reply",
    generating: "Generating...",
    templates: "Smart Templates",
    tone: "Reply Tone",
    language: "Reply Language",
    subject: "Subject",
    reply: "Reply",
    history: "History",
    copy: "Copy Email",
    noHistory: "No generations yet.",
  },

  Czech: {
    hero: "Odpovídejte zákazníkům okamžitě.",
    subtitle:
      "Generujte profesionální zákaznické odpovědi pomocí AI.",
    generator: "AI Generátor Odpovědí",
    clear: "Vyčistit",
    generate: "Generovat Odpověď",
    generating: "Generuji...",
    templates: "Chytré Šablony",
    tone: "Tón Odpovědi",
    language: "Jazyk Odpovědi",
    subject: "Předmět",
    reply: "Odpověď",
    history: "Historie",
    copy: "Kopírovat Email",
    noHistory: "Zatím žádná historie.",
  },
};

export default function Home() {
  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");
  const [subject, setSubject] = useState("");

  const [loading, setLoading] = useState(false);

  const [tone, setTone] = useState("professional");

  const [language, setLanguage] = useState("English");

  const [uiLanguage, setUiLanguage] =
    useState("English");

  const [history, setHistory] = useState<HistoryItem[]>(
    []
  );

  const t = translations[uiLanguage];

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
            <h1 className="text-2xl font-bold">
              ReplyFlow AI
            </h1>

            <p className="text-zinc-500 text-sm">
              AI Customer Support
            </p>
          </div>

          <select
            value={uiLanguage}
            onChange={(e) =>
              setUiLanguage(e.target.value)
            }
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2"
          >
            <option value="English">
              🇺🇸 English
            </option>

            <option value="Czech">
              🇨🇿 Čeština
            </option>
          </select>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold leading-none">
              {t.hero}
            </h1>

            <p className="text-zinc-400 text-xl leading-8 max-w-2xl mt-10">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* APP */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* LEFT */}
            <div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-semibold">
                    {t.generator}
                  </h2>

                  <button
                    onClick={clearAll}
                    className="text-zinc-500 hover:text-white"
                  >
                    {t.clear}
                  </button>
                </div>

                {/* TEMPLATES */}
                <div className="mb-6">
                  <p className="text-sm text-zinc-500 mb-3">
                    {t.templates}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.title}
                        onClick={() =>
                          setMessage(template.text)
                        }
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
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Paste customer message here..."
                  className="w-full h-60 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-lg outline-none focus:border-white resize-none"
                />

                {/* SETTINGS */}
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  <div>
                    <p className="text-sm text-zinc-500 mb-2">
                      {t.tone}
                    </p>

                    <select
                      value={tone}
                      onChange={(e) =>
                        setTone(e.target.value)
                      }
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
                      {t.language}
                    </p>

                    <select
                      value={language}
                      onChange={(e) =>
                        setLanguage(e.target.value)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
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
                  className="w-full mt-5 bg-white text-black rounded-2xl p-5 font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading
                    ? t.generating
                    : t.generate}
                </button>

                {/* OUTPUT */}
                {(reply || subject) && (
                  <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={copyEmail}
                        className="bg-zinc-800 hover:bg-zinc-700 transition px-5 py-3 rounded-xl text-sm"
                      >
                        {t.copy}
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-zinc-500 text-sm mb-2">
                          {t.subject}
                        </p>

                        <div className="bg-black border border-zinc-800 rounded-2xl p-4">
                          {subject}
                        </div>
                      </div>

                      <div>
                        <p className="text-zinc-500 text-sm mb-2">
                          {t.reply}
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
                <h2 className="text-2xl font-semibold">
                  {t.history}
                </h2>

                <button
                  onClick={clearHistory}
                  className="text-sm text-zinc-500 hover:text-white"
                >
                  {t.clear}
                </button>
              </div>

              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {history.length === 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <p className="text-zinc-500 text-sm">
                      {t.noHistory}
                    </p>
                  </div>
                )}

                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
                  >
                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                      {t.subject}
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
        </div>
      </section>
    </main>
  );
}