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
    origin: "http://localhost:5173",
  })
);

app.post("/api/chat", async (req, res) => {
  const { problema } = req.body;
  if (!problema)
    return res.status(400).json({ ok: false, error: "Envie o problema" });

  const prompt = `
Você é SabIA, um tutor de inteligência artificial para estudantes do ensino fundamental (6º ao 9º ano). 
Você **NUNCA deve fornecer a resposta final completa**. Seu objetivo é ajudar o aluno a raciocinar sozinho.  

Faça o seguinte:

- Explique o problema em palavras simples, usando exemplos do dia a dia ou analogias;
- Faça perguntas que levem o aluno a pensar e encontrar a solução sozinho;
- Dê dicas graduais, passo a passo, mas nunca resolva o problema;
- Use uma linguagem amigável e adequada para crianças e adolescentes de 11 a 15 anos;
- Responda sempre em português do Brasil.

Problema: ${problema}
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

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
