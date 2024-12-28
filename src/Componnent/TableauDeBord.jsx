import { useState } from "react"
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from "./HomePage";
import './TableauDeBord.css'

export default function TableauDeBord(props){
    const [user, setUser] = useState(props.user)

    return (
        
      <div className="flex h-screen bg-slate-900 text-gray-100 overflow-hidden">
        <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"/>
            <div className="absolute inset-0 backdrop-blur-sm"/>
        </div>

        <Sidebar/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>

        </Routes>
      </div> 
    );
}