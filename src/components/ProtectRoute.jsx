import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectRoute = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin');
        }
    });
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default ProtectRoute