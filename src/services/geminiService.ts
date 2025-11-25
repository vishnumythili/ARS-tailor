import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleSuggestion = async (
  eventType: string, 
  season: string, 
  preferences: string
): Promise<string> => {
  try {
    const prompt = `
      You are an expert Indian men's fashion consultant and tailor.
      Suggest a detailed outfit combination for an Indian male.
      
      Event: ${eventType}
      Season: ${season}
      Preferences: ${preferences}
      
      Provide the suggestion in this format:
      **Fabric**: [Fabric type and color]
      **Style**: [Cut, fit, collar style]
      **Details**: [Buttons, embroidery, cuffs]
      **Why**: [Short explanation]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate a suggestion.";
  } catch (error) {
    console.error("Error fetching style suggestion:", error);
    return "Sorry, the style assistant is temporarily unavailable. Please try again later.";
  }
};