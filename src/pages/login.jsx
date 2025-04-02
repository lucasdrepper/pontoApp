import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons";
import "./style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false); // Estado para detectar hover
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao realizar login");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Erro de conexão com o servidor");
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Faça seu Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Senha</label>
        </div>
        <div className="forgot-container">
          <a href="http://" className="forgot-password">
            Esqueceu a Senha?
          </a>
        </div>
        <div className="form-footer">
          <button
            type="submit"
            className="login-button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <box-icon
              name="right-arrow-alt"
              size="28px"
              color={hover ? "#ffffff" : "#aeaeae"} // Alternando a cor dinamicamente
            ></box-icon>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
