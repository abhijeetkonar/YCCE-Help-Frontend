import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#262626] text-[#fff] lg:pl-10 pr-2 lg:pr-12 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-col">
          <img src="./logoWithName.png" alt="Logo" className="w-36" />
          <div className='flex justify-center items-center gap-2 mt-4'>
            <p>Developed By : </p>
            <a href="https://www.linkedin.com/in/abhijeet-konar-588ab5223/" target="_blank">
              <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Abhijeet Konar</button></a>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <NavLink to={"/"} className="">Home</NavLink>
          <NavLink to={"/papers"} className="">Question papers</NavLink>
          <NavLink to={"/practicals"} className="">Practicals</NavLink>
        </div>
      </div>
    </footer>
  )
}

export default Footer