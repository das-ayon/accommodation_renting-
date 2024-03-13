import { useContext, useState } from 'react'
import Header from '../Header'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../UserContext';


export default function LoginPage() {
  
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser}=useContext(userContext)

  async function handleLogin(ev){
    ev.preventDefault();
    
    //------------------------------------------------------{withCredentials:true}
     try {
      const {data} = await axios.post('/login', {email,password} );
      setUser(data);
      alert('LOgin successful...');
      setRedirect(true);
    } catch (error) {
      
      alert('Login failed');
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }


  return (
   
    <div className='mt-8 pt-16  justify-around'>
        <div className='justify-around item-center'>
        <h1 className='text-2xl font-bold text-center'>LOGIN FORM</h1>
    
        <form  target="" className='max-w-md mx-auto my-6 ' onSubmit={handleLogin}>
            <input type="email" placeholder={'example123@gmail.com'} value={email} onChange={ev=>setEmail(ev.target.value)}/>
            <input type="Password" placeholder={'password'} value={password} onChange={ev=>setPassword(ev.target.value)} />
            <button className='button2'>Login</button>
        
        <div className=' text-center mt-2 text-gray-500'>
            don't have an account? <Link className='underline text-black' to={'/Register'}>Register</Link>
        </div>
        </form>
       </div>
    </div>
    
  )
}
