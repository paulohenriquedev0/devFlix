import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img src={movie.coverImage} alt={movie.title} />

      <h3>{movie.title}</h3>

      <span>{movie.type}</span>
    </div>
  );
}

export default MovieCard;