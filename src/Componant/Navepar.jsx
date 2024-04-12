import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  authcontext } from './AuthContext'
import { useRecoilState } from 'recoil'
import { NoteState } from './Atoms/Notestate'

export default function Navepar() {
  const {userislogin ,setueserislogin} = useContext(authcontext)
  
 let [Notelenght ,setNotelenght] =useRecoilState(NoteState)
  const navigate = useNavigate()

  function LogOut(){
    setueserislogin(false)
  localStorage.removeItem('Usertoken')
    navigate('/Login')
  }
  
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-text-body-secondary text-dark fw-bold fixed-top align-items-center d-flex justify-content-center position-fixed ">
  <div className="container-fluid">
    <h3><i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <span className="ps-2 fs-4 fw-bold">Notes</span></h3>
    
  
 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">

   {userislogin &&( <ul className="navbar-nav m-auto ">
 

<li className="nav-item">
  <Link className="nav-link active" aria-current="page" to="Home">Home</Link>
</li>

<li className="nav-item">
</li>

<div className='position-relative ms-3'>
<i className="fa-solid fa-note-sticky fa-2x text-success  "> 
<span className='position-absolute fs-6 text-dark'>:{Notelenght}</span>
</i>
</div>

</ul>)}
  

{userislogin ? (
            <li className="nav-item ms-3 list-unstyled ">
              <span onClick={LogOut} className="nav-link fw-bold  ">
                <Link to="#" className="list-unstyled nav-link fw-bold">
                  Logout
                </Link>
              </span>
            </li>
          ) : (
            <>
            
            </>
          )}


    </div>
  </div>
</nav>
    </>
  )
}
