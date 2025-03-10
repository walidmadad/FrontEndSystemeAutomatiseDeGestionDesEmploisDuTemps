import {React, useState} from 'react'
import { updateAdmin, updateEnseignant } from '../../api';


export default function UpdateUser(props) {
    const [user, setUser] = useState(props.user);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const handleInputChange = (field, value) => {
      setUser({ ...user, [field]: value });
    };

    const handleClick = async(e) => {
      e.preventDefault();
      try {
        if(user.userType === "ADMIN"){
        await updateAdmin(user.id, user);
        setError(null);
        }else{
          await updateEnseignant(user.id, user);
          setError(null);
        }
        setMessage("Utilisateur mis à jour avec succès");

        
      }
      catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        setError(error.message);
        setMessage(null);
      }
    }

  return (
    <div className='bg-white shadow-md rounded-lg p-6 w-1/2 mx-auto'>
        <h2 className="text-xl font-bold mb-4 text-gray-800 ">Données Personnelles</h2>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
        <form onSubmit={handleClick}>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom :</label>
            <input
              id="nom"
              type="text"
              value={user.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              placeholder="Entrez votre nom"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom :</label>
            <input
              id="prenom"
              type="text"
              value={user.prenom}
              onChange={(e) => handleInputChange('prenom', e.target.value)}
              placeholder="Entrez votre prénom"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Entrez votre email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone :</label>
            <input
              id="telephone"
              type="text"
              value={user.telephone}
              onChange={(e) => handleInputChange('telephone', e.target.value)}
              placeholder="Entrez votre numéro de téléphone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="dateDeNaissance" className="block text-sm font-medium text-gray-700">Date de naissance :</label>
            <input
              id="dateDeNaissance"
              type="date"
              value={user.dateNaissance}
              onChange={(e) => handleInputChange('dateDeNaissance', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sauvegarder
            </button>
          </div>
        </form>
    </div>
  );
}
