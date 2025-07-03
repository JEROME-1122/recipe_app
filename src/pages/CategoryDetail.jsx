import { useLocation, } from "react-router-dom";

export function CategoryDetail() {
  const { state } = useLocation();


  const category = state?.cat;

  if (!category) {
    return (
      <p className="text-center mt-10 text-red-500">No category data found.</p>
    );
  }

  return (
    <div className=" container mx-auto my-45 px-4  lg:my-30">
      <h1 className="text-3xl font-bold mb-4">{category.strCategory}</h1>

      <div className="flex flex-col md:flex-row gap-5">
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className="md:w-[30%] h-[100%] w-full rounded shadow"
        />
      </div>

      <div className="md:w-[70%]">
        <h1 className="text-2xl font-bold mt-4">{category.strCategory}</h1>

        <h2 className="text-xl font-semibold  mb-2">Instructions</h2>
        <p className="mt-2 text-gray-700">{category.strCategoryDescription}</p>
       
      </div>
    </div>
  );
}
