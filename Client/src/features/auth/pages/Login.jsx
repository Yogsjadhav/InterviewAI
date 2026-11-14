import React from 'react'
import  "../auth.form.scss"
import "../../../style.scss"
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import {useAuth} from "../hooks/use.auth"


const Login = () => {

    const navigate = useNavigate()

    const {loading, handleLogin} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setError("") // Clear previous errors
        
        try {
            await handleLogin({email,password})
            navigate("/")
        } catch (err) {
            // Handle specific error cases
            if (err.response?.status === 401) {
                setError("Invalid email or password");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        }
    }

    if(loading){
        return(
            <main><h1>Loading ....</h1></main>
        )
    }

  return (
     <main>
            <div className="form-container">
                <h1>Login</h1>
                
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
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
  )
}

export default Login