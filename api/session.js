import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.realtime.sessions.create({
      model: "gpt-4o-realtime-preview-2024-12-17",
      voice: "verse"
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
