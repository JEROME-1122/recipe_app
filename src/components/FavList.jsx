import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function FavList() {
  const [favorites, setFavorites] = useState([]);

  const favKey = "favRecipes";

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem(favKey)) || [];
    setFavorites(savedFavs);
  }, []);

  const handleDelete = (idToDelete) => {
    const updated = favorites.filter((item) =>
      item.idMeal ? item.idMeal !== idToDelete : item.idCategory !== idToDelete
    );
    setFavorites(updated);
    localStorage.setItem(favKey, JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto py-5 mt-10">
      <h2 className="text-2xl font-bold mb-4">Favorite Items</h2>

      {favorites.length === 0 ? (
        <p>No favorite items yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {favorites.map((item) => {
            const isMeal = !!item.idMeal;

            return (
              <div key={isMeal ? item.idMeal : item.idCategory} className="card bg-white shadow-md p-4 rounded">
                <img
                  src={isMeal ? item.strMealThumb : item.strCategoryThumb}
                  alt={isMeal ? item.strMeal : item.strCategory}
                  className="w-full h-48 object-cover rounded"
                />

                <h3 className="text-lg font-bold mt-2">
                  {isMeal ? item.strMeal : item.strCategory}
                </h3>

                <p className="text-sm mb-2">
                  {isMeal
                    ? item.strInstructions?.slice(0, 100)
                    : item.strCategoryDescription?.slice(0, 100)}
                  ...
                </p>

                {isMeal ? (
                  <Link to={`/recipedetails/${item.idMeal}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                      View
                    </button>
                  </Link>
                ) : (
                  <Link to={`/category/${item.idCategory}`} state={{ cat: item }}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">
                      Explore
                    </button>
                  </Link>
                )}

                <button
                  onClick={() => handleDelete(isMeal ? item.idMeal : item.idCategory)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
