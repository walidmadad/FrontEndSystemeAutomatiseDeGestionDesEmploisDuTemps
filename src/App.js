import React, { useState } from 'react';
import './Login.css'; // Importation du fichier CSS pour le style

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('prof'); // Par défaut, le rôle est défini sur "prof"

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role); // Affiche le rôle sélectionné
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Université Toulouse Jean Jaurès</h2>
                <h1>Bonjour !</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="nom.prenom@..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="mot de passe"
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
            </div>
        </div>
    );
};

export default Login;  
