import React, {useEffect} from 'react'
import './Landing.css'
import jwt from 'jwt-decode';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'


function Landing() {
    const nav = useNavigate()
    const [name, setName] = useState('')
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

    async function registerUser(event) {
      event.preventDefault()
      const response = await fetch('http://localhost:1898/api/register',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        
      const data = await response.json()
      console.log(data)
      if(data.registered){
        alert('Registered Successfully')
        window.location.href = '/'
      }
      else if(data.status='emailerr'){
        alert('Invalid Email Address. Please enter an email address with the domain @vitstudent.ac.in');
      }
      else{
        alert('User already exists. Please login')
        window.location.href = '/'
      }
    }
    return(
        <motion.div initial={{opacity:0,width:0}} animate={{opacity:1,width:"100%"}} exit={{opacity:0,x:window.innerWidth}} className="parent-container" >
            <div className="login-card">
                <div className="card-container">
                <img src="https://pbs.twimg.com/profile_images/1477930785537605633/ROTVNVz7_400x400.jpg" alt=""/>
                <h2>Welcome To</h2>
                <h1>CodeChef VIT</h1>
                <h3>Register as an Admin User</h3>
                <form onSubmit={registerUser}>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" required/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
                    <input type="submit" value="Register" />
                </form>
                <Link className="redirect" to="/">Already a User? Login Now</Link> 
                </div>
            </div>
        </motion.div>
    )
}

export default Landing;