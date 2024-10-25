import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [role, setRole] = useState(''); // Stocke le rôle sélectionné (admin ou enseignant)
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');

    // Fonction pour sélectionner le rôle et afficher le formulaire
    const handleRoleSelection = (selectedRole) => {
        setRole(selectedRole);
        setMessage(''); // Réinitialiser le message d'erreur au changement de rôle
    };

    // Fonction pour gérer la connexion
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // Définir l'URL en fonction du rôle
            const loginUrl = role === 'admin'
                ? 'http://localhost:9191/api/v1/admins/verify' // URL de connexion pour admin
                : 'http://localhost:9191/api/v1/enseignants/verify'; // URL de connexion pour enseignant

            const response = await axios.post(loginUrl, null, {
                params: { email, motDePasse }
            });

            if (response.status === 200) {
                setMessage("Connexion réussie !");
                // Rediriger vers le tableau de bord ou autre
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage("Identifiants invalides");
            } else {
                setMessage("Erreur lors de la connexion");
            }
        }
    };

    return (
        <div>
            <h2>Connexion</h2>

            {/* Afficher les boutons de rôle si aucun n'est sélectionné */}
            {!role ? (
                <div>
                    <p>Choisissez votre type de connexion :</p>
                    <button onClick={() => handleRoleSelection('admin')}>Connecter en tant qu'Admin</button>
                    <button onClick={() => handleRoleSelection('enseignant')}>Connecter en tant qu'Enseignant</button>
                </div>
            ) : (
                // Afficher le formulaire de connexion en fonction du rôle sélectionné
                <div>
                    <h3>Connexion {role === 'admin' ? 'Admin' : 'Enseignant'}</h3>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            required
                        />
                        <button type="submit">Connexion</button>
                    </form>
                    {message && <p>{message}</p>}

                    {/* Option pour revenir en arrière et choisir un autre rôle */}
                    <button onClick={() => setRole('')}>Changer de rôle</button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
