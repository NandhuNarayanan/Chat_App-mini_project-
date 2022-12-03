import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Add from '../image/add_image.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function Login() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')

    } catch (error) {
      console.log('true', error)
      setErr(true)
    }

  }



  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Engage App</span>
            <span className='title'>Login</span>

            <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email'/>
            <input type='password' placeholder='Password' />
            <button>Sign in</button>
            {err && <span>Something went wrong</span>}

            </form>
            <p>You do have an account? <Link to='/register'>Sign up</Link> </p>
        </div>
    </div>
  )
}

export default Login