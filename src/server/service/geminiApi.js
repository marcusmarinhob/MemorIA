/**
 * @param {string} prompt
 * @param {string} [model="gemini-2.0-flash"]
 * @returns {Promise<string|null>}
 */

export async function generateContent(prompt, model = "gemini-2.0-flash") {
  const apiKey = process.env.GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text)
        ?.filter(Boolean)
        ?.join("\n") ?? null;

    return text;
  } catch (err) {
    console.error("Erro ao chamar Gemini:", err);
    throw err;
  }
}

export async function generateWithContext(pergunta, markdown) {
  const prompt = `Você é o MemorIA, um tutor virtual que cria cartas de memória educativas.

OBJETIVO:
A partir do conteúdo abaixo (Markdown), gere **8 pares de cartas** para um jogo da memória. 
Cada par deve conter:
1. question: uma pergunta clara sobre o conteúdo.
2. answer: a resposta correspondente.
3. justification: uma breve explicação ou curiosidade (1-2 frases) sobre a resposta.

REGRAS IMPORTANTES:
1. Use apenas o material fornecido no Markdown. Ignore qualquer conhecimento externo.
2. As perguntas devem abordar diferentes tópicos do conteúdo.
3. Seja didático, conciso e preciso.
4. Saída obrigatória em JSON, pronto para usar no Memory.jsx, no formato:

[
  {
    "id": 1,
    "question": "Pergunta 1?",
    "answer": "Resposta 1",
    "justification": "Explicação breve ou curiosidade."
  },
  ...
]

MATERIAL DE ESTUDO (Markdown):
--------------------------------
${markdown}
--------------------------------

---  
Agora, gere os 8 pares de perguntas e respostas seguindo estritamente estas instruções.`;

  const resposta = await generateContent(prompt);
  try {
    return JSON.parse(resposta);
  } catch (err) {
    console.error("Erro ao parsear resposta da Gemini:", resposta);
    return [];
  }
}
