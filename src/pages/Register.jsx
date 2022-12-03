import React, { useState } from 'react'
import Add from '../image/add_image.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';


function Register() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user.uid);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(
        (error) => {
          console.log('ggggggggg', error);
          setErr(true)
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              photoURL: downloadURL,
              displayName,

            });
            
            await setDoc(doc(db,  "users", res.user.uid), {
              uid: res.user.uid,
              photoURL: downloadURL,    
              displayName,
              email,
            });

            await setDoc(doc(db , "userChats" , res.user.uid),{})
            navigate('/')
            
          });
        }
      );


    } catch (error) {
      console.log('true', error)
      setErr(true)
    }

  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Engage App</span>
        <span className='title'>Register</span>

        <form onSubmit={handleSubmit}>

          <input style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor='file' >
            <img className='img' src={Add} alt='' />
            <span className='avt'>Add an avatar</span>
          </label>
          <input type='text' placeholder='Display Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to='/login'>Sign in</Link> </p>
      </div>
    </div>
  )
}

export default Register