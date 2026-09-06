import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './Dashboard.css'

function Dashboard () {
    const navigate = useNavigate()

    return (
        <section className="dashboard">
            <div className="dashboard-intro">
                <p className="dashboard-eyebrow">ANAMNESIS</p>

                <h1>What is worth remembering today?</h1>

                <p className="dashboard-description">
                    A place to preserve the moments, thoughts, and pieces of life
                    you want to meet again someday.
                </p>

                <Button onClick={() => navigate('/memories')}>Create Memory</Button>
            </div>

            <div className="dashboard-section">
                <h2>Coming back to you</h2>

                <div className="dashboard-empty">
                    <p>No memories have returned yet.</p>
                    <span>
                        When one does, it will be waiting here.
                    </span>
                </div>
            </div>
        </section>
    )
}

export default Dashboard