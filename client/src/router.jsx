// create router here
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
import GuestLayout from "./Components/Layouts/GuestLayout";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
]); 

export default router