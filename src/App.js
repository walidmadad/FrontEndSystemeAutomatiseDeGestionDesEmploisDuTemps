import React, { useState } from 'react';
import Login from './Componnent/Login';
import TableauDeBord from './Componnent/TableauDeBord';

const App = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({})

    const handleLogin = (user) => {
        setUser(user)
        console.log('Login successful'); // Vérifiez si cette ligne est exécutée
        setIsLogged(true);
    };

    return (
        <>
            
            {isLogged ? (
                <TableauDeBord user={user} />
            ) : (
                <div className="app-container">
                    <Login onLogin={handleLogin} />
                </div>
            )}
        
        </>
    );
};

export default App;

