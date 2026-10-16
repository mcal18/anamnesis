import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUnlockedMemories, getUserProfile } from "../services/memoryService";
import { auth } from '../services/firebase';
import Button from '../components/Button'
import './Dashboard.css'

function Dashboard() {
    const navigate = useNavigate()
    const [memories, setMemories] = useState([])
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const loadMemories = async () => {
            if (!auth.currentUser) {
                setLoading(false)
                return
            }

            try {
                const unlockedMemories = await getUnlockedMemories(
                    auth.currentUser.uid
                )

                setMemories(unlockedMemories)
                setLoading(false)
            } catch (error) {
                console.error('Error loading returned memories:', error)
                setLoading(false)
            }
        }

        loadMemories()
    }, [])

    useEffect(() => {
        const loadProfile = async () => {
            if (!auth.currentUser) {
                return
            }

            try {
                const userProfile = await getUserProfile(auth.currentUser.uid)
                setProfile(userProfile)
            } catch (error) {
                console.error('Error loading profile:', error)
            }
        }
        loadProfile()
    }, [])

    return (
        <section className="dashboard-page">
            <div className="dashboard-intro">
                <p className="dashboard-eyebrow">ANAMNESIS</p>

                <h1>
                    {profile?.displayName
                        ? `What is worth remembering today, ${profile.displayName}?`
                        : 'What is worth remembering today?'}
                </h1>

                <p className="dashboard-description">
                    A place to preserve the moments, thoughts, and pieces of life
                    you want to meet again someday.
                </p>

                <Button onClick={() => navigate('/memories')}>Create Memory</Button>
            </div>

            <div className="dashboard-section">
                <h2>Coming back to you</h2>

                <button onClick={() => navigate('/capsules')}>
                    View all capsules
                </button>

                {loading ? (
                    <div className="dashboard-empty">
                        <p>Loading memories...</p>
                    </div>
                ) : memories.length === 0 ? (
                    <div className="dashboard-empty">
                        <p>No memories have returned yet.</p>
                        <span>
                            When one does, it will be waiting here.
                        </span>
                    </div>
                ) : (
                    <div>
                        {memories.map((memory) => (
                            <article
                                key={memory.id}
                                onClick={() => navigate(`/echo/${memory.id}`)}
                            >
                                <p className="dashboard-memory-date">
                                    {memory.date}
                                </p>
                                <h3>{memory.title}</h3>
                                <p>{memory.content}</p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Dashboard