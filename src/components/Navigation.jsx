import { NavLink, useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import SettingsModal from "./SettingsModal";
import './Navigation.css'

function Navigation() {
    const navigate = useNavigate()
    const [settingsOpen, setSettingsOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    return (
        <nav className="navigation">
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'
                }
            >
                Home
            </NavLink>
            <NavLink to="/memories"
                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'
                }
            >
                Memories
            </NavLink>
            <NavLink to="/timeline"
                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'
                }
            >
                Timeline
            </NavLink>
            <NavLink to="/capsules"
                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'
                }
            >
                Capsules
            </NavLink>
            <NavLink to="/then-and-now"
                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'
                }
            >
                Then & Now
            </NavLink>
            <NavLink to="/future-me"
                className={({ isActive }) => isActive ? 'navigation-link active' : 'navigation-link'
                }
            >
                Future Me
            </NavLink>
            <div className="navigation-actions">
                <button
                    type="button"
                    className="navigation-icon"
                    onClick={() => setSettingsOpen(true)}
                    aria-label="Settings"
                >
                    <FiSettings />
                </button>
                <button
                    type="button"
                    className="navigation-icon"
                    onClick={handleLogout}
                    aria-label="Log out"
                >
                    <FiLogOut />
                </button>
            </div>
            {settingsOpen && (
                <SettingsModal 
                    onClose={() => setSettingsOpen(false)}
                />
            )}
        </nav>
    )
}

export default Navigation