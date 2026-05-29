import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password
      });

      const user = response.data.user;

      localStorage.setItem("devflix:user", JSON.stringify(user));

      navigate("/home");
    } catch (error) {
      setError("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>DEVFLIX</h1>
        <h2>Entrar</h2>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="login-help">
          Use: user@devflix.com / 123456
          <br />
          Ou: admin@devflix.com / 123456
        </p>
      </form>
    </div>
  );
}

export default Login;