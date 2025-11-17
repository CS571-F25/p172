import React, { useState, useEffect } from "react"
import { HashRouter, Route, Routes } from 'react-router';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import NoMatchPage from './pages/NoMatchPage';
import FavoritesPage from "./pages/FavoritesPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import RecipePage from "./pages/RecipePage";

function App() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(json => {
      setCategories(json.categories);
    })
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout categories={categories}/>}>
          <Route index element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          {
            categories.map(cat => {
              return <Route key={cat.idCategory} path={`categories/${cat.strCategory}`} element={<CategoryPage category={cat} />} />
            })
          }
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
