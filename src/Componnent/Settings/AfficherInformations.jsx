import { motion } from 'framer-motion';
import {React, useState} from 'react';
import { Link } from 'react-router-dom';


export default function AfficherInformations(props) {
  const [user, setUser] = useState(props.user);
      
        const handleInputChange = (field, value) => {
          setUser({ ...user, [field]: value });
        };
    return (
        <>
            <div className='bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto '>
                <h2 className="text-xl font-bold mb-4 text-gray-800 ">Données Personnelles</h2>
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 px-10">
                    <div>
                    <label htmlFor="nom" className="text-base font-bold text-gray-700">Nom :</label>
                    <label className="mx-3 w-full">{user.nom}</label>
                    </div>
                    <div>
                    <label htmlFor="prenom" className="text-base font-bold text-gray-700">Prénom :</label>
                    <label className="mx-3 w-full">{user.prenom}</label>
                    </div>
                    <div>
                    <label htmlFor="email" className="text-base font-bold text-gray-700">Email :</label>
                    <label className="mx-3 w-full">{user.email}</label>
                    </div>
                    <div>
                    <label htmlFor="telephone" className="text-base font-bold text-gray-700">Téléphone :</label>
                    <label className="mx-3 w-full">{user.telephone}</label>
                    </div>
                    <div>
                    <label htmlFor="departement" className="text-base font-bold text-gray-700">Département :</label>
                    <label className="mx-3 w-full">{user.departement.nom}</label>
                    </div>
                    <div>
                    <label className="text-base font-bold text-gray-700">Type d'utilisateur :</label>
                    <label className="mx-3 w-full">{user.userType}</label>
                    </div>
                    <div>
                    <label className="text-base font-bold text-gray-700">Date de naissance :</label>
                    <label className="mx-3 w-full">{user.dateNaissance}</label>
                    </div>
                </div>
                
            </div>
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-3  sm:grid-cols-1 gap-5 mb-8 max-w-3xl text-center mx-auto "
                >
                <div>
                    <Link to='modifier'>
                        <motion.div className="flex items-center p-4 text-sm font-medium rounded-xl bg-yellow-600 hover:bg-yellow-500 transition-colors mb-2">
                            <span>Modifier Vous Données</span>
                        </motion.div>
                    </Link>
                </div>
                <div>
                    <Link to='modifier-password'>
                        <motion.div className="flex items-center p-4 text-sm font-medium rounded-xl bg-yellow-600 hover:bg-yellow-500 transition-colors mb-2">
                            <span>Modifier Votre mot de passe</span>
                        </motion.div>
                    </Link>
                </div>
                <div>
                    <Link to='Supprimmer votre Compte'>
                        <motion.div className="flex items-center p-4 text-sm font-medium rounded-xl bg-red-600 hover:bg-red-500 transition-colors mb-2">
                            <span>Supprimer Votre Compte</span>
                        </motion.div>
                    </Link>
                </div>
                
            </motion.div>
           
            
    </>
    );
}
