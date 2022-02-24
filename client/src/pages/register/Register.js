import { useState } from "react"
import "./register.css"
import axios from 'axios'

export default function Register() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword ] = useState('')
  const [error,setError] = useState(false)

  const handleUsername=(e)=>{
    setError(false)
    setUsername(e.target.value)
  }
  const handleEmail=(e)=>{
    setError(false)
    setEmail(e.target.value)
  }
  const handlePassword=(e)=>{
    setError(false)
    setPassword(e.target.value)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register',{
        username,email,password
      })
      console.log(res)
      res.data && window.location.replace('/login') 
    } catch (error) {
      setError(true)
      console.log(error);
    }
    setUsername('')
    setEmail('')
    setPassword('')
  }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text"  onChange={handleUsername} placeholder="Enter your username..." />
        <label>Email</label>
        <input className="registerInput" type="email"  onChange={handleEmail} placeholder="Enter your email..." />
        <label>Password</label>
        <input className="registerInput" type="password"  onChange={handlePassword} placeholder="Enter your password..." />
        <button className="registerButton" type='submit'>Register</button>
      </form>
        {/* <button className="registerLoginButton">Login</button> */}
        {error && <span style={{color:'red',margin:'20px'}}> Something went wrong .. Try again !! </span>}
    </div>
    )
}
