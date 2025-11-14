import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const salvarArquivo = async ({
  assunto,
  turma,
  materia,
  detalhes,
  markdown,
  professor_uid,
}) => {
  if (!assunto || !turma || !materia || !professor_uid) {
    throw new Error(
      "Campos obrigatórios faltando: assunto, materia ou professor_uid"
    );
  }

  const { data, error } = await supabase
    .from("arquivos")
    .insert([{ assunto, turma, materia, detalhes, markdown, professor_uid }])
    .select();

  if (error) {
    console.error("Erro ao salvar no Supabase:", error);
    throw error;
  }

  console.log("Inserção bem-sucedida:", data);
  return { data, error: null };
};
