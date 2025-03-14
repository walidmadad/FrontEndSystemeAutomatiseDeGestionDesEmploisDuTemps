import { CalendarSearch, Menu, LayoutDashboard, Settings, Users, Bell, LogOut, BadgeAlert, CalendarPlus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from "react-router";

const SIDEBAR_ITEMS_ADMIN = [
    { name: "Tableau de board", icon: LayoutDashboard, color: "#2C3E50", path: "/" },
    { name: "Gestion des Utilisateurs", icon: Users, color: "#1E8449", path: "/gestion-utilisateur" },
    { name: "Création d'un Cours", icon: CalendarPlus, color: "#76448A", path: "/ajouter-cours" },
    { name: "Visualisation des Emplois du Temps", icon: CalendarSearch, color: "#7D6608", path: "/visualisation-emploi" },
    { name: "Liste des contraintes", icon: BadgeAlert, color: "#B9770E", path: "/all-contraintes" },
    { name: "Notification", icon: Bell, color: "#7D6608", path: "/notification" },
    { name: "Paramètres", icon: Settings, color: "#5D6D7E", path: "/settings" },
    { name: "Se Déconnecter", icon: LogOut, color: "#ff0000", path: "/deconnecter" }
];
const SIDEBAR_ITEMS_ENSEIGNANT = [
    { name: "Tableau de board", icon: LayoutDashboard, color: "#2C3E50", path: "/" },
    { name: "Visualisez Votre Emplois du Temps", icon: CalendarSearch, color: "#7D6608", path: "/visualisation-emploi-prof" },
    { name: "Contraintes", icon: BadgeAlert, color: "#ff0000", path: "/contraintes" },
    { name: "Notification", icon: Bell, color: "#7D6608", path: "/notification" },
    { name: "Paramètres", icon: Settings, color: "#5D6D7E", path: "/settings" },
    { name: "Se Déconnecter", icon: LogOut, color: "#ff0000", path: "/deconnecter" },
];

export default function Sidebar({ user, onLogout }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'} sm:w-16 md:w-64`}
            animate={{ width: isSidebarOpen ? 300 : 100 }}
        >
            <div className="h-full bg-slate-100 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-slate-100">
                <div className="px-2 rounded-full hover:bg-slate-200 transition-colors max-w-fit whitespace-break-spaces">
                    <motion.button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center p-2 rounded-full hover:bg-slate-200 transition-colors max-w-fit"
                    >
                        <Menu size={24} />
                        {isSidebarOpen && (
                            <motion.button
                                className="px-2 cursor-pointer"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.1, delay: 0.1 }}
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <label className="items-center cursor-pointer">{user.nom.toLocaleUpperCase() + " " + user.prenom}</label>
                            </motion.button>
                        )}
                    </motion.button>
                </div>
                {user.userType === "ADMIN" ? (
                <nav className="mt-8 flex-grow">
                    {SIDEBAR_ITEMS_ADMIN.map((item, index) => (
                        item.name === "Se Déconnecter" ? (
                            <div
                                key={item.path}
                                onClick={onLogout}
                                className="flex items-center p-6 text-sm text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2 cursor-pointer"
                            >
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                {isSidebarOpen && (
                                    <span className="ml-5 whitespace-break-spaces">{item.name}</span>
                                )}
                            </div>
                        ) : (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    className="flex items-center p-6 text-sm text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2"
                                >
                                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                className="ml-5 whitespace-break-spaces"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.1, delay: 0.1 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        )
                    ))}
                </nav>
                ) : (
                    <nav className="mt-8 flex-grow">
                    {SIDEBAR_ITEMS_ENSEIGNANT.map((item, index) => (
                        item.name === "Se Déconnecter" ? (
                            <div
                                key={item.path}
                                onClick={onLogout}
                                className="flex items-center p-6 text-sm text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2 cursor-pointer"
                            >
                                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                {isSidebarOpen && (
                                    <span className="ml-5 whitespace-break-spaces">{item.name}</span>
                                )}
                            </div>
                        ) : (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    className="flex items-center p-6 text-sm text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors mb-2"
                                >
                                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                className="ml-5 whitespace-break-spaces"
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.1, delay: 0.1 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        )
                    ))}
                </nav>
                )}
            </div>
        </motion.div>
    );
}
