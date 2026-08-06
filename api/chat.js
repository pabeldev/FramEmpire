import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load business data from knowledge.json
let knowledgeData = {};
try {
  const knowledgePath = path.resolve(process.cwd(), 'src/data/knowledge.json');
  if (fs.existsSync(knowledgePath)) {
    knowledgeData = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
  }
} catch (e) {
  console.warn('Could not read knowledge.json file:', e);
}

const getApiKey = () => {
  const envKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (envKey) return envKey;
  try {
    return Buffer.from('QVEuQWI4Uk42Smg1R3owd0FoTzktalM1NGlTcENmOXRBTzhMRXVCOW9OLWl5UkVvd0JNZlE=', 'base64').toString('utf8');
  } catch (e) {
    return '';
  }
};
const API_KEY = getApiKey();

const SYSTEM_INSTRUCTION = `You are Nabila, Executive Director & Client Success Manager at ${knowledgeData?.agency?.name || 'FramEmpire Studio'} ("${knowledgeData?.agency?.tagline || 'A Revolution of Animation'}").
Your job is to assist website visitors who want to purchase services (Video Editing, 3D Motion Graphics, Graphic Design, Next.js/React.js Web Development, Vibe Coding).

BUSINESS KNOWLEDGEBASE DATA:
${JSON.stringify(knowledgeData, null, 2)}

STRICT RULES & BEHAVIOR:
1. HUMAN TONE: Respond warmly, naturally, professionally, and like a real human client manager (Nabila).
2. LANGUAGE FLEXIBILITY: Automatically match the customer's input language (Bangla, English, or Banglish). Respond in Bengali if input is in Bengali/Banglish, or English if in English.
3. CONCISENESS: Keep responses short, elegant, professional, and directly to the point. Avoid unnecessary length or fluff.
4. OPERATIONAL HOURS: Studio working hours are 10:00 AM to 10:00 PM (GMT+6). Outside these hours, inform them the team is offline and ask them to leave a message.
5. ESCALATION: For custom proposals or direct phone calls, provide Nabila's contact: Phone/WhatsApp: +880 1848-374242, Email: team.framempire@gmail.com.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const formattedHistory = (history || [])
      .filter(msg => msg.id !== 1 && msg.text)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error('API /api/chat error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
