import { useEffect, useRef, useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromChefClaude } from "../../ai";

export default function MainBody() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [recipeShown, setRecipeShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function handleGetRecipe() {
    setRecipeShown(true);
    setIsLoading(true);
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
    setIsLoading(false);
  }

  useEffect(() => {
    if (recipeShown && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeShown]);

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {/* Add at least 4 ingredients to get a recipe */}
      {ingredients.length >= 0 && ingredients.length < 4 && (
        <p className="ingredient-hint">
          Add at least 4 ingredients to get a recipe
        </p>
      )}

      {ingredients.length > 0 && (
        <IngredientsList
          ref={ref}
          ingredients={ingredients}
          onToggleRecipeShownClick={handleGetRecipe}
        />
      )}

      {recipeShown && <ClaudeRecipe recipe={isLoading ? "" : recipe} />}
    </main>
  );
}