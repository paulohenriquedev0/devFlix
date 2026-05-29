import { useNavigate } from "react-router-dom";

function FeaturedMovie({ movie }) {
  const navigate = useNavigate();

  // Se ainda não tiver filme, não mostra nada
  if (!movie) {
    return null;
  }

  return (
    <section
      className="featured"
      style={{
        backgroundImage: `linear-gradient(to right, #111 30%, transparent), url(${movie.bannerImage})`
      }}
    >
      <div className="featured-content">
        <h2>{movie.title}</h2>

        <p>{movie.description}</p>

        <div className="featured-buttons">
          <button>Assistir</button>

          <button onClick={() => navigate(`/movie/${movie.id}`)}>
            Ver detalhes
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedMovie;