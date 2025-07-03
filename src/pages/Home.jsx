import { useEffect } from "react";
import { Recipeapi } from "../api/Recipeapi";
import { RecipeCard } from "../components";
export function Home({title,searchPath}) {
  const { data: recipe } = Recipeapi( searchPath);
 
   useEffect(() => {
     document.title = title;
   }, [title]);
 
   return (
     <div className="container mx-auto my-5 px-4 mb-30">
       <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
         {Array.isArray(recipe) && recipe.length > 0 ? (
           recipe.map((datas) => (
             <RecipeCard key={datas.idCategory} datas={datas} />
           ))
         ) : (
           <p className="col-span-full text-center text-gray-600">
             Loading recipes or no recipes found...
           </p>
         )}
       </div>
     </div>
   );
 }

