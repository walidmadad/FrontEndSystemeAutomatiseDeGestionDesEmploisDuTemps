import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import Header from '../Componnent/comon/Header';
import { fetchAllNotificationsById, fetchAllNotifications, updateNotification } from '../api';

export default function Notification({user}) {
  const [notifications, setNotifications] = useState([]);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState([]);

  const openMessage = (notif) => {
    setIsMessageOpen(!isMessageOpen);
    if(!notif.vue){
      updateNotification(notif.id);
    }
    setNotifOpen(notif);
  }

  const closeMessage = () => {
    setIsMessageOpen(!isMessageOpen);
    user.userType === 'ADMIN' ? getNotifications() :getNotificationsById(user.id);
  }

  const getNotificationsById = async (id) => {
    try {
      const response = await fetchAllNotificationsById(id);
      console.log(response)
      const notificationsData = response.filter((notif) => notif.sender === 'Admin');
      setNotifications(notificationsData); 
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications', error);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await fetchAllNotifications();
      console.log(response)
      const notificationsData = response.filter((notif) => notif.sender !== 'Admin');
      setNotifications(notificationsData); 
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications', error);
    }
  }
  

  useEffect(() => {
    user.userType === 'ADMIN' ? getNotifications() :getNotificationsById(user.id);
  },[]);

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen'>
        <Header title="Notifications" icon={Bell}/>
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
          {!isMessageOpen ? (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bell className="h-6 w-6 text-blue-500" /> Liste des Notifications
            </h1>
            </div>

            {notifications.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">Aucune notification pour le moment.</p>
            ) : (
            <ul className="mt-4 space-y-3">
                {notifications.map((notif) => (
                <li
                    onClick={() => openMessage(notif)}
                    key={notif.id}
                    
                    className={`p-4 rounded-lg flex justify-between items-center transition transform hover:scale-105 hover:cursor-pointer ${!notif.vue ? "bg-blue-50 border-l-4 border-blue-400 text-blue-700" : "bg-white border-l-4 border-gray-200 text-gray-800"}`}
                >
                    <span>{notif.titre}</span>
                    <span className="text-sm text-gray-500">{new Date(notif.dateEnvoie).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                </li>
                ))}
            </ul>
            )}
          </div> ) : (
            <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl'>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    Object : {notifOpen.titre}
                </h1>
                  
                <button onClick={() => closeMessage()} className="text-gray-500 hover:text-red-500">
                  <X className="h-5 w-5" />
                </button>

              </div>
              <div className="flex items-center justify-between border-b ">
                <h1 className="my-5 text-md font-semibold font-serif flex items-center gap-2">
                  From : {notifOpen.sender}
                </h1>
                <p className="my-5 text-md font-semibold font-serif flex items-center gap-2 hover:text-blue-400 cursor-default transition duration-300 ease-in-out">
                  Date : {new Date(notifOpen.dateEnvoie).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>

              </div>
                <p className="my-5 mx-2 text-md flex items-center gap-2">
                  {notifOpen.message}
                </p>
            </div>
          )}
        </div>
    </div>
  );
}
