import React, { useState } from 'react';
import Login from './Componnent/Login';
import TableauDeBord from './Componnent/TableauDeBord';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    const handleLogin = (user) => {
        setUser(user)
        console.log('Login successful'); // Vérifiez si cette ligne est exécutée
        setIsLogged(true);
    };

    const handleLogout = () => {
        setIsLogged(false);
        navigate('/')
        setUser({});
        console.log('Déconnexion réussie');
    };
    

    return (
        <>
            
            {isLogged ? (
                <TableauDeBord user={user} onLogout={handleLogout}/>
            ) : (
                <div className="app-container flex justify-center items-center text-white">
                    <Login onLogin={handleLogin} />
                </div>
            )}
        
        </>
    );
};

export default App;

