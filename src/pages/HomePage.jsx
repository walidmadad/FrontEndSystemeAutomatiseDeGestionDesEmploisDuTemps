import React, { useState, useEffect } from 'react';
import Header from '../Componnent/comon/Header';
import { Link } from 'react-router';
import { fetchAllNotifications, fetchAllNotificationsById } from '../api';
import { Home } from 'lucide-react';

export default function HomePage({ user }) {
  const [counter, setCounter] = useState(0);

  const getNotificationsById = async (id) => {
    try {
      const response = await fetchAllNotificationsById(id);
      let counter = 0;
      response.forEach((notif) => {
        if (!notif.vue && notif.sender === 'Admin') {
          counter += 1;
        }
      });
      setCounter(counter);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications', error);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await fetchAllNotifications();
      let counter = 0;
      response.forEach((notif) => {
        if (!notif.vue && notif.sender !== 'Admin') {
          counter += 1;
        }
      });
      setCounter(counter);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications', error);
    }
  };

  useEffect(() => {
    user.userType === 'ADMIN' ? getNotifications() : getNotificationsById(user.id);
  }, []);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen'>
      <Header title='Home' icon={Home} />
      <div className='p-10 grid gap-10 grid-cols-2'>
        {user.userType === 'ADMIN' && (
        <>
          <Link to='/gestion-utilisateur' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
            <h2 className='text-xl font-bold'>Gestion des utilisateurs</h2>
            <p className='text-gray-500'>Cette section permet de gérer les comptes des enseignants et administrateurs. Vous pouvez ajouter, modifier ou supprimer des utilisateurs selon les besoins.</p>
          </Link>

          <Link to='/ajouter-cours' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
            <h2 className='text-xl font-bold'>Ajouter des Cours</h2>
            <p className='text-gray-500'>Ajoutez les cours disponibles en ligne. Cette section permet d’organiser le contenu pédagogique en toute simplicité.</p>
          </Link>

          <Link to='/all-contraintes' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
            <h2 className='text-xl font-bold'>Liste des contraintes</h2>
            <p className='text-gray-500'>Visualisez les contraintes académiques pour garantir un emploi du temps optimisé.</p>
          </Link>

          <Link to='/visualisation-emploi' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
            <h2 className='text-xl font-bold'>Visualisation des emplois du temps</h2>
            <p className='text-gray-500'>Consultez les emplois du temps pour mieux organiser les cours et les activités académiques.</p>
          </Link>
        </>
        )}
        {user.userType === 'ENSEIGNANT' && (
          <>
            <Link to='/contraintes' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
              <h2 className='text-xl font-bold'>Ajoutez des contraintes</h2>
              <p className='text-gray-500'>Spécifiez vos contraintes horaires et disponibilités pour faciliter la planification des cours.</p>
            </Link>

            <Link to='/visualisation-emploi-prof' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
              <h2 className='text-xl font-bold'>Visualisez Votre Emplois du Temps</h2>
              <p className='text-gray-500'>Consultez votre emploi du temps personnalisé pour organiser vos cours et vos tâches académiques efficacement.</p>
            </Link>
          </>
        )}

        <Link to='/notification' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
          <h2 className='text-xl font-bold'>Notifications</h2>
          <p className='text-gray-500'>Vous avez actuellement <strong>{counter}</strong> notifications non lues. Consultez vos alertes et restez informé des mises à jour importantes.</p>
        </Link>

        <Link to='/settings' className='bg-white shadow-lg rounded-lg p-6 hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'>
          <h2 className='text-xl font-bold'>Paramètres</h2>
          <p className='text-gray-500'>Personnalisez votre compte en mettant à jour vos informations personnelles et en modifiant votre mot de passe pour plus de sécurité.</p>
        </Link>
      </div>
    </div>
  );
}
