import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
    return (
        <section>
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                {recipe ? (
                    <ReactMarkdown>{recipe}</ReactMarkdown>
                ) : (
                    <p>Loading recipe...</p>
                )}
            </article>
        </section>
    )
}