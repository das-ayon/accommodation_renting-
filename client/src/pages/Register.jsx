import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    async function userRegister(ev){
        ev.preventDefault();
        
        try {
          const response = await axios.post('/register', {name,email,password});
          // Handle the response
          console.log('Response:', response.data);
          alert('Registration Successfull, Now you can login');
        } catch (error) {
          // Handle errors
          alert("Error in registration");
        }
        
    }

  return (
    <div className='mt-8 pt-16  justify-around'>
        <div className='justify-around item-center'>
        <h1 className='text-2xl font-bold text-center'>REGISTER</h1>
    
        <form action="" onSubmit={userRegister} className='max-w-md mx-auto my-6 '>
            <input type="text" placeholder={'Name'} value={name} onChange={ev=>setName(ev.target.value)} />
            <input type="email" placeholder={'example123@gmail.com'} value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <input type="Password" placeholder={'password'} value={password} onChange={ev=>setPassword(ev.target.value)} />
            <button className='button2'>Register</button>
        
        <div className=' text-center mt-2 text-gray-500'>
            Alreay a member? <Link className='underline text-black' to={'/Login'}>Login</Link>
        </div>
        </form>
       </div>
    </div>
  )
}
