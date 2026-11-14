import React from 'react'
import  "../auth.form.scss"
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/use.auth'

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const {loading, handleRegister} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        
        try {
            await handleRegister({email, username, password});
            navigate("/");
        } catch (err) {
            // Handle specific error cases
            if (err.response?.status === 409) {
                setError("User already exists with this email or username");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed. Please try again.");
            }
        }
    }

  return (
      <main>
            <div className="form-container">
                <h1>Register</h1>

                {error && (
                    <div className="error-message" style={{
                        padding: '10px',
                        marginBottom: '15px',
                        backgroundColor: '#fee',
                        border: '1px solid #fcc',
                        borderRadius: '4px',
                        color: '#c33'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button type="submit" className='button primary-button' disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
  )
}

export default Register