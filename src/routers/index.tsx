import {createBrowserRouter} from 'react-router-dom'
 
import PublicLayout from '../layouts/PublicLoyout/PublicLoyout'
import Login from '../pages/Login/Login'
import PrivateLayout from '../layouts/PrivateLoyout/PrivateLayout'
import Home from '../pages/Home/Home'
import Enter from '../pages/Enter/index'
import Register from '../pages/Register/Register'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout/>,
        children: [
            {
                index:true,

                path: '/',
                element: <Login/>
            },
        ]
    },
    {
        path: '/',
        element: <PrivateLayout/>,
        children: [
            {
                 
                path: '/home',
                element: <Home/>
            },
            { 
                path: '/check',
                element: <Enter/>
            },
            { 
                path: '/register',
                element: <Register/>
            },
        ]
    },
])