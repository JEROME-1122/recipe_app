//app.jsx

import { Route, Routes } from "react-router-dom";
import { FavList, NavBar } from "./components";
import {
  Beaf,
  Burger,
  CategoryDetail,
  Chicken,
  Home,
  Lamb,
  Pizza,
  RecipeDetail,
  SearchResults,
} from "./pages";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<Home apiPath="categories.php" title="Home" />}
        />
        <Route path="/beaf" element={<Beaf searchPath="Beef" title="Beaf" />} />
        <Route
          path="/chicken"
          element={<Chicken searchPath="Chicken" title="Chicken" />}
        />
        <Route path="/lamp" element={<Lamb searchPath="Lamb" title="Lamb" />} />
        <Route
          path="/pizza"
          element={<Pizza searchPath="Pizza" title="Pizza" />}
        />
        <Route
          path="/burger"
          element={<Burger searchPath="Burger" title="Burger" />}
        />
        <Route path="/favorites" element={<FavList title="Burger" />} />

        <Route path="/recipedetails/:idMeal" element={<RecipeDetail />} />

        <Route path="/category/:id" element={<CategoryDetail />} />

        <Route path="/search/:keyword" element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;
