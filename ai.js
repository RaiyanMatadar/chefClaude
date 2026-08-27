const SYSTEM_PROMPT = ` 
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    if (!OPENROUTER_API_KEY) {
      throw new Error("Missing VITE_OPENROUTER_API_KEY in .env");
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-OpenRouter-Title": "Chef Claude",
      },
      method: "POST",
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error("OpenRouter API error:", err);
    return "Sorry, I couldn't generate a recipe at this time. Please check your OpenRouter API key and try again.";
  }
}
