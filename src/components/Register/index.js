import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://185.139.1.231:3333/users', {
        name,
        email,
        password,
      });

      // Salva o token recebido após o cadastro
      localStorage.setItem('token', response.data.token);

      // Redireciona para o dashboard após o cadastro bem-sucedido
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h1>Cadastrar-se</h1>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Cadastrar</button>
        <div className="login-link">
          Já possui uma conta? <a href="/login">Entrar</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
