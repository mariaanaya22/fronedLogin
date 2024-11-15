import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './registrarse.css'; 

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mensajeTipo, setMensajeTipo] = useState('');

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje('');
    setMensajeTipo('');
    if (!nombre || !apellido || !contraseña) {
        setMensaje('Por favor, completa todos los campos.');
        setMensajeTipo('error');
        return;
      }

    try {
      const response = await axios.post('http://localhost:2007/api/registrar', {  // Endpoint de registro
        nombre,
        apellido,
        contraseña
      });

      setMensaje('Usuario registrado exitosamente');
      setMensajeTipo('exito');
    } catch (error) {
      console.error(error);
      setMensaje('Error al registrar usuario');
      setMensajeTipo('error'); 
    }
  };

  return (
    <div className="registro-container">
      <h2>Registrarse</h2>

      {/* Formulario de Registro */}
      <form onSubmit={registrarUsuario} className="login-form">
        <div className="input-group">
          <label className='label-resgistro'  htmlFor="nombre">Nombre</label>
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
          <label className='label-resgistro'  htmlFor="apellido">Apellido</label>
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
        <div className="input-group-resgistro">
          <label className='label-resgistro'  htmlFor="contraseña">Contraseña</label>
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
        <button type="submit" className="btn-submit">Registrar usuario</button>
      </form>
      <p className='label-resgistro' >
        ¿Ya tienes una cuenta? <Link  className='registro'  to="/">Inicia sesión aquí</Link>
      </p>

   
      {mensaje && (
        <p className={mensajeTipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}>
          {mensaje}
        </p>
      )} 
    </div>
  );
};

export default Registro;
