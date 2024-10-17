import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [show, setShow] = useState("false");
    const handleMenu = () => {
        setShow("true");
    }
    const handleCross = () => {
        setShow("false");
    }
    return (
        <>
            <nav className="bg-[#262626] sticky top-0 z-50">
                <div className="container pt-2 pl-10 pr-12  mx-auto flex justify-between items-center">
                    <div className="flex items-center pb-2 space-x-4">
                        <img src="./logoWithName.png" alt="Logo" className="w-36" />
                    </div>
                    <div className="text-[#868686] text-lg h-10 font-bold space-x-8 lg:flex hidden">
                        <NavLink to={"/"} className="text-[#868686] hover:text-[#fff] ">Home</NavLink>
                        <NavLink to={"/upload"} className="text-[#868686] hover:text-[#fff]">Upload files</NavLink>
                        <NavLink to={"/papers"} className="text-[#868686] hover:text-[#fff]">Question papers</NavLink>
                        <NavLink to={"/practicals"} className="text-[#868686] hover:text-[#fff]">Practicals</NavLink>
                    </div>
                    {show === "true" &&
                        <div className="absolute flex flex-col top-16 left-0 bg-block w-screen h-64 justify-center items-center gap-5 text-2xl font-bold rounded-2xl lg:hidden ">
                            <img onClick={handleCross} className="w-8 absolute right-5 top-3" src="./cross.png"></img>
                            <NavLink to={"/"} className="text-[#868686] hover:text-[#fff] " onClick={handleCross}>Home</NavLink>
                            <NavLink to={"/upload"} className="text-[#868686] hover:text-[#fff]" onClick={handleCross}>Upload files</NavLink>
                            <NavLink to={"/papers"} className="text-[#868686] hover:text-[#fff]" onClick={handleCross}>Question papers</NavLink>
                            <NavLink to={"/practicals"} className="text-[#868686] hover:text-[#fff]" onClick={handleCross}>Practicals</NavLink>
                        </div>
                    }
                    {isLoggedIn ?
                        <div className='flex gap-2 items-center'>
                            <div className="flex items-center">
                                <NavLink to={"/profile"}><img src="user.png" alt="Profile" className="h-10 w-10 rounded-full" /></NavLink>
                            </div>
                            <div className=' lg:hidden' onClick={handleMenu}><img className="w-8" src="./menu.png"></img></div>
                        </div>
                        :
                        <button className={`w-34 border-2 text-secondary border-secondary px-8 py-2 rounded-2xl`}>
                            <NavLink to={`/signin`}>Sign In</NavLink>
                        </button>
                    }
                </div>
                <div className='bg-[#575757] h-0.5 w-full'></div>
            </nav>
        </>
    )
}

export default Header;
