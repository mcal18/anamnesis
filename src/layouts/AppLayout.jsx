import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import anamnesisLogo from '../assets/anamnesis_logo.png'
import './AppLayout.css'

function AppLayout({ children }) {
    return (
        <div className="app">
            <header className="app-header">
                <Link to="/" className="app-logo" aria-label="ANAMNESIS home">
                    <img src={anamnesisLogo} alt="" />
                    <span>ANAMNESIS</span>
                </Link>

            </header>

            <Navigation />

            <main className="app-main">
                {children}
            </main>
        </div>
    )
}

export default AppLayout