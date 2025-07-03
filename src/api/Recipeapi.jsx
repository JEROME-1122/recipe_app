import { useState, useEffect } from "react";

export function Recipeapi(searchPath) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPath}`;

    async function fetchData() {
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setData(jsonData.meals || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setData([]);
      }
    }

    fetchData();
  }, [searchPath]);

  return { data };
}
