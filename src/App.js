import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Componant/Layout'
import Home from './Componant/Home'
import SignUp from './Componant/SignUp'
import SignIn from './Componant/SignIn'
import Notfound from './Componant/Notfound'
import AuthcontextProvider from './Componant/AuthContext'
import { RecoilRoot } from 'recoil'
import ProtectedRoute from './Componant/ProtectedRoute/ProtectedRoute'
import ProtectedAuth from './Componant/ProtectedRoute/ProtectedAuth'

export default function App() {
 let routers=  createHashRouter([{path:'', element:<Layout/>,children:[
    {path:'',element:<Navigate to={'/Home'}/>},
    {path:'signup',element:<ProtectedAuth><SignUp/></ProtectedAuth> },
    {path:'Login',element: <ProtectedAuth><SignIn/></ProtectedAuth>},

{path:'Home' ,element: <ProtectedRoute> <Home/></ProtectedRoute> },

{path:'*',element: <Notfound/>},

]
}])

    return (
    <>
    <RecoilRoot>
    <AuthcontextProvider>
    <RouterProvider router={routers}></RouterProvider>
    </AuthcontextProvider>
    </RecoilRoot>
    </>
    )
}
