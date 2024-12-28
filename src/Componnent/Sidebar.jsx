import { Calendar, CalendarSearch, Menu, LayoutDashboard, School, Settings, Users, Bell } from "lucide-react";
import { useState } from "react"
import {AnimatePresence, motion} from 'framer-motion'
import { Link } from "react-router";


const SIDEBAR_ITEMS = [
    { name:"Tableau de board", icon: LayoutDashboard, color:"#5DADE2", path:"/"},
    { name:"Gestion des Utilisateurs", icon: Users, color:"#58D68D", path:"/"},
    { name:"Gestion des Matières", icon: Calendar, color:"#F5B041", path:"/"},
    { name:"Gestion des Salles", icon: School, color:"#F1948A", path:"/"},
    { name:"Création des Emplois du Temps", icon: Calendar, color:"#D7BDE2", path:"/"},
    { name:"Visualisation des Emplois du Temps", icon: CalendarSearch, color:"#F9E79F", path:"/"},
    { name:"Notifications", icon: Bell, color:"#F9E79F", path:"/"},
    { name:"Paramètres", icon: Settings, color:"#F9E79F", path:"/settings"},

]
export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <motion.div
    className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
    animate={{ width: isSidebarOpen ? 256 : 80}}
    >
        <div className="h-full bg-slate-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-slate-700">
            <motion.button
                whileHover={{ scale: 1.1}}
                whileTap={{ scale:0.9}}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
            >
                <Menu size={24}/>

            </motion.button>

            <nav className="mt-8 flex-grow ">
                {SIDEBAR_ITEMS.map((item, index) => (
                    <Link key={item.path} to={item.path}>
                     <motion.div
                     className="flex items-center p-6 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                     >
                        <item.icon size={20} style={{color: item.color, minWidth:"20px"}}/>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span 
                                className="ml-5 whitespace-break-spaces"
                                initial={{opacity:0, width:0}}
                                animate={{opacity:1, width:"auto"}}
                                exit={{opacity:0, width:0}}
                                transition={{duration: 0.1, delay:0.1}}
                                >
                                    {item.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                     </motion.div>
                    </Link>
                ))}
            </nav>
        </div>
    </motion.div>

  )
}