import React, { useCallback, useEffect, useState } from 'react';
import Header from '../comon/Header';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styles du calendrier
import { deleteCours, fetchAllCoursByEnseignant, fetchAllFormations, fetchAllMatieres, fetchAllSalles, fetchAllUtilisateurs, fetchUtilisateursByName } from '../../api';
import { CalendarSearchIcon } from 'lucide-react';

// Initialisation de moment pour la localisation des dates
const localizer = momentLocalizer(moment);


export default function AfficherEmplois() {
  const [events, setEvents] = useState([]); // État des événements filtrés
  const [enseignants, setEnseignants] = useState([]);
  const [nomEnseignant, setNomEnseignant] = useState("");
  const [profId, setProfId] = useState("");
  const [modifier, setModifier] = useState(false);
  const [cours, setCours] = useState({
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
  const [salles, setSalles] = useState([]);
  const [formations, setFormations] = useState([]);
  const [matieres, setMatieres] = useState([]);

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);


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

  const loadCours = async (id) => {
    setLoading(true);
    try{
      const data = await fetchAllCoursByEnseignant(id);
      const events = transformCoursToEvents(data);
      setEvents(events)
    }catch(err){
      setError(err.message)
    }finally {
      setLoading(false);
    }
  }

  const transformCoursToEvents = (cours) => {
    return cours.map((coursItem) => {
      const startDate = new Date(`${coursItem.dateDeCours}T${coursItem.debutDeCours}`);
      const endDate = new Date(`${coursItem.dateDeCours}T${coursItem.finDeCours}`);
  
      return {
        title: `${coursItem.matiere.nom} (${coursItem.typeDeCours}) | ${coursItem.salle.nom} | ${coursItem.formation.niveau.nom}-${coursItem.formation.nom}`,
        start: startDate,
        end: endDate,
        colorEvento:'green',
        id: coursItem.id
      };
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
  
  const handleInputChange = useCallback((field, value) => {
    setCours((prevCours) => {
        const updatedCours = { ...prevCours, [field]: value };
        if (field === "formation") {
            loadMatieres(value.id);
        }
        return updatedCours;
    });
  }, []);

  useEffect(() =>{
      loadUtilisateurs();
    },[])
  
    useEffect(() => {
      if (message) {
        setTimeout(() => setMessage(null), 3000); // Cache après 3 secondes
      }
    }, [message]);
    

  // Fonction pour gérer le changement d'enseignant
  const handleSelectChange = (e) => {
    const prof = e.target.value;
    setProfId(prof);
    loadCours(prof)
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  
  const handleDeleteEvent = async (id) => {
    try {
      const data = await deleteCours(id);
      setMessage(data.message);
      loadCours(profId);
      setSelectedEvent(null);
    } catch (err) {
      setError(err.message
      );
    }
  }

  const handleSubmit = async () => {

  }

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <Header title="Visualisation des Emplois du Temps" icon={CalendarSearchIcon}/>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
      {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
      {!modifier ? (
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        
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

        {/* Sélecteur d'enseignant */}
        <div className="mb-6">
          <label htmlFor="profSelect" className="block text-lg font-medium text-gray-700 mb-2">
            Sélectionnez un enseignant :
          </label>
          <select
            id="profSelect"
            onChange={handleSelectChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Veuillez sélectionner un enseignant</option>
            {enseignants.map((enseignant) => (
              <option value={enseignant.id} key={enseignant.id}>{enseignant.nom} {enseignant.prenom}</option>
            ))}
            
          </select>
        </div>

        {/* Calendrier */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Emploi du temps</h2>
          <Calendar
          
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']}
            defaultView="week"
            step={30}
            timeslots={2}
            messages={{
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
              today: 'Aujourd\'hui',
              previous: 'Précédent',
              next: 'Suivant',
            }}
            onSelectEvent={handleEventClick}
          />
        </div>
        {selectedEvent && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* Détails de l'événement */}
            {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
            <h3 className="text-xl font-bold text-gray-800">{selectedEvent.title}</h3>
            <p><strong>Début :</strong> {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</p>
            <p><strong>Fin :</strong> {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</p>
            <button 
              onClick={() => {
                setModifier(true)
              }}
              className="bg-blue-500 text-white font-semibold py-1 px-4 border rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mr-4">Modifier</button>
          
            <button
             onClick={() => handleDeleteEvent(selectedEvent.id)}
             className='bg-red-500 text-white font-semibold py-1 px-4 border rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-2'>Supprimer</button>
          </div>
        )}
        </main>
      ) : (
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
          <button 
              onClick={() => {
                setModifier(false)
              }}
              className="bg-blue-500 text-white font-semibold py-1 px-4 border rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mr-4">Retour</button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Modifee le Cours <label className='text-blue-800'>{selectedEvent.title}</label> le {moment(selectedEvent.start).format('DD/MM/YYYY')} de {moment(selectedEvent.start).format('HH:mm')} à {moment(selectedEvent.end).format('HH:mm')}</h2>
          {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
                {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
                {loading ? (
                <p className="text-center text-gray-500">Chargement en cours...</p>
                ) :(
                <div className="grid grid-cols-1 gap-6">
                
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
                    Modifier
                  </button>
                </div>
        </main>
      )}
    </div>
  );
}