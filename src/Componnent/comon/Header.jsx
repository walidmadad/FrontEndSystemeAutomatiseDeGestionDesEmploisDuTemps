import React from 'react';
import univ1 from '../../univ1.png';


export default function Header({ title, icon: Icon }) {
  return (
    <header className='bg-gray-100 bg-opacity-50 backdrop-blur-md shadow-md border-b border-gray-200'>
      <div className='max-w-7xl mx-auto py-2 px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Icône à gauche */}
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="h-8 w-8 text-blue-500 mx-2" />}
          <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
        </div>
        
        {/* Image à droite */}
        <img src={univ1} alt='Université logo' className='h-20 w-auto object-contain rounded-md' />
      </div>
    </header>
  );
}

