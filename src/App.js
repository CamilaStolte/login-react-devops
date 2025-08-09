import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = () => {
    if (email === "eduardo.lino@pucpr.br" && senha === "123456") {
      setMensagem("Acessado com sucesso!");
      setIsSuccess(true);
    } else {
      setMensagem("Usuário ou senha incorretos!");
      setIsSuccess(false);
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h1>Login</h1>

        <div className="input-group">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
          />
        </div>

        <button onClick={handleLogin} className="login-button">
          Acessar
        </button>

        {mensagem && (
          <div className={`message ${!isSuccess ? "error" : ""}`}>
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
