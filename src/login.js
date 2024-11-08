
import React, { useState } from 'react';
import './LoginForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Correo: ${email}, Contraseña: ${password}`);
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo</label>
          <input 
            type="corre" 
            id="email" 
            name="email" 
            placeholder="Ingresa tu correo" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Ingresa tu contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn-submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;

