import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './listar.css'; 

const ListaUsuario = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:2007/api/listar', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
            });
        }
    }, []);

    const deleteUser = (id) => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.delete(`http://localhost:2007/api/eliminar/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                console.log('Usuario eliminado correctamente');
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
            });
        }
    };

    return (
        <div className="lista-usuarios-container">
            <h1 className="lista-usuarios-title">Lista de Usuarios</h1>
            <ul className="lista-usuarios-list">
                {users.map(user => (
                    <li key={user._id} className="lista-usuarios-item">
                        <span className="lista-usuarios-name">{user.nombre}</span>
                        <button 
                            className="lista-usuarios-delete-button" 
                            onClick={() => deleteUser(user._id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <Link to="/" className="lista-usuarios-login-button">
                Ir al Login
            </Link>
        </div>
    );
};

export default ListaUsuario;
