import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const SignIn = (props) => {

    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        axios.post(`https://ycce-help-backend.onrender.com/user/signin`, { email, password })
            .then(res => {
                const token = res.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('isLoggedIn', true);
                toast.success('Login Successfully!')
                navigate('/')
            }).catch(err => {
                toast.error(err.response.data.message)
            })
    }
    return (
        <div className="w-screen h-screen bg-[rgb(26,26,26)] text-[#ffffff] lg:flex lg:justify-between lg:items-center">
            <div className="pt-14 ml-16 lg:ml-72 lg:pt-0">
                <h1 className="text-3xl lg:text-5xl font-bold">Sign In to </h1>
                <h1 className="text-3xl lg:text-5xl lg:mt-3 font-bold">Get Started </h1>
                <p className="mt-4 lg:mt-8">if you don't have an account</p>
                <p>you can <Link to={"/signup"}><span className="text-lg lg:text-xl font-semibold text-secondary lg:cursor-pointer">Register here!</span></Link></p>
            </div>
            <div className='pt-8 ml-12 lg:mr-72'>
                <form onSubmit={handleSubmit} className='lg:flex-col'>
                    <input name='email' className='w-64 block my-4 bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='email' placeholder='Enter email' />
                    <input name='password' className='w-64 block mt-4 mb-2 bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='password' placeholder='Enter password' />
                    <p className='text-[#b1b1b1] mb-2'>Recover Password?</p>
                    <button className='w-64 block my-6 font-bold bg-secondary px-4 py-2 text-[#000] rounded-lg' type='submit'>Submit</button>
                </form>
                {/* <div className='w-64 flex justify-center font-bold'>
                    OR
                </div>
                <button className='flex justify-center gap-2 w-64 my-6 font-bold bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='submit'>Continue with <img src="./googleLogo.png" /> </button> */}
            </div>
        </div>
    )
}

export default SignIn;