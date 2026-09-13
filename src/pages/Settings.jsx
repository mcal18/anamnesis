import { useNavigate } from 'react-router-dom'
import {
    exportUserData,
    deleteUserData,
    reauthenticateUser,
    deleteUserAccount,
} from '../services/memoryService'
import { auth } from '../services/firebase'

import './Settings.css'

function Settings() {
    const navigate = useNavigate()

    const handleExportData = async () => {
        if (!auth.currentUser) {
            return
        }

        try {
            const data = await exportUserData(auth.currentUser.uid)

            const file = new Blob(
                [JSON.stringify(data, null, 2)],
                { type: 'application/json' }
            )

            const url = URL.createObjectURL(file)
            const link = document.createElement('a')
            link.href = url
            link.download = 'anamnesis-data.json'

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error exporting data:', error)
        }
    }

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This will permanently delete all of your memories, reflections, and account data.'
        )

        if (!confirmed) {
            return
        }

        const password = window.prompt(
            'Enter your password to confirm account deletion:'
        )

        if (!password) {
            return
        }

        try {
            await reauthenticateUser(password)
            await deleteUserData(auth.currentUser.uid)
            await deleteUserAccount()

            navigate('/login')
        } catch (error) {
            console.error('Error deleting account:', error)
        }
    }

    return (
        <section className="settings-page">
            <div className="settings-header">
                <p className="settings-eyebrow">ACCOUNT</p>
                <h1>Settings</h1>
                <p >
                    Manage your account and your data.
                </p>
            </div>

            <div className="settings-section">
                <h2>Your data</h2>

                <div className="settings-actions">
                    <button
                        type="button"
                        onClick={handleExportData}
                    >
                        Export My Data
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Settings