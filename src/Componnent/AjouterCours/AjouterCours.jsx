import React, { useCallback, useEffect, useState } from 'react'
import Header from '../comon/Header'
import { fetchAllSalles, fetchAllUtilisateurs, fetchAllFormations, fetchAllMatieres, fetchUtilisateursByName, addCours } from '../../api';

export default function AjouterCours() {
    const [enseignants, setEnseignants] = useState([]);
    const [nomEnseignant, setNomEnseignant] = useState("");
    const [salles, setSalles] = useState([]);
    const [formations, setFormations] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [cours, setCours] = useState({
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
        dateDeCours: '',
        debutDeCours: '',
        finDeCours:'',
        typeDeCours: '',
      });
    
    const handleInputChange = useCallback((field, value) => {
      setCours((prevCours) => {
          const updatedCours = { ...prevCours, [field]: value };
          if (field === "formation") {
              loadMatieres(value.id);
          }
          return updatedCours;
      });
    }, []);
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
    const loadMatieres = async(idFormation) => {
      setLoading(true);
      try{
        const matieresData = await fetchAllMatieres();
        const matieresByFormations = matieresData.filter((matiere) => matiere.formation.id === idFormation) 
        console.log(matieresByFormations)
        setMatieres(matieresByFormations);
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
        if (nomEnseignant === ""){
          try {
            const utilisateursData = await fetchAllUtilisateurs();
            const enseignants = utilisateursData.filter((utilisateur) => utilisateur.userType !== "ADMIN")
            setEnseignants(enseignants);

          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }else{
          try{
            const utilisateursData = await fetchUtilisateursByName(nomEnseignant)
            const enseignants = utilisateursData;
            setEnseignants(enseignants);
          }catch(err){
            setError(err.message)
          }finally{
            setLoading(false)
          }
          
        }
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const data = await addCours(cours);
          setMessage(data.message)
          setError(null)
          setCours({
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
            dateDeCours: '',
            debutDeCours: '',
            finDeCours:'',
            typeDeCours: '',
          })
        }catch(err){
          setError(err.message)
          setMessage(null)
        }
        
      }

    useEffect(()=>{

      loadSalles();
      loadUtilisateurs();
      loadFormations();
            
    },[])
  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title="Ajouter Cours"/>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-gray-200">
                {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
                {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
                {loading ? (
                <p className="text-center text-gray-500">Chargement en cours...</p>
                ) :(
                <div className="grid grid-cols-1 gap-6">
                  
                  {/* Enseignant */}
                  <div>
                    <label className='text-sm font-medium text-gray-700'>Nom Enseignant : </label>
                    <input className='ml-2 border rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                     value={nomEnseignant}
                     onChange={(e) => {
                      setNomEnseignant(e.target.value)
                     }}></input>
                     <button onClick={ () => {
                      loadUtilisateurs()
                     }} 
                     disabled={nomEnseignant === "" ? "disabled" : ""}
                     className=' bg-blue-500 ml-4 text-white font-semibold py-1 px-4 border rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400'
                     >Rechercher</button>
                  </div>

                  <div>
                    <label htmlFor="enseignant" className="block text-sm font-medium text-gray-700">
                      Enseignant :
                    </label>
                    <select
                      id="enseignant"
                      value={cours.enseignant.id}
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
                
                  {/* Salle */}
                  <div>
                    <label htmlFor="salle" className="block text-sm font-medium text-gray-700">
                      Salle :
                    </label>
                    <select
                      id="salle"
                      value={cours.salle.id}
                      onChange={(e) => handleInputChange('salle', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez une salle
                      </option>
                      {salles.map((salle) => (
                        <option key={salle.id} value={salle.id}>
                          Nom: {salle.nom} | Type de Salle: {salle.typeSalle} | Capacité: {salle.capacite}
                        </option>
                      ))}
                    </select>
                  </div>
          
                  {/* Type de cours */}
                  <div>
                    <label htmlFor="typeDeCours" className="block text-sm font-medium text-gray-700">
                      Type de Cours :
                    </label>
                    <select id="typeDeCours"
                      value={cours.typeDeCours}
                      onChange={(e) => handleInputChange('typeDeCours', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="" >
                        Sélectionnez Type de Cours
                      </option>
                        <option value="TD">TD</option>
                        <option value="Cours">cours</option>
                        <option value="TP">TP</option>
                    </select>
                  </div>
            
                  
            
                  {/* Formation */}
                  <div>
                    <label htmlFor="formation" className="block text-sm font-medium text-gray-700">
                      Formation :
                    </label>
                    <select
                      id="formation"
                      value={cours.formation.id}
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
                      value={cours.matiere.id}
                      onChange={(e) => handleInputChange('matiere', { id: parseInt(e.target.value, 10) })}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="" >
                        Sélectionnez une matière
                      </option>
                      {matieres.map((matiere) => (
                        <option key={matiere.id} value={matiere.id}>{matiere.nom}</option>
                      ))}
                      
                    </select>
                  </div>
            
                  {/* Jour de cours */}
                  <div>
                    <label htmlFor="dateDeCours" className="block text-sm font-medium text-gray-700">
                      Jour de cours :
                    </label>
                    <input
                      id="dateDeCours"
                      type="date"
                      value={cours.dateDeCours}
                      onChange={(e) => handleInputChange('dateDeCours', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                   {/* DEBUT */}
                   <div>
                    <label htmlFor="debutDeCours" className="block text-sm font-medium text-gray-700">
                      Debut de cours :
                    </label>
                    <input
                      id="debutDeCours"
                      type="time"
                      value={cours.debutDeCours}
                      onChange={(e) => handleInputChange('debutDeCours', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                   {/* FIN */}
                   <div>
                    <label htmlFor="finDeCours" className="block text-sm font-medium text-gray-700">
                      fin de cours :
                    </label>
                    <input
                      id="finDeCours"
                      type="time"
                      value={cours.finDeCours}
                      onChange={(e) => handleInputChange('finDeCours', e.target.value)}
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
                    onClick={handleSubmit}
                  >
                    Ajouter
                  </button>
                </div>
          </div>
    </div>
  )
}
