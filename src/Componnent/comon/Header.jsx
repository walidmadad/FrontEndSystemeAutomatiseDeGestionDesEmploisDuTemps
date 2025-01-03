import React from 'react'

export default function Header({title}) {
  return (
    <header className='bg-gray-100 bg-opacity-50 backdrop-blur-md shadow-g border-b border-gray-200'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold text-gray-800'>{title}</h1>
        </div>
    </header>
  )
}
