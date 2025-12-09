import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import fileRoutes from "./routes/fileRoutes.js";
import markdownRoutes from "./routes/markdownRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    //origin: "*",
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api/files", fileRoutes);
app.use("/api/markdown", markdownRoutes);

const upload = multer();

app.post("/api/files/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: "application/pdf",
    });

    const response = await fetch("http://localhost:5000/analisar", {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do Docling:", errorText);
      return res.status(500).json({ ok: false, error: errorText });
    }

    const data = await response.json();
    console.log("Recebido do Docling:", data);
    res.json({ ok: true, markdown: data.markdown });
  } catch (error) {
    console.error("Erro ao enviar para o Docling:", error);
    res.status(500).json({ error: "Erro ao processar o PDF" });
  }
});

app.post("/api/gemini", async (req, res) => {
  const { prompt, model = "gemini-2.5-flash-lite" } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data.error || "Erro no Gemini" });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text)
        ?.join("\n") ?? null;

    res.json({ ok: true, result: text });
  } catch (err) {
    console.error("Erro ao chamar Gemini:", err);
    res.status(500).json({ error: "Erro interno ao chamar Gemini" });
  }
});


//export default app;
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
