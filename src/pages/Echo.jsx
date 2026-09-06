import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMemory, createReflection } from "../services/memoryService"
import { auth } from "../services/firebase"

function Echo() {
    const { memoryId } = useParams()
    const [memory, setMemory] = useState(null)
    const [reflection, setReflection] = useState('')
    const [successMessage, setSuccessMessge] = useState('')

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
                setMemory(savedMemory)
            } catch (error) {
                console.error('Error loading memory:', error)
            }
        }
        loadMemory()
    }, [memoryId])

    if (!memory) {
        return <p>Loading memory...</p>
    }

    return (
        <section>
            <h1>A memory has returned to you.</h1>

            <p>You wrote this on {memory.date}</p>
            <p>It returned to you on {memory.unlockDate}</p>
            <h2>{memory.title}</h2>
            <p>{memory.content}</p>
            {memory.whyItMattered && (
                <div>
                    <h3>Why it mattered then</h3>
                    <p>{memory.whyItMattered}</p>
                </div>
            )}

            <form onSubmit={handleReflectionSubmit}>
                <h3>What would you tell yourself now?</h3>

                <textarea
                    rows="6"
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
        </section>
    )
}

export default Echo