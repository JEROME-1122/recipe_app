import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function RecipeDetail() {
  const [meal, setMeal] = useState(null);
  const { idMeal } = useParams();

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  console.log(url);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setMeal(jsonData.meals[0]);
        console.log(jsonData);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    }

    fetchMeal();
  }, [url]);

  useEffect(() => {
    if (meal?.strMeal) {
      document.title = meal.strMeal;
    }
  }, [meal]);

  if (!meal) return <div className="text-center mt-10">Loading...</div>;


  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 mb-30">
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>

      <div className="flex flex-col md:flex-row gap-5">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="md:w-[30%] h-[100%] w-full rounded shadow"
        />

        <div className="md:w-[70%]">
           <h2 className="text-xl font-semibold  mb-2">Instructions</h2>
          <p className="mb-4 text-gray-700 whitespace-pre-line">{meal.strInstructions}</p>

          <div className="mt-4 mb-4">
            <h3 className="text-lg font-semibold">Category: {meal.strCategory}</h3>
            <h3 className="text-lg font-semibold">Area: {meal.strArea}</h3>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-800">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-red-500 py-2 px-4 rounded mt-5 text-white hover:bg-red-600 transition">
                Watch on YouTube
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
