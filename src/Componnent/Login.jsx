import React, { useState } from 'react';
import { verifierConnexion } from '../api';
import './Login.css';
import univ1 from '../univ1.png';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('enseignant');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await verifierConnexion(email, password, role.toLocaleUpperCase());
            if (response.data) {
                try {
                    onLogin(response.data);
                } catch {
                    setErrorMessage(response.message);
                }
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage('Une erreur est survenue.');
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            {/* Conteneur principal avec deux colonnes */}
            <div className="flex w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Colonne gauche - Image */}
                <div className="hidden lg:flex w-1/2  mx-auto my-auto">
                    <img
                        src={univ1}
                        alt="Université Toulouse Jean Jaurès"
                        className="px-1 max-h-96 max-w-full object-contain"
                    />
                </div>

                {/* Colonne droite - Formulaire */}
                <div className="w-full py-8 px-2 flex flex-col text-gray-900 justify-center">
                    <h2 className="text-2xl text-cyan-400 ">Bonjour !</h2>
                    <h2 className="text-xl font-bold text-gray-800 my-2">Se connecter</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                            type="email"
                            placeholder="Veuillez entrez votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="w-full p-3 mb-3 border border-gray-300 rounded-md"
                            type="password"
                            placeholder="Veuillez entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <select
                            className="w-full p-3 mb-3 border border-gray-300 rounded-md bg-white"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="enseignant">Enseignant</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            className="w-full bg-cyan-400 text-white p-3 rounded-md hover:bg-cyan-500"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex justify-between mt-4 text-sm text-gray-600">
                        <label>
                            <input type="checkbox" /> Rester connecté
                        </label>
                        <a className="text-cyan-400 hover:underline" href="/">
                            Forgot your password?
                        </a>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 mt-4">{errorMessage}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
