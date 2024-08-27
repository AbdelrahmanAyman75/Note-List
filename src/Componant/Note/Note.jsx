import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import { JackInTheBox, Rotate } from 'react-awesome-reveal';

export default function Note({note,getuserdata}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ErrorMsg, setErrorMsg]=useState('');
  const [updateNotes ,setupdateNotes ]=useState('')


  let formik = useFormik({
    initialValues :{
      title:'',
      content: '',
  },
  onSubmit:updateNote
  })
   async function updateNote(values){
    console.log(values);
    console.log(`3b8ny__${localStorage.getItem('Usertoken')}`);
    console.log(note._id);
   let res= await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,values,{
    headers:{
      token:`3b8ny__${localStorage.getItem('Usertoken')}`
    }
   })
   .then((res)=>{
    // console.log(res);
    setupdateNotes()
  })

   .catch((err)=>{console.log(err);})
   .finally(()=>{handleClose()})
  }
  
   
     


      async function delNote(values){
      
       let res= await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,{
        headers:{
          token:`3b8ny__${localStorage.getItem('Usertoken')}`
        }
       })
       .then((res)=>{console.log(res);
        getuserdata()
      })
    
       .catch((err)=>{console.log(err);})
      }
      

  return (
    <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
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
          Update Note
          </Button>
        </Modal.Footer>
      </Modal>
     <div className=" col-md-4 p-3">
    <JackInTheBox>
    <div className='card'>
     <Card >
      <Card.Body>
        <Card.Title className=''> {note.title}</Card.Title>
        <Card.Text>
          {note.content}
        </Card.Text>

        <div className='d-flex justify-content-center justify-content-between'>
        <i className="fa-solid fa-pen-to-square fa-2x text-success  " variant="primary" onClick={handleShow}></i>
          <i onClick={delNote} className="fa-solid fa-trash fa-2x text-danger  "></i>
        </div>
        <p className=' mt-3 h5'> add at:  <span className='text-body-tertiary'>{note.createdAt.slice(0 ,10)}</span></p>
        <p className=' mt-3 h5'> update at:  <span className='text-body-tertiary'>{note.updatedAt.slice(0 ,10)}</span></p>

      </Card.Body>
    </Card>
     </div>
    </JackInTheBox>
     </div>
    </>
  )
}
