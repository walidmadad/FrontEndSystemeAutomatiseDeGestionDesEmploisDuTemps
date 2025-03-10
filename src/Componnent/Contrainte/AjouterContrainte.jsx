import React, { useState } from 'react'
import Header from '../comon/Header'
import { addContrainte } from '../../api'

export default function AjouterContrainte({user}) {

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [contrainte, setContarinte] = useState({
    enseignant: user,
    titre: "",
    typeContrainte: "",
    description: "",
    dateDeContrainte: "",
    dateDebutContrainte: "",
    dateFinContrainte: "",
  })
  
  const handleInputChange = (field, value) => {
      setContarinte((prev) => {
        return{
          ...prev,
          [field]: value
        }
      })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = await addContrainte(contrainte);
      setMessage(data.message);
      setError(null);
      setContarinte(
        {
          enseignant: user,
          titre: "",
          typeContrainte: "",
          description: "",
          dateDeContrainte: "",
          dateDebutContrainte: "",
          dateFinContrainte: "",
        }
      )
    } catch (error) {
      setError(error.message);
      setMessage(null)
    }
  }

  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen'>
            <Header title="Ajouter "/>
            <main className="max-w-7xl mx-auto py-6 px-2 lg:px-2 xl:px-5">
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">Erreur : {error}</div>}
            {message && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{message}</div>}
            </main>
            <form
                className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-gray-200"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-6">
                  {/* Titre */}
                  <div>
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                      Titre :
                    </label>
                    <input
                      id="titre"
                      type="text"
                      value={contrainte.titre}
                      onChange={(e) => handleInputChange('titre', e.target.value)}
                      placeholder="Entrez titre"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Type de Contrainte */}
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Type de Contrainte :
                    </label>
                    <input
                      id="typeContraite"
                      type="text"
                      value={contrainte.typeContrainte}
                      onChange={(e) => handleInputChange('typeContrainte', e.target.value)}
                      placeholder="Entrez votre prénom"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
            
                  {/* Description */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Description :
                    </label>
                    <textarea
                      id="description"
                      type="text"
                      value={contrainte.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Entrez la description"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  {/* Jour de contrainte */}
                  <div>
                    <label htmlFor="dateDeContrainte" className="block text-sm font-medium text-gray-700">
                      Jour de contrainte :
                    </label>
                    <input
                      id="dateDeContrainte"
                      type="date"
                      value={contrainte.dateDeContrainte}
                      onChange={(e) => handleInputChange('dateDeContrainte', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                   {/* DEBUT */}
                   <div>
                    <label htmlFor="dateDebutContrainte" className="block text-sm font-medium text-gray-700">
                      Debut de contrainte :
                    </label>
                    <input
                      id="dateDebutContrainte"
                      type="time"
                      value={contrainte.dateDebutContrainte}
                      onChange={(e) => handleInputChange('dateDebutContrainte', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                   {/* FIN */}
                   <div>
                    <label htmlFor="dateFinContrainte" className="block text-sm font-medium text-gray-700">
                      Fin de contrainte :
                    </label>
                    <input
                      id="dateFinContrainte"
                      type="time"
                      value={contrainte.dateFinContrainte}
                      onChange={(e) => handleInputChange('dateFinContrainte', e.target.value)}
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
    </div>
  )
}
