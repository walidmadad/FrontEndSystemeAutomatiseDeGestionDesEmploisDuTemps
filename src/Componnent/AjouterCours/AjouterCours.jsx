import React, { useEffect, useState } from 'react'
import Header from '../comon/Header'
import { fetchAllSalles, fetchAllUtilisateurs, fetchAllFormations } from '../../api';

export default function AjouterCours() {
    const [enseignants, setEnseignants] = useState([]);
    const [salles, setSalles] = useState([]);
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cours, setCours] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        telephone: '',
        enseignant: {
          id : 0
        },
        salle: {
            id : 0
        },
        matiere: {
            id : 0
          },
        formation : {
            id : 0
        },
        dateNaissance: '',
        dateEntree:''
      });
    
    const handleInputChange = (field, value) => {
        setCours((prevUser) => {
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
    const loadFormations = async () => {
      setLoading(true);
      try{
          const formationsData = await fetchAllFormations();
          setFormations(formationsData);
      }catch(err){
          setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    const loadSalles = async () => {
        setLoading(true);
        try{
            const sallesData = await fetchAllSalles();
            setSalles(sallesData);
        }catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }
    const loadUtilisateurs = async () => {
        setLoading(true);
        try {
          const utilisateursData = await fetchAllUtilisateurs();
          const enseignants = utilisateursData.filter((utilisateur) => utilisateur.userType !== "ADMIN")
          setEnseignants(enseignants);

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    useEffect(()=>{
        loadSalles();
        loadUtilisateurs();
        loadFormations();
    },[])
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title="Ajouter Cours"/>
        <form
                className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-gray-200"
                
              >
                {error && (
                  <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
                    <p>Erreur : {error}</p>
                  </div>
                )}
                {loading ? (
                <p className="text-center text-gray-500">Chargement en cours...</p>
                ) :(
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                
                  {/* Salle */}
                  <div>
                    <label htmlFor="salle" className="block text-sm font-medium text-gray-700">
                      Salle :
                    </label>
                    <select
                      id="salle"
                      onChange={(e) => handleInputChange('salle', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez une salle
                      </option>
                      {salles.map((salle) => (
                        <option key={salle.id} value={salle.id}>
                          {salle.nom} {salle.tyepSalle} {salle.capacite}
                        </option>
                      ))}
                    </select>
                  </div>
          
                  {/* Type de cours */}
                  <div>
                    <label htmlFor="typedecours" className="block text-sm font-medium text-gray-700">
                      Type de Cours :
                    </label>
                    <select id="typedecours"
                      onChange={(e) => handleInputChange('typedecours', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="" >
                        Sélectionnez Type de Cours
                      </option>
                        <option value="TD">TD</option>
                        <option value="Cours">cours</option>
                        <option value="TP">TP</option>
                    </select>
                  </div>
            
                  {/* Enseignant */}
                  <div>
                    <label htmlFor="enseignant" className="block text-sm font-medium text-gray-700">
                      Enseignant :
                    </label>
                    <select
                      id="enseignant"
                      onChange={(e) => handleInputChange('enseignant', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez un enseignant
                      </option>
                      {enseignants.map((enseignant) => (
                        <option key={enseignant.id} value={enseignant.id}>
                          {enseignant.nom} {enseignant.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
            
                  {/* Formation */}
                  <div>
                    <label htmlFor="formation" className="block text-sm font-medium text-gray-700">
                      Formation :
                    </label>
                    <select
                      id="formation"
                      onChange={(e) => handleInputChange('formation', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez une formation
                      </option>
                      {formations.map((formation) => (
                        <option key={formation.id} value={formation.id}>
                          {formation.niveau.nom} {formation.nom} 
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Matiere */}
                  <div>
                    <label htmlFor="matiere" className="block text-sm font-medium text-gray-700">
                      Matière :
                    </label>
                    <select
                      id="matiere"
                      onChange={(e) => handleInputChange('matiere', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez une matière
                      </option>
                      {enseignants.map((enseignant) => (
                        <option key={enseignant.id} value={enseignant.id}>
                          {enseignant.nom} {enseignant.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
            
                  {/* Date de naissance */}
                  <div>
                    <label htmlFor="dateDeNaissance" className="block text-sm font-medium text-gray-700">
                      Jour de cours :
                    </label>
                    <input
                      id="jour"
                      type="datetime-local"
                      value={cours.jour}
                      onChange={(e) => handleInputChange('jour', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                

                </div>
                )}
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
    </div>
  )
}
