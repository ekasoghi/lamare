
import { GoogleGenAI, Type } from "@google/genai";

// Strictly using process.env.API_KEY as per guidelines
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateCaption = async (productName: string, category: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Buatlah caption promosi yang elegan dan memikat untuk produk affiliate Shopee: "${productName}" dalam kategori ${category}. Gunakan gaya bahasa yang persuasif tapi tetap eksklusif. Berikan 3 pilihan caption dengan hashtag yang relevan.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, gagal menghasilkan caption. Silakan coba lagi nanti.";
  }
};

export const generateVideoScript = async (productName: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Buatlah naskah video pendek (60 detik) untuk promosi Shopee Affiliate produk: "${productName}". Sertakan:
      1. Hook (detik 0-5)
      2. Problem statement
      3. Product solution
      4. Call to action yang mendesak. 
      Gunakan gaya bahasa santai namun meyakinkan.`,
    });
    return response.text;
  } catch (error) {
    return "Gagal menghasilkan naskah video.";
  }
};

export const generateContentIdeas = async (niche: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berikan 5 ide konten kreatif yang sedang tren untuk niche "${niche}" di Shopee Affiliate. Jelaskan mengapa ide ini berpotensi viral.`,
    });
    return response.text;
  } catch (error) {
    return "Gagal menghasilkan ide konten.";
  }
};

export const getStrategyAdvice = async (stats: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analisis performa affiliate berikut dan berikan 3 saran strategi cerdas untuk meningkatkan konversi: ${stats}. Fokus pada niche Shopee Affiliate.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tidak dapat memuat saran strategi saat ini.";
  }
};
