import { supabase } from "./supabaseService.js";

export async function getArquivoMarkdown(id) {
  const { data, error } = await supabase
    .from("arquivos")
    .select("id, markdown")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!data) throw new Error("Arquivo ${id} não encontrado");
  return data.markdown;
}

export async function updateCleanArquivo(id, cleanText, metadata) {
  const { error } = await supabase
    .from("arquivos")
    .update({
      markdown_limpo: cleanText,
      metadata: metadata,
      atualizado_em: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;
  return true;
}