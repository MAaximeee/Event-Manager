import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.svg';
import '../index.css';


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
    <div className="min-h-screen flex justify-center items-center bg-zinc-900">
      <div className="w-full max-w-md p-8 bg-zinc-800 rounded-lg shadow-2xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>

        <hr className="border-white mb-6" />

        <h2 className="text-2xl text-white font-bold text-center mb-6">Connectez-vous</h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white block mb-1"></label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChanges}
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-black block mb-1"></label>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChanges}
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded transition-colors" >
            Connexion</button>
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
