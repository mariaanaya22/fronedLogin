import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');


  const enviarLogin = async (e) => {
    e.preventDefault();
    setMensaje(''); 
    try {
   
      const response = await axios.post('http://localhost:2007/api/login', {
        nombre,
        apellido,
        contraseña
      });

      localStorage.setItem('token', response.data.token);

 
      setMensaje('Login exitoso');

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
        nombre,
        apellido,
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
          <label htmlFor="nombre">Nombre</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            placeholder="Ingresa tu nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label htmlFor="apellido">Apellido</label>
          <input 
            type="text" 
            id="apellido" 
            name="apellido" 
            placeholder="Ingresa tu apellido" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
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
