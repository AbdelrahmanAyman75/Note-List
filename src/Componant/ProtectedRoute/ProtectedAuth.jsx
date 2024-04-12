import React, { useContext } from 'react'
import { authcontext } from '../AuthContext'
import { Navigate } from 'react-router-dom'
import Home from '../Home'

export default function ProtectedAuth({children}) {
  
    const {setuserislogin,userislogin } = useContext(authcontext)
  return (

    <>
    {userislogin?<Navigate to={'/Home'}/>:children}
    </>
  )
}
