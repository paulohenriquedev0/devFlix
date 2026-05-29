import { useEffect, useState } from "react";
import { api } from "../services/api";

import Header from "../components/Header";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";

function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMovies() {
    try {
      const featuredResponse = await api.get("/movies/featured");
      const moviesResponse = await api.get("/movies");

      setFeaturedMovie(featuredResponse.data);
      setMovies(moviesResponse.data);
    } catch (error) {
      console.log("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-page">
          <h2>Carregando filmes...</h2>
        </div>
      </div>
    );
  }

  const categoryNames = movies.map((movie) => movie.category.name);
  const uniqueCategories = [...new Set(categoryNames)];

  return (
    <div>
      <Header />

      <FeaturedMovie movie={featuredMovie} />

      <main className="content">
        {uniqueCategories.map((categoryName) => {
          const filteredMovies = movies.filter(
            (movie) => movie.category.name === categoryName
          );

          return (
            <MovieRow
              key={categoryName}
              title={categoryName}
              movies={filteredMovies}
            />
          );
        })}
      </main>
    </div>
  );
}

export default Home;