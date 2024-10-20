import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Papers from './pages/Papers';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Practicals from './pages/Practicals';
import AppLayout from './components/AppLayout';
import ProtectRoute from './components/ProtectRoute';
import NotFound from './pages/NotFound'

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/",
            element: <AppLayout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/papers",
                    element: <Papers />,
                },
                {
                    path: "/practicals",
                    element: <Practicals />,
                },
                {
                    path: "/profile",
                    element: <ProtectRoute/>,
                    children: [
                        {
                            path: "/profile",
                            element: <Profile />,
                        },
                    ]
                },
                {
                    path: "/upload",
                    element: <ProtectRoute/>,
                    children: [
                        {
                            path: "/upload",
                            element: <Upload />,
                        },
                    ]
                },
                {
                    path: "*",
                    element: <NotFound />,  
                },
            ]
        },

    ]);
    return <RouterProvider router={router} />;
}

export default App
