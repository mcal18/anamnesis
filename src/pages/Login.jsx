import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('Login successful')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="login-page">
            <div className="login-content">
                <p className="login-eyebrow">RETURN</p>

                <h1>Welcome back</h1>

                <p className="login-description">
                    Your memories are waiting for you.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button className="login-submit" type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Login