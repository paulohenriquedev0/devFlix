import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    // Remove o usuário salvo no navegador
    localStorage.removeItem("devflix:user");

    // Volta para a tela de login
    navigate("/");
  }

  return (
    <header className="header">
      <h1 onClick={() => navigate("/home")}>DEVFLIX</h1>

      <nav>
        <a href="#filmes">Filmes</a>
        <a href="#series">Séries</a>
        <a href="#documentarios">Documentários</a>
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
}

export default Header;