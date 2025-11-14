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

    const response = await fetch("http://localhost:5001/analisar", {
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

//export default app;
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
