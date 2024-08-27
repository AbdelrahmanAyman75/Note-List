import React from 'react'
import { Outlet } from 'react-router-dom'
import Navepar from './Navepar'

export default function Layout() {
  return (
    <>
    
    <Navepar/>
    <div className='container mt-5'>
    <Outlet> </Outlet>
   </div>
    </>
  )
}
