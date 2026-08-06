import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'

// Load business knowledge data
let knowledgeData = {};
try {
  const knowledgePath = path.resolve(process.cwd(), 'src/data/knowledge.json');
  if (fs.existsSync(knowledgePath)) {
    knowledgeData = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
  }
} catch (e) {
  console.warn('Could not load knowledge.json:', e);
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

// Custom Vite plugin to handle /api/chat locally during development
function apiChatPlugin() {
  return {
    name: 'api-chat-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        }

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { message, history } = JSON.parse(body || '{}');
            if (!message) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Message required' }));
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
            const responseText = result.response.text();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ text: responseText }));
          } catch (err) {
            console.error('Vite /api/chat error:', err);
            
            // REST Fallback in Vite middleware using gemini-flash-latest
            try {
              const fetchRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                  contents: [{ role: 'user', parts: [{ text: message }] }]
                })
              });
              const data = await fetchRes.json();
              if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ text: data.candidates[0].content.parts[0].text }));
              }
            } catch (fallbackErr) {}

            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message || 'Gemini API Error' }));
          }
        });
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiChatPlugin()
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
