import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMemory, createReflection, getReflectionsForMemory } from "../services/memoryService"
import { auth } from "../services/firebase"
import './Echo.css'

import TextArea from '../components/TextArea'

function Echo() {
    const { memoryId } = useParams()
    const [memory, setMemory] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [reflection, setReflection] = useState('')
    const [successMessage, setSuccessMessge] = useState('')
    const [savedReflections, setSavedReflections] = useState([])

    const handleReflectionSubmit = async (event) => {
        event.preventDefault()

        if (!reflection.trim()) {
            return
        }

        if (!auth.currentUser) {
            return
        }

        try {
            await createReflection(
                memoryId,
                auth.currentUser.uid,
                reflection
            )

            const updatedReflections = await getReflectionsForMemory(
                memoryId,
                auth.currentUser.uid
            )

            setSavedReflections(updatedReflections)

            console.log('Reflection saved successfully')
            setReflection('')
            setSuccessMessge('Your words have been saved.')
        } catch (error) {
            console.error('Error saving reflection:', error)
        }
    }

    useEffect(() => {
        const loadMemory = async () => {
            try {
                const savedMemory = await getMemory(memoryId)

                if (!savedMemory) {
                    setNotFound(true)
                    return
                }

                setMemory(savedMemory)

                if (auth.currentUser) {
                    const reflections = await getReflectionsForMemory(
                        memoryId,
                        auth.currentUser.uid
                    )

                    setSavedReflections(reflections)
                }
            } catch (error) {
                console.error('Error loading memory:', error)
            }
        }
        loadMemory()
    }, [memoryId])

    if (!memory) {
        if (notFound) {
            return <p>Memory not found.</p>
        }

        return <p>Loading memory...</p>
    }

    return (
        <section className="echo-page">
            <button
                className="echo-back"
                onClick={() => window.history.back()}
            >
                Back
            </button>

            <div className="echo-intro">
                <h1>
                    {memory.type === 'future-letter'
                        ? 'A letter has returned to you'
                        : 'A memory has returned to you.'}
                </h1>
            </div>

            <div className="echo-dates">
                {memory.type === 'future-letter' ? (
                    <>
                        <p>You left this for yourself on {memory.date}</p>
                        <p>You asked it to return on {memory.unlockDate}</p>
                    </>
                ) : (
                    <>
                        <p>You wrote this on {memory.date}</p>
                        <p>It returned to you on {memory.unlockDate}</p>
                    </>
                )}

            </div>

            <div className="echo-memory">
                <h2>{memory.title}</h2>
                <p>{memory.content}</p>
                {memory.whyItMattered && (
                    <div>
                        <h3>Why it mattered then</h3>
                        <p>{memory.whyItMattered}</p>
                    </div>
                )}
            </div>

            <div className="echo-reflection">
                <form onSubmit={handleReflectionSubmit}>
                    <h3>What would you tell yourself now?</h3>

                    <TextArea
                        value={reflection}
                        onChange={(event) => setReflection(event.target.value)}
                        placeholder="Write something to the person you were then..."
                    />

                    {successMessage && (
                        <p>{successMessage}</p>
                    )}

                    <button type="submit">
                        Write Back
                    </button>
                </form>
            </div>

            {savedReflections.length > 0 && (
                <div>
                    <h3>Your words now</h3>

                    {savedReflections.map((savedReflection) => (
                        <div key={savedReflection.id}>
                            <p>{savedReflection.content}</p>
                        </div>
                    ))}
                </div>
            )}

        </section>
    )
}

export default Echo