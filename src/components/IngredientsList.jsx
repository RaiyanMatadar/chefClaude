export default function IngredientsList({ ingredients, onRemove }) {
    if (ingredients.length === 0) {
        return (
            <div className="pantry-empty" aria-live="polite">
                <span className="empty-bowl" aria-hidden="true">+</span>
                <p>Your list is looking fresh.<br />Add your first ingredient above.</p>
            </div>
        );
    }

    return (
        <ul className="ingredients-list" aria-label="Ingredients on hand" aria-live="polite">
            {ingredients.map((ingredient) => (
                <li key={ingredient}>
                    <span className="ingredient-bullet" aria-hidden="true" />
                    <span>{ingredient}</span>
                    <button
                        type="button"
                        className="remove-ingredient"
                        aria-label={`Remove ${ingredient}`}
                        onClick={() => onRemove(ingredient)}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}