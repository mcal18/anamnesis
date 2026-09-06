import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUnlockedMemories, markMemoryAsOpened } from "../services/memoryService"
import { auth } from "../services/firebase"
import './Capsules.css'

function Capsules() {
    const [memories, setMemories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const loadUnlockedMemories = async () => {
            if (!auth.currentUser) {
                return
            }

            try {
                const unlockedMemories = await getUnlockedMemories(
                    auth.currentUser.uid
                )

                setMemories(unlockedMemories)
            } catch (error) {
                console.error('Error loading unlocked memories:', error)
            }
        }

        loadUnlockedMemories()
    }, [])

    const handleOpenMemory = async (memoryId) => {
        try {
            await markMemoryAsOpened(memoryId)
            console.log('Memory marked as opened')
            navigate('/echo')
        } catch (error) {
            console.error('Error marking memory as opened:', error)
        }
    }

    return (
        <section className="capsule-page">
            <div className="capsules-header">
                <p className="capsules-eyebrow">RETURN</p>

                <h1>Time Capsules</h1>

                <p>Memories that have made their way back to you.</p>
            </div>

            {memories.length === 0 ? (
                <div className="capsules-empty">
                    <p>No memories have returned yet.</p>
                    <span>
                        When one is ready, it will be waiting here.
                    </span>
                </div>
            ) : (
                <div className="capsules-list">
                    {memories.map((memory) => (
                        <article
                            key={memory.id}
                            className="capsule"
                        >
                            <h2>{memory.title}</h2>
                            <p>{memory.content}</p>
                            {memory.whyItMattered && (
                                <div className="capsule-meaning">
                                    <h3>Why it mattered</h3>
                                    <p>{memory.whyItMattered}</p>
                                </div>
                            )}
                            <div className="capsule-dates">
                                <span>
                                    Sealed on {memory.date}
                                </span>
                                <span>
                                    Returned on {memory.unlockDate}
                                </span>
                            </div>
                            <button
                                className="capsule-open"
                                onClick={() => handleOpenMemory(memory.id)}
                            >
                                Open memory
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default Capsules