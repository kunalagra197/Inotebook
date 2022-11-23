import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote';
import { NotesItem } from './NotesItem';
import {useNavigate} from 'react-router-dom'
export const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
    getNote()
    }
    else{
    navigate('/login')
      }

  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  
  }
  const handleClick = () => {
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
    // addNote(note.title,note.description,note.tag);
  }
  const onChange = (e) => {
    return setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* useref is used to refer the DOM the element  */}
      {/* useState is a hook which re-render itself causing an infinite loop but useref doesnt */}
      <button ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 my-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>

              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required/>
              </div>

            </div>
            <div className="modal-footer">
              <button ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>

          </div>
        </div>
      </div>
      <div className='container my-3'>
        <h2 className='my-3'>Your Notes</h2>
        <div className="container">
        {notes.length===0 && "No notes to display"}
        </div>
        <div className='row'>
          {notes.map((note) => {
            return <NotesItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert}/>
          })}
        </div>
      </div>
    </>
  )
}