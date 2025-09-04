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
