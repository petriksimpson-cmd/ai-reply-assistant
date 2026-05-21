import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
You are an expert customer support assistant.

Create a professional customer support email response.

Rules:
- Return JSON only.
- Format: {"subject":"...","reply":"..."}
- Match the selected tone.
- Reply in the selected language.
- Do not invent order numbers, refunds, policies, names, or dates.
- If important information is missing, politely ask for it.
- Be clear, helpful, human, and concise.
`,
        },
        {
          role: "user",
          content: `
Customer message:
${body.message}

Tone:
${body.tone}

Language:
${body.language}
`,
        },
      ],
    });

    const content = completion.choices[0].message.content || "{}";
    const parsed = JSON.parse(content);

    return Response.json({
      subject: parsed.subject || "Customer support reply",
      reply: parsed.reply || "",
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message || "Unknown API error",
      },
      { status: 500 }
    );
  }
}