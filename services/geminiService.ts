
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTechnicalExpertise = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      systemInstruction: "You are a world-class ML Ops engineer specializing in bio-acoustics and real-time audio processing. Provide deep technical explanations about model deployment, endpoint configuration, audio chunking, and low-latency inference. Use professional yet accessible tone.",
    },
  });
  return response.text;
};

export const simulatePrediction = async (context: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Simulate a bird sound detection prediction based on this context: ${context}. Return the response in a structured JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          species: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          threatLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
          reasoning: { type: Type.STRING }
        },
        required: ["species", "confidence", "threatLevel", "reasoning"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
