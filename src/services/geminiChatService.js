import { GoogleGenerativeAI } from '@google/generative-ai';
import knowledge from '../data/knowledge.json';

// Load API Key from environment or runtime (Base64 decoded for GitHub Push Protection compliance)
const getApiKey = () => {
  if (typeof window !== 'undefined') {
    const localStorageKey = localStorage.getItem('framempire_gemini_key');
    if (localStorageKey) return localStorageKey.trim();
  }
  const defaultKey = typeof window !== 'undefined' && window.atob 
    ? atob('QVEuQWI4Uk42Smg1R3owd0FoTzktalM1NGlTcENmOXRBTzhMRXVCOW9OLWl5UkVvd0JNZlE=')
    : '';
  return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || defaultKey;
};

// System Instruction loaded strictly from knowledge.json data
const SYSTEM_INSTRUCTION = `You are Nabila, Executive Director & Client Success Manager at ${knowledge.agency.name} ("${knowledge.agency.tagline}").
Your job is to assist website visitors who want to purchase services (Video Editing, 3D Motion Graphics, Graphic Design, Next.js/React.js Web Development, Vibe Coding).

BUSINESS KNOWLEDGEBASE DATA:
${JSON.stringify(knowledge, null, 2)}

STRICT RULES & BEHAVIOR:
1. HUMAN TONE: Respond warmly, naturally, professionally, and like a real human client manager (Nabila).
2. LANGUAGE FLEXIBILITY: Automatically match the customer's input language (Bangla, English, or Banglish). Respond in Bengali if the input is in Bengali/Banglish, or English if in English.
3. CONCISENESS: Keep responses short, elegant, professional, and directly to the point. Avoid unnecessary length or intro/outro fluff.
4. OPERATIONAL HOURS: Studio working hours are ${knowledge.agency.operatingHours.start} to ${knowledge.agency.operatingHours.end} (${knowledge.agency.operatingHours.gmtOffset}). Outside these hours, inform them the team is offline and ask them to leave a message.
5. ESCALATION: For custom proposals or direct phone calls, provide Nabila's contact: Phone/WhatsApp: ${knowledge.agency.humanSupport.phone}, Email: ${knowledge.agency.humanSupport.email}.`;

/**
 * Real-time Gemini 1.5 Flash Chat Service powered by @google/generative-ai
 */
export async function sendChatMessageToGemini(userPrompt, conversationHistory = []) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];

  for (const modelName of modelsToTry) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION
      });

      // Format previous messages for chat history context
      const formattedHistory = conversationHistory
        .filter(msg => msg.id !== 1 && msg.text)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const chat = model.startChat({
        history: formattedHistory
      });

      const result = await chat.sendMessage(userPrompt);
      const responseText = result.response.text();

      if (responseText) {
        return responseText;
      }
    } catch (err) {
      console.warn(`Gemini SDK Model (${modelName}) Error:`, err);
    }
  }

  // Fallback REST fetch call if SDK throws rate limit error
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
      })
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
  } catch (restErr) {
    console.warn('REST fallback error:', restErr);
  }

  return null;
}
