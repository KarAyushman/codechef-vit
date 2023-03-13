import React, {useEffect} from 'react'
import './Landing.css'
import jwt from 'jwt-decode';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

function Landing() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('SavedToken')
    if(token) {
      const user = jwt(token)
      if(user) {
        nav('/dashboard', {replace:true})
      }
      else{
        localStorage.removeItem('SavedToken')
      }
    }
    else{
      localStorage.removeItem('SavedToken')
    }
  }, []
  )

  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:1898/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if(data.user){
      alert('User Valid');
      localStorage.setItem("SavedToken", data.user);
      console.log(data.user);
      window.location.href = '/dashboard';
    }
    else{
      alert(data.error);
    }
  }
  return (
    <motion.div initial={{opacity:0,width:0}} animate={{opacity:1,width:"100%"}} exit={{opacity:0,x:window.innerWidth}} className="parent-container" >
      <div className="login-card">
        <div className="card-container">
          <img src="https://pbs.twimg.com/profile_images/1477930785537605633/ROTVNVz7_400x400.jpg" alt=""/>
          <h2>Welcome To</h2>
          <h1>CodeChef VIT</h1>
          <h3>Login to view the Admin Portal</h3>
          <form onSubmit={loginUser}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
            <input type="submit" value="Login" />
          </form>
          <Link className="redirect" to="register">New User? Register Now</Link> 
        </div>
      </div>
    </motion.div>
  )
}

export default Landing;