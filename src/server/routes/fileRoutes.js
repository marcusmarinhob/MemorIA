import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
import multer from "multer";
import { salvarArquivo } from "../service/supabaseService.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { assunto, turma, materia, detalhes, professor_uid } = req.body;

    if (!req.file) {
      return res.status(400).json({ ok: false, error: "Arquivo não enviado." });
    }

    const turmaValue = (turma || "").trim();

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: "application/pdf",
    });

    const response = await fetch("http://localhost:5001/analisar", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro no Docling: ${errText}`);
    }

    const doclingData = await response.json();
    console.log("Valor de turma antes de salvar:", turmaValue);
    await salvarArquivo({
      assunto,
      turma: turmaValue || "",
      materia,
      detalhes: detalhes || "",
      markdown: doclingData.markdown,
      professor_uid,
    });

    res.json({ success: true, markdown: doclingData.markdown });
  } catch (error) {
    console.error("Erro ao processar upload:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

export default router;
