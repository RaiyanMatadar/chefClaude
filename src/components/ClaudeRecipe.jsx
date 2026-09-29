import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
    return (
        <article className={`suggested-recipe-container${recipe ? " has-recipe" : " is-loading"}`} aria-live="polite">
            {recipe ? <ReactMarkdown>{recipe}</ReactMarkdown> : (
                <div className="loading-state">
                    <span className="loading-spinner" aria-hidden="true" />
                    <p>Finding the delicious in your ingredients...</p>
                </div>
            )}
        </article>
    )
}