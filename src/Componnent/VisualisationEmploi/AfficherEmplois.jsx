import React, { useEffect, useState } from 'react';
import Header from '../comon/Header';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styles du calendrier
import { fetchAllCoursByEnseignant, fetchAllUtilisateurs, fetchUtilisateursByName } from '../../api';

// Initialisation de moment pour la localisation des dates
const localizer = momentLocalizer(moment);


export default function AfficherEmplois() {
  const [events, setEvents] = useState([]); // État des événements filtrés
  const [enseignants, setEnseignants] = useState([]);
  const [nomEnseignant, setNomEnseignant] = useState("");
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
      console.log(data)
      setCours(data);

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
        title: `${coursItem.matiere.nom} (${coursItem.typeDeCours}) - ${coursItem.salle.nom} - ${coursItem.formation.nom}`,
        start: startDate,
        end: endDate,
        colorEvento:'green',
      };
    });
  };
  
  useEffect(() =>{
      loadUtilisateurs();
    },[])

  // Fonction pour gérer le changement d'enseignant
  const handleSelectChange = (e) => {
    const prof = e.target.value;
    loadCours(prof)
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <Header title="Visualisation des Emplois du Temps" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
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
          />
        </div>
      </main>
    </div>
  );
}
