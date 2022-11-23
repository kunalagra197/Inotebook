import NoteContext from "./noteContext";
import { useState } from "react"
// import { json } from "react-router-dom";
const NoteState = (props) => {

  const localhost = "http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial)
  //  Add a Note
  
  const addNote = async(title, description, tag) => {
    // TO DO API CALL
    const response = await fetch(`${localhost}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
  
    const note=await response.json()
    setNotes(notes.concat(note));
  }
  // Get all notes
  const getNote = async() => {
    // TO DO API CALL
    const response = await fetch(`${localhost}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json();
    console.log(json)
    setNotes(json)

  
  }


  //  Delete a Note
  const deleteNote = async(id) => {
    // console.log("this note with id "+id+"is deleted")
    const response = await fetch(`${localhost}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    })
    console.log(response)
    setNotes(newNote);
  }
  //  Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${localhost}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    const json=await response.json();
    console.log(json)
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState