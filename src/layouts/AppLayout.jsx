import Navigation from '../components/Navigation'
import './AppLayout.css'

function AppLayout({ children }) {
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-logo">ANAMNESIS</h1>
            </header>

            <Navigation />
            
            <main className="app-main">
                {children}
            </main>
        </div>
    )
}

export default AppLayout