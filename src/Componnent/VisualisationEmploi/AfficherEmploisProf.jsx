import React, { useEffect, useState } from 'react';
import Header from '../comon/Header';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styles du calendrier
import { fetchAllCoursByEnseignant} from '../../api';

// Initialisation de moment pour la localisation des dates
const localizer = momentLocalizer(moment);


export default function AfficherEmploisProf(user) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      };
    });
  };
  
  useEffect(() =>{
      loadCours(user.user.id);
    },[])

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <Header title="Visualisation des Emplois du Temps" />
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
    {loading ? (
        <p className="text-center text-gray-500">Chargement en cours...</p>
    ) : (
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">

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
            <h3 className="text-xl font-bold text-gray-800">{selectedEvent.title}</h3>
            <p><strong>Début :</strong> {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</p>
            <p><strong>Fin :</strong> {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        )}

      </main>
    )}
    </div>
  );
}