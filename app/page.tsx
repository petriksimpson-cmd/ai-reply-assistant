"use client";

import { useEffect, useMemo, useState } from "react";

type UiLanguage = "English" | "Czech" | "German" | "Spanish";
type Tone = "professional" | "friendly" | "apologetic" | "short";

type HistoryItem = {
  id: number;
  message: string;
  subject: string;
  reply: string;
  tone: Tone;
  language: string;
};

const translations: Record<UiLanguage, any> = {
  English: {
    appName: "ReplyFlow AI",
    badge: "AI customer support assistant",
    heroTitle: "Turn customer messages into professional replies.",
    heroSubtitle:
      "ReplyFlow AI helps freelancers, e-shops and small teams write clear support emails in seconds.",
    cta: "Try it free",
    secondaryCta: "Generate your first reply below",
    trusted: "Built for fast customer support workflows",

    useCasesTitle: "Who is it for?",
    useCases: [
      ["E-shops", "Handle refunds, shipping issues and complaints faster."],
      ["Freelancers", "Reply professionally without spending time rewriting emails."],
      ["Small teams", "Keep customer communication consistent and clear."],
    ],

    pricingTitle: "Simple pricing",
    pricingSubtitle: "Start free. Upgrade when you need more replies.",
    freePlan: "Free",
    freePrice: "€0",
    freeFeatures: ["10 test replies", "All languages", "Smart templates"],
    proPlan: "Pro",
    proPrice: "€9/mo",
    proFeatures: ["Unlimited replies", "History", "Priority improvements"],

    generator: "AI Reply Generator",
    generatorSubtitle: "Paste a customer message and generate a ready-to-send email.",
    templates: "Smart Templates",
    customerMessage: "Customer Message",
    placeholder: "Paste customer message here...",
    tone: "Reply Tone",
    language: "Reply Language",
    generate: "Generate AI Reply",
    generating: "Generating AI Reply...",
    subject: "Subject",
    reply: "Reply",
    generatedEmail: "Generated Email",
    generatedSubtitle: "Ready-to-send customer support response",
    copy: "Copy Email",
    copied: "Copied!",
    clear: "Clear",
    history: "History",
    historySubtitle: "Saved locally in this browser",
    clearHistory: "Clear History",
    noHistory: "No generations yet.",
    customer: "Customer",
    error: "Something went wrong.",
    tones: {
      professional: "Professional",
      friendly: "Friendly",
      apologetic: "Apologetic",
      short: "Short",
    },
    templateItems: [
      { title: "Late Delivery", text: "My order arrived late and I am disappointed." },
      { title: "Refund Request", text: "I would like a refund for my recent order." },
      { title: "Damaged Product", text: "The product arrived damaged and unusable." },
      { title: "Wrong Item", text: "I received the wrong item in my package." },
      { title: "Angry Customer", text: "I am very unhappy with your service and support." },
    ],
  },

  Czech: {
    appName: "ReplyFlow AI",
    badge: "AI asistent zákaznické podpory",
    heroTitle: "Proměňte zprávy zákazníků v profesionální odpovědi.",
    heroSubtitle:
      "ReplyFlow AI pomáhá freelancerům, e-shopům a malým týmům psát jasné zákaznické emaily během sekund.",
    cta: "Vyzkoušet zdarma",
    secondaryCta: "Vygenerujte první odpověď níže",
    trusted: "Vytvořeno pro rychlou zákaznickou komunikaci",

    useCasesTitle: "Pro koho to je?",
    useCases: [
      ["E-shopy", "Řešte reklamace, dopravu a stížnosti rychleji."],
      ["Freelanceři", "Odpovídejte profesionálně bez zdlouhavého přepisování."],
      ["Malé týmy", "Udržte komunikaci se zákazníky jasnou a konzistentní."],
    ],

    pricingTitle: "Jednoduché ceny",
    pricingSubtitle: "Začněte zdarma. Upgradujte, až budete potřebovat více odpovědí.",
    freePlan: "Free",
    freePrice: "€0",
    freeFeatures: ["10 testovacích odpovědí", "Všechny jazyky", "Chytré šablony"],
    proPlan: "Pro",
    proPrice: "€9/měs.",
    proFeatures: ["Neomezené odpovědi", "Historie", "Prioritní vylepšení"],

    generator: "AI generátor odpovědí",
    generatorSubtitle: "Vložte zprávu zákazníka a vytvořte hotový email.",
    templates: "Chytré šablony",
    customerMessage: "Zpráva zákazníka",
    placeholder: "Vložte zprávu zákazníka...",
    tone: "Tón odpovědi",
    language: "Jazyk odpovědi",
    generate: "Vygenerovat odpověď",
    generating: "Generuji odpověď...",
    subject: "Předmět",
    reply: "Odpověď",
    generatedEmail: "Vygenerovaný email",
    generatedSubtitle: "Hotová odpověď pro zákaznickou podporu",
    copy: "Kopírovat email",
    copied: "Zkopírováno!",
    clear: "Vyčistit",
    history: "Historie",
    historySubtitle: "Uloženo lokálně v tomto prohlížeči",
    clearHistory: "Vymazat historii",
    noHistory: "Zatím žádná historie.",
    customer: "Zákazník",
    error: "Něco se pokazilo.",
    tones: {
      professional: "Profesionální",
      friendly: "Přátelský",
      apologetic: "Omluvný",
      short: "Krátký",
    },
    templateItems: [
      { title: "Pozdní doručení", text: "Moje objednávka dorazila pozdě a jsem zklamaný." },
      { title: "Vrácení peněz", text: "Chtěl bych vrátit peníze za poslední objednávku." },
      { title: "Poškozený produkt", text: "Produkt dorazil poškozený a nepoužitelný." },
      { title: "Špatné zboží", text: "V balíčku jsem obdržel špatný produkt." },
      { title: "Naštvaný zákazník", text: "Jsem velmi nespokojený s vašimi službami a podporou." },
    ],
  },

  German: {
    appName: "ReplyFlow AI",
    badge: "KI-Assistent für Kundensupport",
    heroTitle: "Verwandeln Sie Kundennachrichten in professionelle Antworten.",
    heroSubtitle:
      "ReplyFlow AI hilft Freelancern, Online-Shops und kleinen Teams, klare Support-E-Mails in Sekunden zu schreiben.",
    cta: "Kostenlos testen",
    secondaryCta: "Erstellen Sie unten Ihre erste Antwort",
    trusted: "Gebaut für schnelle Support-Workflows",

    useCasesTitle: "Für wen ist es?",
    useCases: [
      ["Online-Shops", "Bearbeiten Sie Rückerstattungen, Versandprobleme und Beschwerden schneller."],
      ["Freelancer", "Antworten Sie professionell ohne lange Texte umzuschreiben."],
      ["Kleine Teams", "Halten Sie Kundenkommunikation klar und konsistent."],
    ],

    pricingTitle: "Einfache Preise",
    pricingSubtitle: "Starten Sie kostenlos. Upgraden Sie, wenn Sie mehr Antworten brauchen.",
    freePlan: "Free",
    freePrice: "€0",
    freeFeatures: ["10 Testantworten", "Alle Sprachen", "Intelligente Vorlagen"],
    proPlan: "Pro",
    proPrice: "€9/Monat",
    proFeatures: ["Unbegrenzte Antworten", "Verlauf", "Priorisierte Verbesserungen"],

    generator: "KI Antwort Generator",
    generatorSubtitle: "Fügen Sie eine Kundennachricht ein und erstellen Sie eine fertige E-Mail.",
    templates: "Intelligente Vorlagen",
    customerMessage: "Kundennachricht",
    placeholder: "Kundennachricht hier einfügen...",
    tone: "Antwortstil",
    language: "Antwortsprache",
    generate: "KI Antwort generieren",
    generating: "Antwort wird generiert...",
    subject: "Betreff",
    reply: "Antwort",
    generatedEmail: "Generierte E-Mail",
    generatedSubtitle: "Fertige Antwort für den Kundensupport",
    copy: "E-Mail kopieren",
    copied: "Kopiert!",
    clear: "Leeren",
    history: "Verlauf",
    historySubtitle: "Lokal in diesem Browser gespeichert",
    clearHistory: "Verlauf löschen",
    noHistory: "Noch keine Generierungen.",
    customer: "Kunde",
    error: "Etwas ist schiefgelaufen.",
    tones: {
      professional: "Professionell",
      friendly: "Freundlich",
      apologetic: "Entschuldigend",
      short: "Kurz",
    },
    templateItems: [
      { title: "Verspätete Lieferung", text: "Meine Bestellung ist verspätet angekommen und ich bin enttäuscht." },
      { title: "Rückerstattung", text: "Ich möchte eine Rückerstattung für meine letzte Bestellung." },
      { title: "Beschädigtes Produkt", text: "Das Produkt kam beschädigt und unbrauchbar an." },
      { title: "Falscher Artikel", text: "Ich habe den falschen Artikel in meinem Paket erhalten." },
      { title: "Verärgerter Kunde", text: "Ich bin sehr unzufrieden mit Ihrem Service und Support." },
    ],
  },

  Spanish: {
    appName: "ReplyFlow AI",
    badge: "Asistente de soporte con IA",
    heroTitle: "Convierte mensajes de clientes en respuestas profesionales.",
    heroSubtitle:
      "ReplyFlow AI ayuda a freelancers, e-commerce y equipos pequeños a escribir emails claros de soporte en segundos.",
    cta: "Probar gratis",
    secondaryCta: "Genera tu primera respuesta abajo",
    trusted: "Creado para flujos rápidos de soporte",

    useCasesTitle: "¿Para quién es?",
    useCases: [
      ["E-commerce", "Resuelve reembolsos, envíos y quejas más rápido."],
      ["Freelancers", "Responde de forma profesional sin reescribir emails."],
      ["Equipos pequeños", "Mantén una comunicación clara y consistente."],
    ],

    pricingTitle: "Precios simples",
    pricingSubtitle: "Empieza gratis. Mejora cuando necesites más respuestas.",
    freePlan: "Free",
    freePrice: "€0",
    freeFeatures: ["10 respuestas de prueba", "Todos los idiomas", "Plantillas inteligentes"],
    proPlan: "Pro",
    proPrice: "€9/mes",
    proFeatures: ["Respuestas ilimitadas", "Historial", "Mejoras prioritarias"],

    generator: "Generador de respuestas IA",
    generatorSubtitle: "Pega el mensaje del cliente y genera un email listo para enviar.",
    templates: "Plantillas inteligentes",
    customerMessage: "Mensaje del cliente",
    placeholder: "Pega aquí el mensaje del cliente...",
    tone: "Tono de respuesta",
    language: "Idioma de respuesta",
    generate: "Generar respuesta IA",
    generating: "Generando respuesta...",
    subject: "Asunto",
    reply: "Respuesta",
    generatedEmail: "Email generado",
    generatedSubtitle: "Respuesta lista para atención al cliente",
    copy: "Copiar email",
    copied: "Copiado!",
    clear: "Limpiar",
    history: "Historial",
    historySubtitle: "Guardado localmente en este navegador",
    clearHistory: "Borrar historial",
    noHistory: "Aún no hay generaciones.",
    customer: "Cliente",
    error: "Algo salió mal.",
    tones: {
      professional: "Profesional",
      friendly: "Amigable",
      apologetic: "Disculpa",
      short: "Corto",
    },
    templateItems: [
      { title: "Entrega tardía", text: "Mi pedido llegó tarde y estoy decepcionado." },
      { title: "Reembolso", text: "Me gustaría solicitar un reembolso por mi pedido reciente." },
      { title: "Producto dañado", text: "El producto llegó dañado e inutilizable." },
      { title: "Artículo incorrecto", text: "Recibí el artículo equivocado en mi paquete." },
      { title: "Cliente molesto", text: "Estoy muy descontento con su servicio y soporte." },
    ],
  },
};

