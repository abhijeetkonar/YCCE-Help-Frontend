import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        axios.post(`https://ycce-help-backend.onrender.com/user/signup`, { username, email, password })
            .then(res => {
                const token = res.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('isLoggedIn', true);
                toast.success('Register Successfully!')
                navigate('/')
            }).catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
            })
    }
    return (
        <div className="w-screen h-screen bg-[#1a1a1a] text-[#ffffff] lg:flex lg:justify-between lg:items-center">
            <div className="pt-14 ml-16 lg:ml-72 lg:pt-0">
                <h1 className="text-3xl lg:text-5xl font-bold">Sign Up to</h1>
                <h1 className="text-3xl lg:text-5xl lg:mt-3 font-bold">Join Community</h1>
                <p className="mt-4 lg:mt-8">if you already have an account</p>
                <p>you can <Link to={"/signin"}><span className="text-lg lg:text-xl font-semibold text-secondary lg:cursor-pointer">Sign In here!</span></Link></p>
            </div>
            <div className='pt-8 ml-12 lg:mr-72'>
                <form className='lg:flex-col' action="" onSubmit={handleSubmit}>
                    <input name="username" className='w-64 block my-4 bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='text' placeholder='Enter username' />
                    <input name="email" className='w-64 block my-4 bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='email' placeholder='Enter email' />
                    <input name="password" className='w-64 block mt-4 mb-2 bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='password' placeholder='Enter password' />
                    <button className='w-64 block my-6 font-bold bg-secondary px-4 py-2 text-[#000] rounded-lg' type='submit'>Register</button>
                </form>
                {/* <div className='w-64 flex justify-center font-bold'>
                    OR
                </div>
                <button className='flex justify-center gap-2 w-64 my-6 font-bold bg-[#EAF0F7] px-4 py-2 text-[#000] rounded-lg' type='submit'>Continue with <img src="./googleLogo.png" /> </button> */}
            </div>
            
        </div>
    )
}

export default SignUp;