import { NavLink } from "react-router-dom";
import './Navigation.css'

function Navigation() {
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
        </nav>
    )
}

export default Navigation