const replyLanguages = ["English", "Czech", "German", "Spanish", "Slovak"];
const toneValues: Tone[] = ["professional", "friendly", "apologetic", "short"];

export default function Home() {
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>("English");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const t = translations[uiLanguage];

  const canGenerate = useMemo(
    () => message.trim().length > 0 && !loading,
    [message, loading]
  );

  useEffect(() => {
    const savedHistory = localStorage.getItem("reply-history");
    const savedUiLanguage = localStorage.getItem("ui-language") as UiLanguage | null;

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedUiLanguage && translations[savedUiLanguage]) setUiLanguage(savedUiLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("ui-language", uiLanguage);
  }, [uiLanguage]);

  async function generateReply() {
    if (!message.trim()) return;

    setLoading(true);
    setCopied(false);
    setReply("");
    setSubject("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, tone, language }),
      });

      const data = await response.json();

      if (data.error) {
        setReply("ERROR: " + data.error);
        return;
      }

      const newSubject = data.subject || "Customer support reply";
      const newReply = data.reply || "";

      setSubject(newSubject);
      setReply(newReply);

      const newItem: HistoryItem = {
        id: Date.now(),
        message,
        subject: newSubject,
        reply: newReply,
        tone,
        language,
      };

      const updatedHistory = [newItem, ...history].slice(0, 20);

      setHistory(updatedHistory);
      localStorage.setItem("reply-history", JSON.stringify(updatedHistory));
    } catch {
      setReply(t.error);
    } finally {
      setLoading(false);
    }
  }

  function copyEmail() {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${reply}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function clearAll() {
    setMessage("");
    setSubject("");
    setReply("");
    setCopied(false);
  }

  function clearHistory() {
    localStorage.removeItem("reply-history");
    setHistory([]);
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-[520px] w-[520px] rounded-full bg-blue-500/20 blur-[160px]" />
        <div className="absolute top-80 right-0 h-[560px] w-[560px] rounded-full bg-purple-500/20 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t.appName}</h1>
            <p className="text-sm text-zinc-400">{t.appSubtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={uiLanguage}
              onChange={(e) => setUiLanguage(e.target.value as UiLanguage)}
              className="rounded-xl border border-white/10 bg-zinc-950 px-4 py-2 text-sm outline-none"
            >
              <option value="English">🇺🇸 English</option>
              <option value="Czech">🇨🇿 Čeština</option>
              <option value="German">🇩🇪 Deutsch</option>
              <option value="Spanish">🇪🇸 Español</option>
            </select>

            <a
              href="#generator"
              className="hidden rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:scale-105 md:block"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24">
        <div className="max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="text-sm text-zinc-300">{t.badge}</span>
          </div>

          <h2 className="text-6xl font-bold leading-none tracking-tight md:text-8xl">
            {t.heroTitle}
          </h2>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-zinc-400">
            {t.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#generator"
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
            >
              {t.cta}
            </a>

            <a
              href="#pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-zinc-300 backdrop-blur-xl transition hover:bg-white/10"
            >
              {t.pricingTitle}
            </a>
          </div>

          <p className="mt-8 text-sm text-zinc-500">{t.trusted}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h3 className="mb-6 text-3xl font-bold">{t.useCasesTitle}</h3>

        <div className="grid gap-4 md:grid-cols-3">
          {t.useCases.map((item: string[]) => (
            <div
              key={item[0]}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
            >
              <h4 className="text-xl font-bold">{item[0]}</h4>
              <p className="mt-3 leading-7 text-zinc-400">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="generator" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold">{t.generator}</h3>
                <p className="mt-2 text-zinc-400">{t.generatorSubtitle}</p>
              </div>

              <button
                onClick={clearAll}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-400 transition hover:text-white"
              >
                {t.clear}
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm text-zinc-400">{t.templates}</p>
              <div className="flex flex-wrap gap-3">
                {t.templateItems.map((template: any) => (
                  <button
                    key={template.title}
                    onClick={() => setMessage(template.text)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
                  >
                    {template.title}
                  </button>
                ))}
              </div>
            </div>

            <p className="mb-2 text-sm text-zinc-400">{t.customerMessage}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholder}
              className="h-60 w-full resize-none rounded-3xl border border-white/10 bg-black/30 p-6 text-lg outline-none transition focus:border-white/30"
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm text-zinc-400">{t.tone}</p>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-4 outline-none"
                >
                  {toneValues.map((value) => (
                    <option key={value} value={value}>
                      {t.tones[value]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm text-zinc-400">{t.language}</p>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-zinc-950 p-4 outline-none"
                >
                  {replyLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={generateReply}
              disabled={!canGenerate}
              className="mt-5 w-full rounded-2xl bg-white p-5 text-lg font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t.generating : t.generate}
            </button>

            {(subject || reply) && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{t.generatedEmail}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {t.generatedSubtitle}
                    </p>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-105"
                  >
                    {copied ? t.copied : t.copy}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm text-zinc-400">{t.subject}</p>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      {subject}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-zinc-400">{t.reply}</p>
                    <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 leading-8">
                      {reply}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:sticky lg:top-28">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">{t.history}</h3>
                <p className="mt-2 text-sm text-zinc-400">{t.historySubtitle}</p>
              </div>

              <button
                onClick={clearHistory}
                className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-400 transition hover:text-white"
              >
                {t.clearHistory}
              </button>
            </div>

            <div className="max-h-[800px] space-y-4 overflow-y-auto pr-1">
              {history.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-zinc-500">{t.noHistory}</p>
                </div>
              )}

              {history.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                      {t.tones[item.tone]}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                      {item.language}
                    </span>
                  </div>

                  <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                    {t.subject}
                  </p>
                  <p className="mb-4 text-sm font-medium text-zinc-200">
                    {item.subject}
                  </p>

                  <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                    {t.customer}
                  </p>
                  <p className="mb-4 line-clamp-3 text-sm text-zinc-300">
                    {item.message}
                  </p>

                  <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
                    {t.reply}
                  </p>
                  <p className="line-clamp-5 text-sm text-zinc-300">
                    {item.reply}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8">
          <h3 className="text-4xl font-bold">{t.pricingTitle}</h3>
          <p className="mt-3 text-zinc-400">{t.pricingSubtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <h4 className="text-2xl font-bold">{t.freePlan}</h4>
            <p className="mt-4 text-5xl font-bold">{t.freePrice}</p>
            <ul className="mt-6 space-y-3 text-zinc-300">
              {t.freeFeatures.map((feature: string) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-white bg-white p-8 text-black">
            <h4 className="text-2xl font-bold">{t.proPlan}</h4>
            <p className="mt-4 text-5xl font-bold">{t.proPrice}</p>
            <ul className="mt-6 space-y-3 text-zinc-700">
              {t.proFeatures.map((feature: string) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}