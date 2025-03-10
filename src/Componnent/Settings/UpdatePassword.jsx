import React, { useState } from 'react'

export default function UpdatePassword() {
    const [motDePasse, setMotDePasse] = useState('');
    const [motDePasseConfirm, setMotDePasseConfirm] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
      if (field === 'motDePasse') {
        setMotDePasse(value);
      }
      if (field === 'motDePasseConfirm') {
        setMotDePasseConfirm(value);
        if(value !== motDePasse){
          setError('Les mots de passe ne correspondent pas');
        }
        else{
          setError('');
        }
      }
    }

  return (
    <div className='bg-white shadow-md rounded-lg p-6 w-1/2 max-w-3xl mx-auto'>
        <h2 className="text-xl font-bold mb-4 text-gray-800 ">Modifier votre mot de passe</h2>
        <form className="grid gap-4">
          <div>
            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">Nouveau mot de passe :</label>
            <input
              id="motDePasse"
              type="password"
              value={motDePasse}
              onChange={(e) => handleInputChange('motDePasse', e.target.value)}
              placeholder="Entrez votre nouveau mot de passe"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="motDePasseConfirm" className="block text-sm font-medium text-gray-700">Confirmez votre nouveau mot de passe :</label>
            <input
              id="motDePasseConfirm"
              type="password"
              value={motDePasseConfirm}
              onChange={(e) => handleInputChange('motDePasseConfirm', e.target.value)}
              placeholder="Confirmez votre nouveau mot de passe"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {error && <label className="text-red-500 text-sm">{error}</label>}
          </div>
          
          <div className="">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition ease-in-out duration-300 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Modifier
            </button>
          </div>
        </form>
    </div>
  );

}
