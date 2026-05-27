import MovieCard from "./MovieCard";

function MovieRow({ title, movies }) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-row">
      <h2>{title}</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;