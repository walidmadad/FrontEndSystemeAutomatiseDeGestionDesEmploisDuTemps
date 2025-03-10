import React from 'react';
import Header from '../Componnent/comon/Header';
import { motion } from 'framer-motion';
import UpdateUser from '../Componnent/Settings/UpdateUser';
import { Routes, Route} from 'react-router-dom';
import AfficherInformations from '../Componnent/Settings/AfficherInformations';
import UpdatePassword from '../Componnent/Settings/UpdatePassword';
import { SettingsIcon } from 'lucide-react';

export default function Settings(props) {

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Paramètres" icon={SettingsIcon} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20"> </main>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-5 mb-8"
      >
        <Routes>
          <Route path='modifier' element={<UpdateUser user={props.user}/>}/>
          <Route path='modifier-password' element={<UpdatePassword user={props.user}/>}/>
          <Route path="/" element={<AfficherInformations user={props.user} />} />
        </Routes>
        
      </motion.div>
      
    </div>
  );
}
 