import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importa o useNavigate
import './styles.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Instancia o hook useNavigate para redirecionar

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://185.139.1.231:8080/sessions', {
        email,  
        password,
      });

      // Salva o token no localStorage
      localStorage.setItem('token', response.data.token);

      // Redireciona para o Dashboard
      navigate('/dashboard'); // Redireciona após login bem-sucedido

    } catch (error) {
      setError('Campo Inválido, tente de novo.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entre</button>
        <div className="signup-link">
          Não tem uma conta ainda? <Link to="/register">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
