/**
 * @param {string} prompt
 * @param {string} [model="gemini-2.5-flash-lite"]
 * @returns {Promise<string|null>}
 */

export async function generateWithContext(pergunta, markdown) {
  const prompt = `Você é o MemorIA, um tutor virtual que cria cartas de memória educativas.

OBJETIVO:
A partir do conteúdo abaixo (Markdown), gere **8 pares de cartas** para um jogo da memória.
Cada par deve conter:
1. question: uma pergunta clara e objetiva.
2. answer: a resposta correspondente.
3. justification: uma breve explicação ou curiosidade (1-2 frases).

PRIORIDADE DE CONTEÚDO:
1. Priorize sempre o conteúdo do MATERIAL DE ESTUDO (Markdown).
2. Você pode complementar com conhecimento externo **apenas quando isso for essencial** para que o aluno compreenda o tópico.
3. Nunca invente detalhes específicos não presentes no material (datas exatas, nomes específicos, valores, fórmulas concretas). 
   Se precisar complementar, use apenas conceitos gerais e confiáveis.

ESTRUTURA PEDAGÓGICA:
Ao formular as cartas, siga a estrutura de aprendizado típica de cada matéria, usando o PDF como prioridade:
- HISTÓRIA: contexto anterior e posterior, período, acontecimentos, importância, personagens, causas e consequências.
- GEOGRAFIA: definição, características, causas, impactos, distribuição espacial, tendências, comparações.
- PORTUGUÊS: definição, função, características, exemplos, erros comuns, identificação.
- LITERATURA: contexto histórico, características do movimento, temas, estilo, obras e relevância.
- QUÍMICA: definições, partículas/processos, características, tendências periódicas, equações, condições, aplicações.
- BIOLOGIA: definição, função, localização, componentes, etapas, consequências, exemplos.
- MATEMÁTICA: fórmula, significado das variáveis, relações, proporcionalidade, interpretação, condições, erros comuns.
- FÍSICA: lei/fórmula, significado das variáveis, proporcionalidade, condições, interpretação, fenômeno, exemplo.

As perguntas devem explorar diferentes dimensões do conteúdo, sempre com clareza e intencionalidade pedagógica.

FORMATO DE SAÍDA (OBRIGATÓRIO):
Retorne **apenas** um JSON **válido**, conforme o modelo:

[
  {
    "id": 1,
    "question": "Pergunta 1?",
    "answer": "Resposta 1.",
    "justification": "Explicação breve ou curiosidade."
  },
  ...
]

MATERIAL DE ESTUDO (Markdown):
--------------------------------
${markdown}
--------------------------------

Agora, gere os 8 pares seguindo estritamente estas orientações.`;

  try {
    const res = await fetch("http://localhost:3001/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Erro na API: ${res.status}`);
    }

    const data = await res.json();
    return data.result || "";
  } catch (err) {
    console.error("Erro ao chamar backend:", err);
    return "";
  }
}
