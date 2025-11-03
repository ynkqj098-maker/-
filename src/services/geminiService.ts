import { GoogleGenAI } from "@google/genai";
import { HealthLog } from "../types";

// Glitchの.envファイルで設定した環境変数を安全に読み込む
if (!process.env.API_KEY) {
  throw new Error("API_KEY is not defined. Please set it in your .env file on Glitch.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGeminiAdvice(log: HealthLog): Promise<string> {
  const prompt = `
あなたはフレンドリーで思いやりのある健康アシスタントです。
以下の健康観察記録に基づき、短く（50字以内）、ポジティブで優しいアドバイスや励ましの言葉を日本語で生成してください。

- 日付: ${log.date}
- 体温: ${log.temperature}°C
- 体調: ${log.condition}
- 気分: ${log.mood}
- 症状: ${log.symptoms || '特になし'}

アドバイス:
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get advice from Gemini API.");
  }
}