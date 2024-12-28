import axios from 'axios';

const API_URL = 'http://localhost:9191/api/v1/';

export const verifierConnexionAdmin = async (email, motDePasse) => {
    try {
        const response = await axios.get(`${API_URL}admins/verify`, {
            params: { email, motDePasse },
        });
        return response.data; // Retourne les données si la requête est réussie
    } catch (error) {
        if (error.response) {
            // Gestion des erreurs côté backend
            return error.response.data;
        }
        throw new Error('Erreur de connexion au serveur.');
    }
};

export const verifierConnexionProf = async (email, motDePasse) => {
    try {
        const response = await axios.get(`${API_URL}enseignants/verify`, {
            params: { email, motDePasse },
        });
        return response.data; // Retourne les données si la requête est réussie
    } catch (error) {
        if (error.response) {
            // Gestion des erreurs côté backend
            return error.response.data;
        }
        throw new Error('Erreur de connexion au serveur.');
    }
};

export const recuprerAdmin = async (email) => {
    try {
        const response = await axios.get(`${API_URL}admins/email/${email}`);
        return response.data;
    }catch(error){
        if (error.response) {
            // Gestion des erreurs côté backend
            return error.response.data;
        }
        throw new Error('Erreur de connexion au serveur.');
    }
}
export const recuprerProf = async (email) => {
    try {
        const response = await axios.get(`${API_URL}enseignants/email/${email}`);
        return response.data;
    }catch(error){
        if (error.response) {
            // Gestion des erreurs côté backend
            return error.response.data;
        }
        throw new Error('Erreur de connexion au serveur.');
    }
}