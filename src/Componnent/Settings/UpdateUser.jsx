import {React, useState} from 'react'


export default function UpdateUser(props) {
    const [user, setUser] = useState(props.user);
    
      const handleInputChange = (field, value) => {
        setUser({ ...user, [field]: value });
      };
  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto'>
        <h2 className="text-xl font-bold mb-4 text-gray-800 ">Données Personnelles</h2>
        <form className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom :</label>
            <input
              id="nom"
              type="text"
              value={user.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              placeholder="Entrez votre nom"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom :</label>
            <input
              id="prenom"
              type="text"
              value={user.prenom}
              onChange={(e) => handleInputChange('prenom', e.target.value)}
              placeholder="Entrez votre prénom"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email :</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Entrez votre email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone :</label>
            <input
              id="telephone"
              type="text"
              value={user.telephone}
              onChange={(e) => handleInputChange('telephone', e.target.value)}
              placeholder="Entrez votre numéro de téléphone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="departement" className="block text-sm font-medium text-gray-700">Département :</label>
            <input
              id="departement"
              type="text"
              value={user.departement.nom }
              onChange={(e) => handleInputChange('departement', e.target.value)}
              placeholder="Entrez votre département"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Type d'utilisateur :</label>
            <input
              id="userType"
              type="text"
              value={user.userType}
              onChange={(e) => handleInputChange('userType', e.target.value)}
              placeholder="Entrez le type d'utilisateur"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="dateDeNaissance" className="block text-sm font-medium text-gray-700">Date de naissance :</label>
            <input
              id="dateDeNaissance"
              type="date"
              value={user.dateNaissance}
              onChange={(e) => handleInputChange('dateDeNaissance', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sauvegarder
            </button>
          </div>
        </form>
    </div>
  );
}
