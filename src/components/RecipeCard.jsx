import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./recipecard.css";

export function RecipeCard({ datas }) {
  const [isFav, setIsFav] = useState(false);
  const favKey = "favRecipes"; // 🔑 localStorage key for favorites

  // 🟡 Check if this recipe is already in favorites when component loads
  useEffect(() => {
    const favItems = JSON.parse(localStorage.getItem(favKey)) || [];
    const isAlreadyFavorite = favItems.some(
      (item) => item.idMeal === datas.idMeal
    );
    setIsFav(isAlreadyFavorite);
  }, [datas]);

  // ❤️ Toggle favorite add/remove
  const toggleFavorite = () => {
    const favItems = JSON.parse(localStorage.getItem(favKey)) || [];

    let updatedFavs;

    if (isFav) {
      // 🔴 Remove from fav
      updatedFavs = favItems.filter((item) => item.idMeal !== datas.idMeal);
      setIsFav(false);
    } else {
      // 🟢 Add to fav
      updatedFavs = [...favItems, datas];
      setIsFav(true);
    }

    localStorage.setItem(favKey, JSON.stringify(updatedFavs));

    // 🔁 Trigger a custom event so NavBar count updates
    window.dispatchEvent(new Event("favUpdated"));
  };

  return (
    <div className="card shadow-md rounded overflow-hidden bg-white relative">
      {/* ❤️/🤍 Heart button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 text-xl text-red-500 z-10"
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Recipe Image */}
      <img
        src={datas.strMealThumb}
        alt={datas.strMeal}
        className="w-full h-[300px] object-cover"
      />

      {/* Recipe Info */}
      <div className="card-body p-4">
        <h3 className="text-lg font-bold mb-2">{datas.strMeal}</h3>
        <p className="text-sm mb-2">
          {datas.strInstructions?.slice(0, 100)}...
        </p>

        <Link to={`/recipedetails/${datas.idMeal}`}>
          <button className="border border-yellow-600 py-1 px-3 rounded text-yellow-600">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
}
