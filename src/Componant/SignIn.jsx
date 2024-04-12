import React, { useContext, useState } from 'react'
import notesImg from '../../src/Assets/Imges/images/notes1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import {  authcontext } from './AuthContext'
export default function SignIn() {


  const {setueserislogin ,userislogin} = useContext(authcontext)

  const navigat = useNavigate()

  const [isloding , setisloding]=useState(false)

  const [ErrorMsg, setErrorMsg]=useState('')

    let validtwo = yup.object({
      email:yup.string().required('Email is Valid').matches(/[a-zA-Z0-9]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gi,"not valid enter valid Email"),
      password:yup.string('password is Valid').matches(/^[A-Z]{2}[0-9]{1,6}$/gi,"not valid enter valid password")
      
    })
  let formiktwo =useFormik({
    initialValues :{
      email:'',
      password:'',
    },
    onSubmit: async(values)=>{
      setisloding(true)
      
      try {
        setisloding(false)
        let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values);
        console.log(data);
      setErrorMsg('')
      if (data.msg==='done') {
        setueserislogin(true)
        if (window.location.pathname == "/Login") {
          navigat('/Home')
        }else{
          navigat(window.location.pathname)
        }
        navigat('/Home')

        localStorage.setItem('Usertoken',data.token)
      }
      
      } catch (error) {
        console.log(error);
      setErrorMsg(error.response.data.msg);
      }
    },
    validationSchema:validtwo
  })




  return (
    <div>
      <h1>sign in</h1>

      {/* <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">

                  <form onSubmit={formiktwo.handleSubmit}>

                    <input onChange={formiktwo.handleChange} onBlur={formiktwo.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                      {formiktwo.errors.email&&formiktwo.touched.email?<p className=' fs-6 alert alert-danger'> {formiktwo.errors.email} </p>:''}
                    <input onChange={formiktwo.handleChange} onBlur={formiktwo.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                      {formiktwo.errors.password &&formiktwo.touched.password?<p className='alert alert-danger fs-6'>{formiktwo.errors.password}</p>:''}

                      {ErrorMsg? <p className=' fs-6 alert alert-danger'> {ErrorMsg}</p>:""}
                      {isloding?<button className='px-3 text-white bg-success w-100 d-block rounded-2 py-1 '> <i className="fa fa-spin fa-spinner px-3"></i></button> : <button disabled={!(formiktwo.dirty || formiktwo.isValid || formiktwo.isloding)}
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                    Login
                    </button>}

                  </form>
                <Link to={"/"}>
                
                <p>Don't Have Account ? Register Now</p>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

