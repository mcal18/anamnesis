import { useEffect, useState } from "react";
import {
    getUserProfile,
    exportUserData,
    deleteUserData,
    reauthenticateUser,
    deleteUserAccount,
} from '../services/memoryService'
import { auth } from "../services/firebase";

import profileMoth from '../assets/anamnesis-moth.png'
import './SettingsModal.css'

function SettingsModal({ onClose }) {
    const [profile, setProfile] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(true)

    useEffect(() => {
        const loadProfile = async () => {
            if (!auth.currentUser) {
                setLoadingProfile(false)
                return
            }

            try {
                const userProfile = await getUserProfile(auth.currentUser.uid)
                setProfile(userProfile)
            } catch (error) {
                console.error('Error loading profile:', error)
            } finally {
                setLoadingProfile(false)
            }
        }

        loadProfile()
    }, [])

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

            onClose()
        } catch (error) {
            console.error('Error deleting account:', error)
        }
    }

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [onClose])

    return (
        <div
            className="settings-modal-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <section
                className="settings-modal"
                role="dialog"
                aria-modal="true"
                aria-label="settings-modal-title"
            >
                <button
                    type="button"
                    className="settings-modal-close"
                    onClick={onClose}
                    aria-label="Close settings"
                >
                    x
                </button>

                <div className="settings-header">
                    <p className="settings-eyebrow">ACCOUNT</p>
                    <h1 className="settings-modal-title">Settings</h1>
                    <p>Manage your account and your data.</p>
                </div>

                {!loadingProfile && profile && (
                    <div className="settings-profile">
                        <img src={profileMoth} alt="Profile avatar" className="settings-profile-avatar" />

                        <div className="settings-profile-info">
                            <h2>Your profile</h2>

                            <p className="settings-profile-name">
                                {profile.displayName}
                            </p>

                            <p className="settings-profile-email">
                                {profile.email}
                            </p>
                        </div>
                    </div>
                )}

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
        </div>
    )
}

export default SettingsModal