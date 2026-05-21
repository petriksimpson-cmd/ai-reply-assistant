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
You are an expert customer support assistant.

Your job:
- write clear customer replies
- keep the tone natural
- never sound robotic
- be helpful and concise
- do not invent order details
- ask for missing information if needed
- match the selected tone
- write in the selected language
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
${body.language || "English"}
          `,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
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