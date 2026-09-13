import { useState } from "react"
import { createFutureLetter } from "../services/memoryService"
import { auth } from "../services/firebase"

import TextArea from "../components/TextArea"

import './FutureMe.css'

function FutureMe() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [unlockDate, setUnlockDate] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title.trim() || !content.trim() || !unlockDate) {
            return
        }

        if (!auth.currentUser) {
            return
        }

        try {
            await createFutureLetter(auth.currentUser.uid, {
                title,
                content,
                unlockDate,
            })
            console.log('Future Me letter saved successfully')
            setSuccessMessage('Your letter has been sealed for the future.')

            setTitle('')
            setContent('')
            setUnlockDate('')
        } catch (error) {
            console.error('Error saving Future Me letter:', error)
        }
    }

    return (
        <section className="future-me-page">
            <div className="future-me-header">
                <p className="future-me-eyebrow">IMAGINE</p>
                <h1>Future Me</h1>
                <p className="future-me-description">
                    Leave something behind for the person your are becoming.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="future-title">Title</label>
                    <input
                        id="future-title"
                        type="text"
                        value={title}
                        required
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="A letter to my future self"
                    />
                </div>

                <div>
                    <label htmlFor="future-content">Message</label>
                    <TextArea
                        value={content}
                        required
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="What do you want your future self to remember?"
                        rows={8}
                    />
                </div>

                <div>
                    <label htmlFor="future-unlock">Unlock date</label>
                    <input
                        id="future-unlock"
                        type="date"
                        value={unlockDate}
                        required
                        onChange={(event) => setUnlockDate(event.target.value)}
                    />
                </div>

                <button type="submit">
                    Seal for the Future
                </button>

                {successMessage && (
                    <p>{successMessage}</p>
                )}
            </form>
        </section>
    )
}

export default FutureMe