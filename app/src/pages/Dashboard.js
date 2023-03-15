import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
    const nav = useNavigate()
    const [data,setData]=useState([]);

    function logOut(){
      localStorage.removeItem('SavedToken')
      nav('/', {replace:true})
    }

    async function getUser(){
      const response = await fetch('http://localhost:1898/api/allUsers', {
        method: 'GET'
      })
      const data = await response.json()
      setData(data.data)
      console.log(Date())
    }

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
          getUser()
        }
        else{
          nav('/', {replace:true})
        }
      }, []
      )
      return(
        <div className="dash">
          <div className="user-card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered On</th>
                  <th>Last Logged In</th>
                </tr>
              </thead>
              <tbody>
                {data.map(i=>{
                  return(
                    <tr key={i.email}>
                      <td>{i.name}</td>
                      <td>{i.email}</td>
                      <td>{i.regDate}</td>
                      <td>{i.logDate}</td>
                    </tr>
                  )
                })}
              </tbody>
              
            </table>
          </div>
          <button type="button" className="logout-btn" onClick={logOut}>
            Logout
          </button>
          
        </div>
      )
}

export default Dashboard