export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "verse",
        // ✅ 正しい設定：音声＋テキスト両方を扱う
        modalities: ["audio", "text"],
        input_audio_format: "pcm16",
        output_audio_format: "pcm16"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ OpenAI Realtime API error:", err);
    res.status(500).json({ error: err.message });
  }
}
