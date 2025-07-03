import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./recipecard.css";

export function RecipeCard({ datas }) {
  const [isFav, setIsFav] = useState(false);
  const favKey = "favRecipes"; 


  useEffect(() => {
    const favItems = JSON.parse(localStorage.getItem(favKey)) || [];
    const isAlreadyFavorite = favItems.some(
      (item) => item.idMeal === datas.idMeal
    );
    setIsFav(isAlreadyFavorite);
  }, [datas]);


  const toggleFavorite = () => {
    const favItems = JSON.parse(localStorage.getItem(favKey)) || [];

    let updatedFavs;

    if (isFav) {
 
      updatedFavs = favItems.filter((item) => item.idMeal !== datas.idMeal);
      setIsFav(false);
    } else {

      updatedFavs = [...favItems, datas];
      setIsFav(true);
    }

    localStorage.setItem(favKey, JSON.stringify(updatedFavs));


    window.dispatchEvent(new Event("favUpdated"));
  };

  return (
    <div className="card shadow-md rounded overflow-hidden bg-white relative">

      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 text-xl text-red-500 z-10"
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>


      <img
        src={datas.strMealThumb}
        alt={datas.strMeal}
        className="w-full h-[300px] object-cover"
      />


      <div className="card-body p-4">
        <h3 className="text-lg font-bold mb-2 data_name">{datas.strMeal}</h3>
        <p className="text-sm mb-2 data_overview">
          {datas.strInstructions}
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
