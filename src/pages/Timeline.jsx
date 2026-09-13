import { useEffect, useState } from 'react'
import { getUserMemories } from '../services/memoryService'
import { auth } from '../services/firebase'

import './Timeline.css'

function Timeline() {
    const [memories, setMemories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadMemories = async () => {
            if (!auth.currentUser) {
                setLoading(false)
                return
            }

            try {
                const savedMemories = await getUserMemories(auth.currentUser.uid)

                const sortedMemories = [...savedMemories].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                )

                setMemories(sortedMemories)
                setLoading(false)
            } catch (error) {
                console.error('Error loading timeline:', error)
                setLoading(false)
            }
        }

        loadMemories()
    }, [])

    if (loading) {
        return <p>Loading timeline...</p>
    }

    return (
        <section className="timeline-page">
            <div>
                <p className="timeline-eyebrow">REMEMBER</p>
                <h1>Timeline</h1>
                <p>A record of the moments you chose to keep.</p>
            </div>

            {memories.length === 0 ? (
                <div className="timeline-empty">
                    <p>Your timeline is still waiting.</p>
                    <span>
                        The memories you preserve will appear here.
                    </span>
                </div>
            ) : (
                <div className="timeline-list">
                    {
                        memories.map((memory) => (
                            <article key={memory.id}>
                                <h2>{memory.title}</h2>
                                <p>{memory.date}</p>
                                <p>{memory.content}</p>
                            </article>
                        ))}
                </div>
            )}
        </section>
    )
}

export default Timeline