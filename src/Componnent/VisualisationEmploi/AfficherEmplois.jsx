import React, { useState } from 'react';
import Header from '../comon/Header';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Styles du calendrier

// Initialisation de moment pour la localisation des dates
const localizer = momentLocalizer(moment);

// Exemple d'événements par enseignant
const allEvents = {
  prof1: [
    {
      title: 'Cours de Mathématiques',
      start: new Date(2025, 0, 6, 9, 0),
      end: new Date(2025, 0, 6, 11, 0),
    },
    {
      title: 'Cours de Physique',
      start: new Date(2025, 0, 8, 10, 0),
      end: new Date(2025, 0, 8, 12, 0),
    },
  ],
  prof2: [
    {
      title: 'Réunion de projet',
      start: new Date(2025, 0, 7, 14, 0),
      end: new Date(2025, 0, 7, 15, 30),
    },
    {
      title: 'Cours de Chimie',
      start: new Date(2025, 0, 9, 8, 30),
      end: new Date(2025, 0, 9, 10, 30),
    },
  ],
};

export default function AfficherEmplois() {
  const [selectedProf, setSelectedProf] = useState(''); // État pour l'enseignant sélectionné
  const [events, setEvents] = useState([]); // État des événements filtrés

  // Fonction pour gérer le changement d'enseignant
  const handleSelectChange = (e) => {
    const prof = e.target.value;
    setSelectedProf(prof);
    setEvents(allEvents[prof] || []);
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
            value={selectedProf}
            onChange={handleSelectChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Veuillez sélectionner un enseignant</option>
            <option value="prof1">Professeur 1</option>
            <option value="prof2">Professeur 2</option>
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
