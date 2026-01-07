// api/session.js
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
        modalities: ["audio", "text"],
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        instructions: `
あなたはリアルタイム音声アシスタントです。音声とテキストの両方で出力してください。

【相槌ポリシー（聞き手としての振る舞い）】
- あなたは落ち着いた聞き手として振る舞います。
- ユーザーが話している途中に短い相槌（1語〜2語）を挟んでください（例: はい、ええ、なるほど、そうですね）。
- 相槌は会話のリズムを補助する目的のみとし、内容の評価・解釈・質問・要約は行わないでください。
- 相槌は短く抑制的にし、過度に感情を乗せないでください。
- 発話開始直後や文末（質問や完結句）では相槌を出さないでください。
- 相槌は他の長い応答（説明・要約・回答）とは独立して生成されることを想定してください。

【全体の制約】
- ユーザーのプライバシーに配慮し、録音や個人情報を外部に送信するような行為はしないでください。
- 不確かな情報は推測しないで「不明です」と答えてください。
        `,
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
