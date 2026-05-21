import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are an expert AI customer support assistant.

Your task:
- generate professional support email replies
- create a short email subject
- match the selected tone
- reply in the selected language
- never hallucinate fake company data
- sound natural and human
- concise but helpful

Return JSON only in this exact format:

{
  "subject": "...",
  "reply": "..."
}
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

      response_format: {
        type: "json_object",
      },
    });

    const content =
      completion.choices[0].message.content || "{}";

    return Response.json(JSON.parse(content));
  } catch (error: any) {
    return Response.json(
      {
        error: error.message || "Unknown API error",
      },
      { status: 500 }
    );
  }
}