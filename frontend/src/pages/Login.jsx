import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import eventManagerLogo from '../assets/eventManager.png'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
    const handleSumbit = async (e) => {
        e.preventDefault()
         
        if (!values.email || !values.password) {
            alert('Veuillez remplir tous les champs')
            return
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(values.email)) {
            alert('Veuillez entrer un email valide')
            return
        }
        
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values)
            if(response.status === 201) {
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }
        } catch(err) {
            console.error('Login error:', err)
            if (err.response) {
                alert(err.response.data.message || 'Erreur de connexion')
            } else {
                alert('Erreur de connexion au serveur')
            }
        }
    }
  return (
    <div className='min-h-screen flex justify-center items-center' style={{background: '#171E26'}}>
        <div className='w-full py-16' style={{backgroundColor: '#24303C'}}>
            <div className='flex justify-center mb-12'>
                <div 
                    style={{
                        borderRadius: '20px',
                        background: `url(${eventManagerLogo}) lightgray -53.011px -143.565px / 146.389% 463.321% no-repeat`,
                        width: '255.09px',
                        height: '81px',
                        flexShrink: 0,
                        aspectRatio: '255.09/81.00'
                    }}
                >
                </div>
            </div>
            
            <div className='max-w-sm mx-auto'>
                <form onSubmit={handleSumbit} className='space-y-8'>
                    <div>
                        <input type="email" placeholder='Adresse mail' className='w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors' name="email" onChange={handleChanges} />
                    </div>
                    <div>
                        <input type="password" placeholder='Mot de passe' className='w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors' name="password" onChange={handleChanges} />
                    </div>
                    
                    <div className='pt-8 flex justify-center'>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-colors">CONNEXION</button>
                    </div>
                </form>
                
                <div className="text-center mt-12">
                    <div className='flex justify-center space-x-8'>
                        <span className='text-gray-400 text-sm'>Mot de passe oublié ?</span>
                        <Link to='/register' className='text-gray-400 text-sm hover:text-orange-400 transition-colors'>Pas de compte ?</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login