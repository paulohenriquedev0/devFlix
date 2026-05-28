import { movies } from "../data/movies";
import Header from "../components/Header";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieRow from "../components/MovieRow";

function Home() {
  const featuredMovie = movies.find((movie) => movie.featured === true);

  const categories = ["Ficção Científica", "Aventura", "Suspense", "Comédia", "Tecnologia", "Natureza"];
  return (
    <div>
      <Header />

      <FeaturedMovie movie={featuredMovie} />

      <main className="content">
        {categories.map((category) => {
          const filteredMovies = movies.filter(
            (movie) => movie.category === category
          );

          return (
            <MovieRow
              key={category}
              title={category}
              movies={filteredMovies}
            />
          );
        })}
      </main>
    </div>
  );
}

export default Home;