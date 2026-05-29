import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";

function MovieDetails() {
  // Pega o id da URL
  const { id } = useParams();

  const navigate = useNavigate();

  // Guarda o filme encontrado
  const [movie, setMovie] = useState(null);

  // Controla carregamento
  const [loading, setLoading] = useState(true);

  async function loadMovie() {
    try {
      // Busca o filme pelo id na API
      const response = await api.get(`/movies/${id}`);

      // Salva o filme no estado
      setMovie(response.data);
    } catch (error) {
      console.log("Erro ao buscar filme:", error);
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />

        <div className="details-page">
          <h2>Carregando filme...</h2>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <Header />

        <div className="details-page">
          <h2>Filme não encontrado</h2>

          <button onClick={() => navigate("/home")}>
            Voltar
          </button>
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

          <span>Categoria: {movie.category.name}</span>
          <span>Tipo: {movie.type}</span>

          <div className="details-buttons">
            <button onClick={() => window.open(movie.videoUrl, "_blank")}>
              Assistir agora
            </button>

            <button onClick={() => navigate("/home")}>
              Voltar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;