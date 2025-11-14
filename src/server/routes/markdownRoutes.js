import express from "express";
import { cleanMarkdownInDatabase } from "../service/markdownCleaner.js";

const router = express.Router();

router.post("/clean/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cleanMarkdownInDatabase(id);
    res.json({ success: true, result });
  } catch (err) {
    console.error("Erro ao limpar markdown:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
