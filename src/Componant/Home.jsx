import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { NoteState } from './Atoms/Notestate';
import { authcontext } from './AuthContext';
import Note from './Note/Note';
import { Bounce, toast } from "react-toastify";

export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {userislogin , setuserislogin} = useContext(authcontext)
  const [allnots ,setallnots] =useState([])
  const [ErrorMsg, setErrorMsg]=useState('');
  const [Notelenght ,setNotelenght]=useRecoilState(NoteState)
  const [isloding, setisloding]=useState('');



  useEffect(()=>{getuserdata()} ,[])

  let formik = useFormik({
    initialValues :{
      title:'',
      content: ''
    },
    onSubmit: async  (values)=>{
    try {
      console.log(values);
      console.log(`3b8ny__${localStorage.getItem('Usertoken')}`);
      let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{
        headers:{
          token:`3b8ny__${localStorage.getItem('Usertoken')}`
        }
      })
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally{
      handleClose()
   
    }
    
    }
  })

  async  function getuserdata(){
    setisloding(true)
    let res = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
      headers:{
        token:`3b8ny__${localStorage.getItem('Usertoken')}`
      }
      
    })
    
  .then ((res)=>{console.log(res);

    getuserdata();
  setNotelenght(res.data.notes.length);
    setallnots(res.data.notes);

  })
  .catch((error)=>{console.log(error);})

  }

 


  return (
    <>
  {allnots.length > 0?<div className='row '>
      {allnots.map((note)=>{
          return <Note key={note._id} note={note} getuserdata={getuserdata}/>
          })}
      </div>:
      <h2 className='alert alert-warning text-center my-5'> No Note in your List</h2>
      
      }
    
    <Button variant="primary" onClick={handleShow}>
        Add Note +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} >
            <input onChange={formik.handleChange}   className='form-control my-3' type="text" name='title' id='title' placeholder=' Please  Enter title' />
            <textarea onChange={formik.handleChange}  className='form-control my-3'  name="content" id="content" placeholder=' Please  Enter content'  ></textarea>
          </form >
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit} >
          Add Note
          </Button>
        </Modal.Footer>
      </Modal>

   
      

        
    </>
  ) 
}
