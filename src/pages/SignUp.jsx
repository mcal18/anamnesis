import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase'
import './SignUp.css'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            console.log('Account created successfully')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="signup-page">
            <div className="signup-content">
                <p className="signup-eyebrow">BEGIN</p>

                <h1>Create your account</h1>

                <p className="signup-description">
                    Your memories belong to you.
                </p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="signup-email">Email</label>
                        <input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="signup-password">Password</label>
                        <input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p className="signup-error">
                            {error}
                        </p>
                    )}

                    <button className="signup-submit" type="submit">
                        Create Account
                    </button>
                </form>
            </div>
        </section>
    )
}

export default SignUp