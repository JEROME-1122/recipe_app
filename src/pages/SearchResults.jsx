
import { useParams } from "react-router-dom";
import { RecipeCard } from "../components";
import { Recipeapi } from "../api/Recipeapi";

export function SearchResults() {
  const { term } = useParams();
  const { data: recipe } = Recipeapi("", term);

  return (
    <div className="container mx-auto my-5 px-4 mb-30">
      <h2 className="text-2xl font-bold mb-4">Results for: "{term}"</h2>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
        {Array.isArray(recipe) && recipe.length > 0 ? (
          recipe.map((datas) => <RecipeCard key={datas.idMeal} datas={datas} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
}
