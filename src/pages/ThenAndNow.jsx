import { useEffect, useState } from "react"
import { getReflectionsForMemory, getUserMemories } from "../services/memoryService"
import { auth } from "../services/firebase"

import './ThenAndNow.css'

function ThenAndNow() {
    const user = auth.currentUser
    const [memories, setMemories] = useState([])
    const [loading, setLoading] = useState(true)
    const [reflections, setReflections] = useState({})

    useEffect(() => {
        const loadMemories = async () => {
            if (!user) {
                setLoading(false)
                return
            }

            try {
                const savedMemories = await getUserMemories(user.uid)
                setMemories(savedMemories)

                const reflectionsEntries = {}

                for (const memory of savedMemories) {
                    const memoryReflections = await getReflectionsForMemory(
                        memory.id,
                        user.uid
                    )

                    reflectionsEntries[memory.id] = memoryReflections
                }

                setReflections(reflectionsEntries)
                setLoading(false)
            } catch (error) {
                console.error('Error loading memories:', error)
                setLoading(false)
            }
        }

        loadMemories()
    }, [user])

    if (loading) {
        return <p>Loading memories...</p>
    }

    return (
        <section className="then-and-now-page">
            <div className="then-and-now-header">
                <p className="then-and-now-eyebrow">REFLECT</p>
                <h1>Then & Now</h1>
                <p className="then-and-now-description">
                    See what has changed between the person you were and the person you are becoming.
                </p>
            </div>

            {memories.length === 0 ? (
                <p>No memories yet.</p>
            ) : (
                <div className="then-and-now-list">
                    {memories.map((memory) => (
                        <article key={memory.id}>
                            <h2>{memory.title}</h2>

                            <div>
                                <h3>Then</h3>
                                <p>{memory.content}</p>
                            </div>

                            {reflections[memory.id]?.length > 0 && (
                                <div>
                                    <h3>Now</h3>
                                    {reflections[memory.id].map((reflection) => (
                                        <p key={reflection.id}>
                                            {reflection.content}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}

            <button
                className="then-and-now-back"
                onClick={() => window.history.back()}
            >
                Back
            </button>
        </section>
    )
}

export default ThenAndNow