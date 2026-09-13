import { useEffect, useState } from 'react'
import { createMemory, getUserMemories } from '../services/memoryService'
import { auth } from '../services/firebase'
import './Memories.css'


function Memories() {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        content: '',
        whyItMattered: '',
        photo: null,
        unlockDate: '',
    })

    const [successMessage, setSuccessMessage] = useState('')
    const [memories, setMemories] = useState([])
    const [loading, setLoading] = useState(true)

    const loadMemories = async () => {
        if (!auth.currentUser) {
            setLoading(false)
            return
        }

        try {
            const userMemories = await getUserMemories(auth.currentUser.uid)
            setMemories(userMemories)

            setLoading(false)
        } catch (error) {
            console.error('Error loading memories', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMemories()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!auth.currentUser) {
            console.error('No authenticated user')
            return
        }

        try {
            await createMemory(auth.currentUser.uid, {
                title: formData.title,
                date: formData.date,
                content: formData.content,
                whyItMattered: formData.whyItMattered,
                unlockDate: formData.unlockDate,
                sealed: true,
                opened: false,
            })

            console.log('Memory saved successfully')

            setFormData({
                title: '',
                date: '',
                content: '',
                whyItMattered: '',
                photo: null,
                unlockDate: '',
            })

            setSuccessMessage('Your memory has been sealed.')

            await loadMemories()

        } catch (error) {
            console.error('Error saving memory:', error)
        }
    }

    if (loading) {
        return <p>Loading memories...</p>
    }

    return (
        <section className="memories-page">
            <div className="memories-header">
                <p className="memories-eyebrow">PRESERVE</p>

                <h1>Create a memory</h1>

                <p>
                    Give something from today a place to return to.
                </p>
            </div>

            {successMessage && (
                <p className="memory-success">
                    {successMessage}
                </p>
            )}

            {memories.length > 0 && (
                <div className="saved-memories">
                    <h2>Your memories</h2>

                    {memories.map((memory) => (
                        <article key={memory.id} className="saved-memory">
                            <h3>{memory.title}</h3>
                            <p>{memory.date}</p>
                            <p>{memory.content}</p>
                        </article>
                    ))}
                </div>
            )}

            <form className="memory-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="memory-title">Title</label>
                    <input
                        id="memory-title"
                        type="text"
                        placeholder="A name for this memory"
                        value={formData.title}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                title: event.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="memory-date">Date</label>
                    <input
                        id="memory-date"
                        type="date"
                        value={formData.date}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                date: event.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="memory-content">What happened?</label>
                    <textarea
                        id="memory-content"
                        rows="8"
                        placeholder="Write what you want your future self to remember..."
                        value={formData.content}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                content: event.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="memory-why">Why did it matter?</label>
                    <textarea
                        id="memory-why"
                        rows="5"
                        placeholder="What made this moment worth keeping?"
                        value={formData.whyItMattered}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                whyItMattered: event.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="memory-photo">Add a photo</label>
                    <input
                        id="memory-photo"
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                photo: event.target.files[0],
                            })
                        }
                    />
                    <span className="form-help">
                        Optional. Choose a photo that belongs to this memory.
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="memory-unlock">When should this return to you?</label>
                    <input
                        id="memory-unlock"
                        type="date"
                        value={formData.unlockDate}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                unlockDate: event.target.value,
                            })
                        }
                    />
                </div>

                <button className="memory-submit" type="submit">
                    Seal Memory
                </button>
            </form>
        </section>
    )
}

export default Memories