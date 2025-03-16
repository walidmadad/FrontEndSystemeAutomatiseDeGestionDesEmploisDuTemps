import React, { useEffect, useState } from 'react';
import Header from '../comon/Header';
import {  addAdmin,addEnseignant, deleteUtilisateur, fetchAllUtilisateurs, fetchAllDepartements } from '../../api';
import { UsersIcon } from 'lucide-react';

export default function GestionUtilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ajouter, setAjouter] = useState(false);
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    departement: {
      id : 0
    },
    dateNaissance: '',
    dateEntree:''
  });
  const handleInputChange = (field, value) => {
    setUser((prevUser) => {
      if(field === "departement"){
        return{
          ...prevUser,
          departement: value,
        }
      }
      return{
        ...prevUser,
        [field]: value,
      }
    });
  };
  const loadDepartements = async () => {
    setLoading(true);
    try{
      const departementData = await fetchAllDepartements();
      setDepartements(departementData);
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }
    
  // Fonction pour récupérer tous les utilisateurs
  const loadUtilisateurs = async () => {
    setLoading(true);
    try {
      const utilisateursData = await fetchAllUtilisateurs();
      setUtilisateurs(utilisateursData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(user)
      role === "Admin" ? await addAdmin(user) : await addEnseignant(user);
      setUser({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        motDePasse: '',
        departement: {
          id : 0
        },
        dateNaissance: '',
        dateEntree: ''
      });
      setAjouter(false);
      await loadUtilisateurs();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  // Suppression d'un utilisateurs
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteUtilisateur(id);
      await loadUtilisateurs();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUtilisateurs();
  }, []);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen'>
      <Header title="Gestion des Utilisateurs" icon={UsersIcon}/>

      <main className="max-w-7xl mx-auto py-6 px-2 lg:px-2 xl:px-5">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            <p>Erreur : {error}</p>
          </div>
        )}
        {!ajouter ? (<>
            <button className="bg-blue-500 text-white px-3 py-1 mr-10 rounded hover:bg-blue-600 mb-5" 
            onClick={() => {
              setAjouter(true)
              setRole("Admin")
              loadDepartements();
              }}>Ajouter un Admin</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-5" 
            onClick={() => {
              setAjouter(true)
              setRole('Enseignant')}}>Ajouter un Enseignant</button>
            </>) :
            (
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-5" 
                onClick={() => setAjouter(false)}>Afficher les Utilisateurs</button>
            )
        }
        {!ajouter ? (
            <>
            <h2 className="text-2xl font-bold mb-6">Liste des utilisateurs</h2>
            {loading ? (
            <p className="text-center text-gray-500">Chargement en cours...</p>
            ) : utilisateurs.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-4 py-2">Nom</th>
                    <th className="border border-gray-300 px-4 py-2">Prénom</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Télephone</th>
                    <th className="border border-gray-300 px-4 py-2">Département</th>
                    <th className="border border-gray-300 px-4 py-2">Type d'Utilisateur</th>
                    {/*<th className="border border-gray-300 px-4 py-2">Actions</th>*/}
                </tr>
                </thead>
                <tbody>
                {utilisateurs.map((utilisateur) => (
                    <tr key={utilisateur.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{utilisateur.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{utilisateur?.nom || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{utilisateur?.prenom || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{utilisateur.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{utilisateur?.telephone || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{utilisateur.departement?.nom || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{utilisateur.userType}</td>

                    {/*}
                    <td className="border border-gray-300 px-4 py-2">
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(utilisateur.id)} // ID fictif
                        disabled={loading}>
                        Supprimer
                        </button>
                    </td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p className="text-center text-gray-500">Aucun utilisateur trouvé</p>
            )}
            </>)
            :(
              role === 'Admin' ? (
              <>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Admin</h2>
              <form
                className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nom */}
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom :
                    </label>
                    <input
                      id="nom"
                      type="text"
                      value={user.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Entrez votre nom"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Prénom */}
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Prénom :
                    </label>
                    <input
                      id="prenom"
                      type="text"
                      value={user.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      placeholder="Entrez votre prénom"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email :
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Entrez votre email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe :
                    </label>
                    <input
                      id="motDePasse"
                      type="password"
                      value={user.motDePasse}
                      onChange={(e) => handleInputChange('motDePasse', e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
          
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                      Téléphone :
                    </label>
                    <input
                      id="telephone"
                      type="text"
                      value={user.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="Entrez votre numéro de téléphone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Département */}
                  <div>
                    <label htmlFor="departement" className="block text-sm font-medium text-gray-700">
                      Département :
                    </label>
                    <select
                      id="departement"
                      value={user.departement.id}
                      onChange={(e) => handleInputChange('departement', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez un département
                      </option>
                      {departements.map((departement) => (
                        <option key={departement.id} value={departement.id}>
                          {departement.nom}
                        </option>
                      ))}
                    </select>
                  </div>
            
            
                  {/* Date de naissance */}
                  <div>
                    <label htmlFor="dateDeNaissance" className="block text-sm font-medium text-gray-700">
                      Date de naissance :
                    </label>
                    <input
                      id="dateDeNaissance"
                      type="date"
                      value={user.dateNaissance}
                      onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                </div>
            
                {/* Bouton de soumission */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
              </>) : (
              
              <>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Enseignant</h2>
              <form
                className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nom */}
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom :
                    </label>
                    <input
                      id="nom"
                      type="text"
                      value={user.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Entrez votre nom"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Prénom */}
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Prénom :
                    </label>
                    <input
                      id="prenom"
                      type="text"
                      value={user.prenom}
                      onChange={(e) => handleInputChange('prenom', e.target.value)}
                      placeholder="Entrez votre prénom"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email :
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Entrez votre email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe :
                    </label>
                    <input
                      id="motDePasse"
                      type="password"
                      value={user.motDePasse}
                      onChange={(e) => handleInputChange('motDePasse', e.target.value)}
                      placeholder="Entrez votre mot de passe"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
          
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                      Téléphone :
                    </label>
                    <input
                      id="telephone"
                      type="text"
                      value={user.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="Entrez votre numéro de téléphone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Date de naissance */}
                  <div>
                    <label htmlFor="dateDeNaissance" className="block text-sm font-medium text-gray-700">
                      Date de naissance :
                    </label>
                    <input
                      id="dateDeNaissance"
                      type="date"
                      value={user.dateNaissance}
                      onChange={(e) => handleInputChange('dateNaissance', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  {/* Date d'entree */}
                  <div>
                    <label htmlFor="dateEntree" className="block text-sm font-medium text-gray-700">
                      Date d'entrée :
                    </label>
                    <input
                      id="dateEntree"
                      type="date"
                      value={user.dateEntree}
                      onChange={(e) => handleInputChange('dateEntree', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
            
                {/* Bouton de soumission */}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
              </>)
            
            )
            
        }
      </main>
    </div>
  );
}
