import React, { useState } from 'react'
import Header from '../comon/Header'
import { Link, Outlet } from 'react-router-dom';
import { fetchAllContrainteByEnseignant } from '../../api';
import { useEffect } from 'react';
export default function Contrainte({id}) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [contraintes, setContarintes] = useState([])

    const loadContraintes = async(id) => {
      setLoading(true)
      try {
        const res = await fetchAllContrainteByEnseignant(id)
        setContarintes(res.data)
      }catch (error) {
        setError(error.message)
      }finally{
        setLoading(false)
      }
    }

    useEffect(() => {
      loadContraintes(id);
    },[id])

  return (
    <div className='flex-1 overflow-auto relative z-10'>
        <Header title="Contraintes"/>
        <main className="max-w-7xl mx-auto py-6 px-2 lg:px-2 xl:px-5">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            <p>Erreur : {error}</p>
          </div>
        )}
        
        <Link to="ajouter" className="bg-blue-500 py-2 text-white px-3 mr-10 rounded hover:bg-blue-600 mb-5" >Ajouter une Contraintes</Link>

        <Outlet />
        <h2 className="text-2xl mt-5 font-bold mb-6">Liste des contraintes</h2>
            {loading ? (
            <p className="text-center text-gray-500">Chargement en cours...</p>
            ) : contraintes.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
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
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.titre}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.description || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.typeContrainte || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.date}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.Début || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrainte?.Fin || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">
                        Modifier
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        //onClick={/*() => handleDelete(utilisateur.id)*/} // ID fictif
                        disabled={loading}>
                        Supprimer
                        </button>
                    </td>
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
