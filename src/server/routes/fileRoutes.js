import express from "express";
import fetch from "node-fetch";
import FormData from "form-data";
import multer from "multer";
import { salvarArquivo } from "../service/supabaseService.js";
import { cleanMarkdownInDatabase } from "../service/markdownCleaner.js";

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
    const { data: result, error: insertError } = await salvarArquivo({
      assunto,
      turma: turmaValue || "",
      materia,
      detalhes: detalhes || "",
      markdown: doclingData.markdown,
      professor_uid,
    });

    if (insertError) {
      throw new Error(`Erro ao salvar no Supabase: ${insertError.message}`);
    }

    const arquivoSalvo = result?.[0];
    const id = arquivoSalvo?.id;
    if(!id) throw new Error("ID do arquivo não retornado após o salvamento.");

    try {
      await cleanMarkdownInDatabase(id);
      console.log(`Markdown limpo e atualizado no Supabase (ID: ${id})`);
    } catch (cleanErr) {
      console.warn(`Erro ao limpar markdown do arquivo ${id}:`, cleanErr.message);
    }

    res.json({ success: true, markdown: doclingData.markdown });
  } catch (error) {
    console.error("Erro ao processar upload:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

export default router;
