import { useState } from 'react'
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

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('Memory submitted:', formData)
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