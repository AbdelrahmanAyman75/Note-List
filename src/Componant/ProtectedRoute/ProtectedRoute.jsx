import React, { useContext } from 'react'
import { authcontext } from '../AuthContext'
import SignIn from '../SignIn'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const {setuserislogin,userislogin } = useContext(authcontext)

  return (
    <>
    {userislogin? children:<Navigate to={"/Login"}/> }
    </>
  )
}
