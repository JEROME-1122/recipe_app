import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export function NavBar() {
  const [favCount, setFavCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
      setIsMenuOpen(false); // close menu on search in mobile
    }
  };

  useEffect(() => {
    const updateFavCount = () => {
      try {
        const favs = JSON.parse(localStorage.getItem("favRecipes")) || [];
        const uniqueKeys = new Set(
          favs.map((item) => item.idMeal || `cat-${item.idCategory}`)
        );
        setFavCount(uniqueKeys.size);
      } catch (err) {
        console.error("Failed to parse favorites:", err);
        setFavCount(0);
      }
    };

    updateFavCount();

    window.addEventListener("favUpdated", updateFavCount);
    window.addEventListener("storage", updateFavCount);

    return () => {
      window.removeEventListener("favUpdated", updateFavCount);
      window.removeEventListener("storage", updateFavCount);
    };
  }, []);

  return (
    <div className="fixed top-0 w-full z-999">
      <nav className="bg-[#000] text-white shadow  py-2">
        <div className="container mx-auto py-3 px-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            <NavLink to="/">LOGO</NavLink>
          </div>

          <div className="hidden  lg:flex gap-6 items-center">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/pizza">Pizza</NavLink>
            <NavLink to="/burger">Burger</NavLink>
            <NavLink to="/beaf">Beaf</NavLink>
            <NavLink to="/chicken">Chicken</NavLink>
            <NavLink to="/lamp">Lamb</NavLink>

            <NavLink to="/favorites" className="relative">
              Fav
              {favCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs px-1">
                  {favCount}
                </span>
              )}
            </NavLink>

            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search recipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 rounded text-black border border-[#fff] text-white"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-yellow-500 text-black rounded"
              >
                Search
              </button>
            </form>
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden block bg-[#111] px-4 py-3  space-y-3">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <p className="mb-2">Home</p>
            </NavLink>
            <NavLink to="/pizza" onClick={() => setIsMenuOpen(false)}>
              <p className="mb-2">Pizza</p>
            </NavLink>
            <NavLink to="/burger" onClick={() => setIsMenuOpen(false)}>
              <p className="mb-2">Burger</p>
            </NavLink>
            <NavLink to="/beaf" onClick={() => setIsMenuOpen(false)}>
              <p className="mb-2"> Beaf</p>
            </NavLink>
            <NavLink to="/chicken" onClick={() => setIsMenuOpen(false)}>
              <p className="mb-2">Chicken</p>
            </NavLink>
            <NavLink to="/lamp" onClick={() => setIsMenuOpen(false)}>
              <p className="mb-2">Lamb</p>
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="relative inline-block"
            >
              <p>Fav</p>
              {favCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full text-xs px-1">
                  {favCount}
                </span>
              )}
            </NavLink>
          </div>
        )}
      </nav>

      <div className="flex lg:hidden items-center justify-center py-5 mb-3 bg-white w-full">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-2 py-1 rounded text-black w-full border border-gray-400"
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 bg-yellow-500 text-black rounded "
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
