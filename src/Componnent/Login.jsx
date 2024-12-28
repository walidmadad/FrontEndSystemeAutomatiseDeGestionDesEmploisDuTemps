import React, { useState } from 'react';
import { verifierConnexionAdmin, verifierConnexionProf, recuprerAdmin, recuprerProf } from '../api';
import './Login.css';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('prof'); // Par défaut, le rôle est défini sur "prof"
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        try {
            const response = role === "admin" ? await verifierConnexionAdmin(email, password) : await verifierConnexionProf(email, password);
            console.log('API Response:', response);
            if (response.data) {
                try{
                    const response = role === "admin" ? await recuprerAdmin(email) : await recuprerProf(email);
                    onLogin(response.data);
                }catch{
                    setErrorMessage(response.message);
                }
            } else {
                setErrorMessage(response.message); // Affiche le message d'erreur
            }
        } catch (error) {
            setErrorMessage('Une erreur est survenue.');
        }
        
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Université Toulouse Jean Jaurès</h2>
                <h1>Bonjour !</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Veuillez entrez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Veuillez entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="prof">Prof</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Login</button>
                </form>
                <div className="options">
                    <label>
                        <input type="checkbox" /> Rester connecté
                    </label>
                    <a href="/">Forgot your password?</a>
                </div>
                <div>
                    <label className='errorMessage'>{errorMessage}</label>
                </div>
            </div>
        </div>
    );
};

export default Login;  
