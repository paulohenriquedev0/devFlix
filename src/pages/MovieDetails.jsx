import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import Header from "../components/Header";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <div>
        <Header />
        <div className="details-page">
          <h2>Filme não encontrado</h2>
          <button onClick={() => navigate("/home")}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <section
        className="details-page"
        style={{
          backgroundImage: `linear-gradient(to right, #111 40%, transparent), url(${movie.bannerImage})`
        }}
      >
        <div className="details-content">
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>

          <span>Categoria: {movie.category}</span>
          <span>Tipo: {movie.type}</span>

          <div className="details-buttons">
            <button>Assistir agora</button>
            <button onClick={() => navigate("/home")}>Voltar</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;