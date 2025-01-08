import axios from 'axios';

const API_URL = 'http://localhost:9191/api/v1/';

export const verifierConnexion = async (email, motDePasse, userType) => {
    try {
        const response = await axios.get(`${API_URL}utilisateurs/verify`, {
            params: { email, motDePasse, userType },
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
export const fetchAllUtilisateurs = async () => {
    try {
      const response = await axios.get(`${API_URL}utilisateurs/all`);
      return response.data.data; 
    } catch (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs.');
    }
  };
  
export const addAdmin = async (admin) => {
    try {
      const response = await axios.post(`${API_URL}utilisateurs/admin/add`, admin);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout de l\'Admin.');
    }
  };
  
export const addEnseignant = async (enseignant) => {
    try {
      const response = await axios.post(`${API_URL}utilisateurs/enseignant/add`, enseignant);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de l\'ajout de l\'enseignant.');
    }
  };

export const updateEnseignant = async (id, utilisateur) => {
    try {
      const response = await axios.put(`${API_URL}utilisateurs/enseignant/update/${id}`, utilisateur);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'enseignant.');
    }
  };
  
export const deleteUtilisateur = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}utilisateurs/delete/${id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

 export const fetchAllDepartements = async() => {
  try{
    const response = await axios.get(`${API_URL}departements/all`);
    return response.data.data;
  }catch (error){
    throw new Error('Erreur lors de recuperation de departements');

  }
 };