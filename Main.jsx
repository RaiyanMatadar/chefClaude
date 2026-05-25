import { useEffect, useRef, useState } from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"


export default function Main() {
    const [ingredients, setIngredients] = useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    )

    const [recipeShown, setRecipeShown] = useState(false)
    const ref = useRef(null)

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function toggleRecipeShown() {
        setRecipeShown((prevRecipeShown) => !prevRecipeShown)
    }

    useEffect(()=>{
        if (recipeShown && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" })
        }
    },[recipeShown])

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

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={ref}
                    ingredients={ingredients}
                    onToggleRecipeShownClick={toggleRecipeShown}
                />
            }

            {recipeShown && <ClaudeRecipe />}
        </main>
    )
}