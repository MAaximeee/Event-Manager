import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/auth/register', values)
            if(response.status === 201) {
                navigate('/login')
            }
        } catch(err) {
            console.log(err.message)
        }
    }
  return (
    <div className=''>
        <div className=''>
            <h2 className=''>Inscription</h2>
            <form onSubmit={handleSumbit}>
                <div className="">
                    <label htmlFor="username" className=''>Nom D'utilisateur</label>
                    <input type="text" placeholder='Enter Username' className=''
                    name="username" onChange={handleChanges}/>
                </div>
                <div className="">
                    <label htmlFor="email" className=''>Email</label>
                    <input type="email" placeholder='Enter Email' className=''
                    name="email" onChange={handleChanges}/>
                </div>
                <div className="">
                    <label htmlFor="password" className=''>Mot de passe</label>
                    <input type="password" placeholder='Enter Password' className=''
                    name="password" onChange={handleChanges}/>
                </div>
                <button className=" ">Nous rejoindre</button>
            </form>
            <div className="">
                <span>Vous avez déjà un compte?</span>
                <Link to='/login' className=''>Connexion</Link>
            </div>
        </div>
    </div>
  )

    
}

export default Register