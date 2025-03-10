import React, { useEffect, useState } from 'react'
import { fetchAllContrainte } from '../../api';
import Header from '../comon/Header';
import { Outlet } from 'react-router-dom';
import { BadgeAlert } from "lucide-react";

export default function AllContrainte() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [contraintes, setContarintes] = useState([])

  const loadContraintes = async(id) => {
    setLoading(true)
    try {
      const res = await fetchAllContrainte()
      console.log(res.data)
      setContarintes(res.data)
    }catch (error) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContraintes();
  },[])
  return (
    <div className='flex-1 overflow-auto relative z-10 bg-gray-100 min-h-screen'>
        <Header title="Contraintes" icon={BadgeAlert}/>
        <main className="max-w-7xl mx-auto py-6 px-2 lg:px-2 xl:px-5">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            <p>Erreur : {error}</p>
          </div>
        )}
        
        <Outlet />
        <h2 className="text-2xl mt-5 font-bold mb-6">Liste des contraintes</h2>
            {loading ? (
            <p className="text-center text-gray-500">Chargement en cours...</p>
            ) : contraintes.length > 0 ? (
            <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-gray-300">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Enseignant</th>
                    <th className="border border-gray-300 px-4 py-2">Titre</th>
                    <th className="border border-gray-300 px-4 py-2">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Type Contrainte</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Début</th>
                    <th className="border border-gray-300 px-4 py-2">Fin</th>
                </tr>
                </thead>
                <tbody>
                {contraintes.map((contrainte) => (
                  <tr key={contrainte.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.enseignant.nom} {contrainte?.enseignant.prenom}</td>                      
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.titre}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.description ? contrainte.description.length > 30 ? contrainte.description.slice(0,30) +"..." : contrainte.description : "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.typeContrainte || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.dateDeContrainte}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.dateDebutContrainte || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.dateFinContrainte || "N/A"}</td>
                  </tr>
                ))}
                </tbody>
            </table>
            ) : (
            <p className="text-center text-gray-500">Aucun contraintes trouvé</p>
            )}
        </main>
    </div>
  )
}
