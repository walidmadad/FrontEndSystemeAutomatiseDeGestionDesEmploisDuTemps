import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from "../pages/HomePage";
import Settings from "../pages/Settings";
import AfficherEmplois from "./VisualisationEmploi/AfficherEmplois";
import GestionUtilisateur from "./GestionUtilisateur/GestionUtilisateur";
import AjouterCours from "./AjouterCours/AjouterCours";
import AfficherEmploisProf from "./VisualisationEmploi/AfficherEmploisProf";
import Contrainte from "./Contrainte/Contrainte";
import AjouterContrainte from "./Contrainte/AjouterContrainte";
import AllContrainte from "./Contrainte/AllContrainte";
import Notification from "../pages/Notification";

export default function TableauDeBord({ user, onLogout }) {
    return (
        <div className="flex h-screen bg-slate-50 text-gray-800 overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-slate-200 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <Sidebar user={user} onLogout={onLogout} />
            <Routes>
                <Route path="/" element={<HomePage user={user}/>} />
                <Route path="/visualisation-emploi" element={<AfficherEmplois />} />
                <Route path="/visualisation-emploi-prof" element={<AfficherEmploisProf user={user}/>} />
                <Route path="/gestion-utilisateur" element={<GestionUtilisateur />} />
                <Route path="/settings/*" element={<Settings user={user} />} />
                <Route path="/ajouter-cours" element={<AjouterCours/>}/>
                <Route path="/contraintes" element={<Contrainte id={user.id}/>}/>
                <Route path="/contraintes/ajouter" element={<AjouterContrainte user={user}/>} />
                <Route path="/all-contraintes" element={<AllContrainte/>} />
                <Route path="/notification" element={<Notification user={user}/>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    );
}
