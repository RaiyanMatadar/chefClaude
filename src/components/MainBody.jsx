import { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromChefClaude } from "../../ai";

export default function MainBody() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient").trim();

    if (!newIngredient || ingredients.some((item) => item.toLowerCase() === newIngredient.toLowerCase())) {
      return;
    }

    setIngredients((previousIngredients) => [...previousIngredients, newIngredient]);
    setRecipe("");
    event.currentTarget.reset();
  }

  async function handleGetRecipe() {
    setIsLoading(true);
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
    setIsLoading(false);
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((previousIngredients) => previousIngredients.filter((ingredient) => ingredient !== ingredientToRemove));
    setRecipe("");
  }

  return (
    <main className="app-shell">
      <section className="page-intro">
        <p className="eyebrow">A LITTLE INSPIRATION FOR WHAT'S IN YOUR KITCHEN</p>
        <h1>Make something <span>good.</span></h1>
        <p className="intro-copy">Add what you have. We’ll find the delicious in-between.</p>
      </section>

      <div className="cooking-workspace">
        <section className="pantry-panel" aria-labelledby="pantry-title">
          <div className="panel-topline">
            <div>
              <p className="section-kicker">START WITH WHAT YOU HAVE</p>
              <h2 id="pantry-title">Your pantry</h2>
            </div>
            <span className="ingredient-count">{ingredients.length} <span>items</span></span>
          </div>

          <form onSubmit={addIngredient} className="add-ingredient-form">
            <label htmlFor="ingredient-input">Add an ingredient</label>
            <div className="ingredient-entry">
              <input
                id="ingredient-input"
                type="text"
                placeholder="Try tomatoes, rice, basil..."
                name="ingredient"
                autoComplete="off"
                maxLength={48}
              />
              <button type="submit"><span aria-hidden="true">+</span> Add</button>
            </div>
          </form>

          <IngredientsList ingredients={ingredients} onRemove={removeIngredient} />
          <p className="pantry-footnote"><span className="sparkle" aria-hidden="true">✳</span> A few simple ingredients can go a long way.</p>
        </section>

        <aside className="recipe-panel" aria-labelledby="recipe-title">
          <div className="recipe-panel-heading">
            <div>
              <p className="section-kicker">MADE FOR YOUR INGREDIENTS</p>
              <h2 id="recipe-title">The good part</h2>
            </div>
            <span className="chef-mark" aria-hidden="true">CC</span>
          </div>

          {recipe ? (
            <ClaudeRecipe recipe={recipe} />
          ) : isLoading ? (
            <ClaudeRecipe isLoading />
          ) : (
            <div className="recipe-empty-state">
              <div className="plate-illustration" aria-hidden="true">
                <span className="plate-leaf leaf-one" />
                <span className="plate-leaf leaf-two" />
                <span className="plate-tomato" />
                <span className="plate-herb" />
              </div>
              <h3>Your next favorite starts here.</h3>
              <p>Build your pantry list and Chef Claude will dream up something worth making.</p>
            </div>
          )}

          <div className="recipe-action">
            <div className="recipe-readiness">
              <span className={`readiness-dot${ingredients.length >= 4 ? " is-ready" : ""}`} />
              <span>{ingredients.length >= 4 ? "Ready to cook" : `${4 - ingredients.length} more to unlock`}</span>
            </div>
            <button
              className="generate-button"
              onClick={handleGetRecipe}
              disabled={ingredients.length < 4 || isLoading}
            >
              {isLoading ? "Finding your recipe..." : "Surprise me with a recipe"}
              {!isLoading && <span aria-hidden="true">↗</span>}
            </button>
          </div>
        </aside>
      </div>

      <footer className="page-footer">
        <span>GOOD FOOD, LESS GUESSWORK.</span>
        <span>Made with a little help from Chef Claude</span>
      </footer>
    </main>
  );
}