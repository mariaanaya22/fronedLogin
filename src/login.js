import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';


import './App.css';

const Login = () => {
  const [correo, setcorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate(); // Inicializa navigate

  const enviarLogin = async (e) => {
    e.preventDefault();
    setMensaje(''); 
    try {
      const response = await axios.post('http://localhost:2007/api/login', {
        correo,
        contraseña
      });

      // Guarda el token 
      localStorage.setItem('token', response.data.token);

      setMensaje('Login exitoso');
      navigate('/listaUsuario'); //después de login exitoso

    } catch (error) {
      console.error(error);
      setMensaje('Error: Credenciales incorrectas o problema en el servidor');
    }
  };


  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:2007/api/login', {
      
        correo,
        contraseña
      });

      setMensaje('Usuario registrado exitosamente');
    } catch (error) {
      console.error(error);
      setMensaje('Error al registrar usuario');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión o Registrarse</h2>

      <form onSubmit={enviarLogin} className="login-form">
      
        <div className="input-group">
          <label htmlFor="Correo">Correo</label>
          <input 
            type="text" 
            id="correo" 
            name="correo" 
            placeholder="Ingresa tu Correo" 
            value={correo} 
            onChange={(e) => setcorreo(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input 
            type="password" 
            id="contraseña" 
            name="contraseña" 
            placeholder="Ingresa tu contraseña" 
            value={contraseña} 
            onChange={(e) => setContraseña(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-submit">Iniciar sesión</button>
      </form>


      <p>
        ¿No tienes una cuenta? <Link className='registro'  to="/registro">Regístrate aquí</Link>
      </p>


      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Login;
