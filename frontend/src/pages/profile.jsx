import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.svg';

axios.defaults.baseURL = 'http://localhost:3000';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.log('No token found, redirection login');
        navigate('/login');
        return;
      }
      setLoading(true);
      try {
        console.log('Fetching user with token:', token.substring(0, 20) + '...');
        const res = await axios.get('/auth/home', { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        console.log('User data recuperer:', res.data);
        const user = res.data.user;
        setUserData({ username: user.username || '', email: user.email || '' });
      } catch (err) {
        console.error('Fetch user error:', err);
        console.error('Error response:', err.response?.data);
        const errorMsg = err.response?.data?.message || 'Impossible de récupérer votre profil';
        setError(errorMsg);
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.log('Unauthorized, clearing token and redirecting');
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 1000);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setPasswordErrors('');
    setError('');
  };

  const validatePasswords = () => {
    if (form.password && form.password.length < 6) {
      setPasswordErrors('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    if (form.password && form.password !== form.confirmPassword) {
      setPasswordErrors('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePasswords()) {
      return;
    }

    const payload = {
      username: form.username.trim() || userData.username,
      email: form.email.trim() || userData.email,
    };

    if (form.password) {
      payload.password = form.password;
    }

    setSubmitting(true);
    try {
      const res = await axios.put('/auth/profile', payload, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setSuccess('Profil mis à jour avec succès');
      
      if (res.data?.user) {
        setUserData({ 
          username: res.data.user.username || '', 
          email: res.data.user.email || '' 
        });
        setForm({ username: '', email: '', password: '', confirmPassword: '' });
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm({ username: '', email: '', password: '', confirmPassword: '' });
    setIsEditing(false);
    setError('');
    setPasswordErrors('');
    setShowPasswordSection(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900">
        <div className="text-white text-lg">Chargement du profil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 py-12 px-4 sm:px-6 lg:px-8 pt-22 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <img src={logo} alt="Logo" className="h-16 w-auto mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-2">Mon Profil</h1>
          <p className="text-zinc-400">Gérez vos informations personnelles</p>
        </div>

        {/* logmessage */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}
        <div className="bg-zinc-800 rounded-lg shadow-xl overflow-hidden">
          {/* info */}
          {!isEditing && (
            <div className="p-8 border-b border-zinc-700">
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-400 text-sm font-medium mb-2">Nom d'utilisateur</p>
                  <p className="text-white text-lg font-semibold">{userData.username}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-medium mb-2">Adresse Email</p>
                  <p className="text-white text-lg font-semibold">{userData.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Modifier mon profil
              </button>
            </div>
          )}

          {/* form */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Modifier vos informations</h2>

              <div className="space-y-6">
                {/* username */}
                <div>
                  <label htmlFor="username" className="block text-white font-medium mb-2">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    placeholder={userData.username}
                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                  <p className="text-zinc-400 text-sm mt-1">Laissez vide pour conserver: {userData.username}</p>
                </div>

                {/* mail */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder={userData.email}
                    className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                  <p className="text-zinc-400 text-sm mt-1">Laissez vide pour conserver: {userData.email}</p>
                </div>

                <div className="border-t border-zinc-700 my-4"></div>

                {/* mdp */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    className="w-full flex items-center justify-between text-white font-semibold mb-4 py-2 px-3 bg-zinc-700/50 hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <span>Changer le mot de passe</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${showPasswordSection ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showPasswordSection && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <label htmlFor="password" className="block text-white font-medium mb-2">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={form.password}
                          onChange={handleInputChange}
                          placeholder="Laisser vide pour ne pas changer"
                          className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                          Confirmer le mot de passe
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={form.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirmer le nouveau mot de passe"
                          className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                        />
                      </div>

                      {passwordErrors && (
                        <p className="text-red-400 text-sm mt-2">{passwordErrors}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* actions */}
              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {submitting ? 'Mise à jour...' : 'Enregistrer les modifications'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>

        {/* retour home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-orange-500 hover:text-orange-400 font-medium transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
