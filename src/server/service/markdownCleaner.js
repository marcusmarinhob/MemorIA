import { getArquivoMarkdown, updateCleanArquivo } from "./dbArquivoService.js";

function removeControlChars(text) {
  return text.replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u{10FFFF}]/gu, "");
}

function removeRepeatedFooters(text) {
  return text.replace(/^\s*Página\s*\d+(\s*\/\s*\d+)?\s*$/gim, "");
}

function joinBrokenLines(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trimEnd();
    if (line === "") {
      out.push("");
      continue;
    }
    const next = (lines[i + 1] ?? "").trim();
    const endsWithPunct = /[.!?;:]$/.test(line);
    const nextStartsUpper = /^[A-ZÀ-Ý0-9"“'`]/.test(next);

    if (!endsWithPunct && next && !nextStartsUpper) {
      lines[i + 1] = line + " " + next;
      continue;
    } else {
      out.push(line);
    }
  }
  return out.join("\n");
}

function extractTitle(text) {
  const match = text.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : "";
}

function extractAuthor(text) {
  const match = text.match(/(?:Autor|Author|By):?\s*(.+)/i);
  return match ? match[1].trim() : "";
}

function extractSections(text) {
  const sections = [];
  const regex = /^(#{1,6})\s*(.+)$/gm;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const level = match[1].length;
    const name = match[2].trim();
    sections.push({ name, level, start: match.index });
  }
  for (let i = 0; i < sections.length; i++) {
    sections[i].end =
      i < sections.length - 1 ? sections[i + 1].start - 1 : text.length;
  }
  return sections;
}

function inferPageRanges(text) {
  const regex = /Página\s*(\d+)/gi;
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push({ page: parseInt(m[1]), index: m.index });
  }
  return matches.map((m) => ({ page_range: `${m.page}`, index: m.index }));
}

export async function cleanMarkdownInDatabase(id) {
  let text = await getArquivoMarkdown(id);
  if (!text) throw new Error("Arquivo ${id} não contém markdown");

  console.log("🔹 Texto bruto (antes da limpeza):", text.slice(0, 200));
  text = text.normalize("NFKC");
  text = removeControlChars(text);
  text = removeRepeatedFooters(text);
  text = joinBrokenLines(text);
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  console.log("Texto limpo (depois da limpeza):", text.slice(0, 200));

  const metadata = {
    title: extractTitle(text),
    author: extractAuthor(text),
    sections: extractSections(text),
    page_ranges: inferPageRanges(text),
    raw_text_length: text.length,
  };
  console.log("Metadados extraídos:", metadata);
  await updateCleanArquivo(id, text, metadata);

  return {
    id,
    metadata,
    message: "Markdown limpo e metadados atualizados com sucesso.",
  };
}
