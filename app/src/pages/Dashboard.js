import React, {useEffect} from 'react' 
import jwt from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

function Dashboard() {
    const nav = useNavigate()

    async function auth(token){
      const response = await fetch('http://localhost:1898/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      })
      const res = await response.json()
      if(!res.user){
        localStorage.removeItem('SavedToken')
        nav('/', {replace:true})
      }
    }
    useEffect(() => {
        const token = localStorage.getItem('SavedToken')
        if(token){
          auth(token)
        }
        else{
          nav('/', {replace:true})
        }
      }, []
      )
      return(
        <h1>HAHAHAHAH</h1>
      )
}

export default Dashboard