import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real environment, ensure VITE_GEMINI_API_KEY is set in .env.local
const apiKey = (import.meta.env as Record<string, any>).VITE_GEMINI_API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual executivo da startup "Babás do Futuro".
Use as informações abaixo para responder perguntas de investidores ou usuários.

CONTEXTO DO NEGÓCIO:
- Nome: Babás do Futuro
- Proposta: Conectar famílias a babás qualificadas com segurança e personalização.
- Monetização: Taxa por contratação (15%), Assinaturas Família (R$ 25/mês), Premium Babás (R$ 20/mês), Destaque de perfil.
- Público: Famílias modernas e Babás profissionais.
- Metas Financeiras: Lucro mensal de pelo menos 1 salário mínimo. Receita estimada inicial: R$ 1.900/mês.
- Custo por MAU: R$ 9,20.
- Infraestrutura: Cloud (R$ 400-800/mês).
- Marketing: R$ 1.500 (pessimista) a R$ 5.000 (otimista).
- Equipe: Dev Sênior (5k-12k), Suporte (1.5k-3k).

Seja profissional, entusiasta e use emojis ocasionais. Se perguntarem sobre encontrar uma babá, simule que você pode ajudar a filtrar perfis.
`;

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  if (!apiKey) {
    return "⚠️ A chave da API Gemini não foi configurada. Por favor, configure a variável de ambiente API_KEY para interagir com o assistente.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
          role: h.role,
          parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Desculpe, não consegui processar sua resposta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao conectar com a inteligência artificial. Tente novamente mais tarde.";
  }
};