import { useEffect, useRef, useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

export default function MainBody() {
  const [ingredients, setIngredients] = useState([]);

  const [recipeShown, setRecipeShown] = useState(false);
  const ref = useRef(null);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  function toggleRecipeShown() {
    setRecipeShown((prevRecipeShown) => !prevRecipeShown);
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
          onToggleRecipeShownClick={toggleRecipeShown}
        />
      )}

      {recipeShown && <ClaudeRecipe />}
    </main>
  );
}
