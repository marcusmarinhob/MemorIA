import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.log("KEY:", process.env.GEMINI_API_KEY);
import { generateContent } from "./service/geminiApi.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    //origin: "http://localhost:5173",
  })
);

app.post("/api/chat", async (req, res) => {
  const { conversa } = req.body;

  if (!conversa || !Array.isArray(conversa) || conversa.length === 0)
    return res.status(400).json({ ok: false, error: "Envie a conversa" });

  const historicoLimitado = conversa.slice(-10);

  const prompt = `
Você é o SabIA, um tutor de inteligência artificial para estudantes do ensino fundamental (6º ao 9º ano). 
Você **NUNCA deve fornecer a resposta final completa**. Seu objetivo é ajudar o aluno a raciocinar sozinho.

Regras OBRIGATÓRIAS de formato e conteúdo:
Responda APENAS com passos.
Cada passo deve estar em uma linha separada.
Gere entre 3 e 6 passos (preferencialmente 4). Não gere mais nem menos.
O ÚLTIMO passo deve ser UMA PERGUNTA numerada para o aluno responder.
Não escreva saudações, explicações ou qualquer outro texto fora da enumeração.
Não use Markdown, negrito, itálico, listas com hífen, links ou blocos de código.
Cada passo deve ser curto, claro e orientar uma ação ou reflexão do aluno.
Use exemplos do dia a dia quando relevante.

Histórico da conversa (apenas para contexto, não repita o histórico nas respostas; responda apenas com os passos numerados):
${historicoLimitado
  .map(
    (m) =>
      `${m.isBot ? "SabIA:" : "Aluno:"} ${m.text || m.textLines?.join("\n")}`
  )
  .join("\n")}
`;

  try {
    const resposta = await generateContent(prompt);
    res.json({
      ok: true,
      resposta: resposta ?? "Desculpe, não consegui gerar a resposta.",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

export default app;
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
