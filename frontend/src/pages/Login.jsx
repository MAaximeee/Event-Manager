import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.svg'; // Ton logo

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification simple des champs
    if (!values.email || !values.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      console.error('Erreur connexion :', err);
      alert(err.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>

        <h2 className="text-2xl text-white font-bold text-center mb-6">Connexion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChanges}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-white block mb-1">Mot de passe</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChanges}
              className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded transition-colors"
          >
            Connexion
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          <span>Pas de compte ? </span>
          <Link to="/register" className="text-orange-500 hover:underline">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
