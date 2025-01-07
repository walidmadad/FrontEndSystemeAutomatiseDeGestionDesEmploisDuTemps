import { useState } from "react"
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from "../pages/HomePage";
import Settings from "../pages/Settings";
import AfficherEmplois from "./VisualisationEmploi/AfficherEmplois";

export default function TableauDeBord(props){
    const [user, setUser] = useState(props.user)

    return (
        
      <div className="flex h-screen bg-slate-50 text-gray-800 overflow-hidden">
        <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-slate-200 opacity-80"/>
            <div className="absolute inset-0 backdrop-blur-sm"/>
        </div>

        <Sidebar user={user}/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/visualisation-emploi" element={<AfficherEmplois/>}/>
            <Route path="/settings/*" element={<Settings user={user}/>}/>
        </Routes>
      </div> 
    );
}