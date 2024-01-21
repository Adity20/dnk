// import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { set } from 'mongoose'


export default function SignIn() {
  const [formData,setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData(
      {
        ...formData,
        [event.target.id]:event.target.value 
      }
    )
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return;
    }
    setLoading(false);
    setError(null);
    navigate('/')
    }catch(err){
      setLoading(false);
      setError(err.message);
      console.log(err)
    }
  }
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='E-mail' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading}className='bg-slate-700 text-white p-3 rounded-lg
        uppercase hover:opacity-95 disabled:opacity-100'>
          {loading? 'Loading...':'Sign-In'}</button>
      </form>
      <div className='flex gap-2 mt-5' >
        <p>Don't Have an account?</p>
        <Link to={"/signup"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  )
}
