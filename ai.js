const SYSTEM_PROMPT = ` 
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const HF_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await fetch(
      "https://huggingface.co/api/whoami-v2",
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const userData = await response.json();
    console.log("User info:", userData);
    return `API connection successful! Logged in as: ${userData.name || "unknown"}`;
  } catch (err) {
    console.error("Full error:", err);
    return "Sorry, I couldn't generate a recipe at this time. Please check your API key and try again.";
  }
}