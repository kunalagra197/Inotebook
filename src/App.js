import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home.js'
import About from './components/About.js'
import Navbar from './components/Navbar.js'
import NoteState from './context/notes/NoteState'
import  Alert  from './components/Alert.js';
import { Login } from './components/Login.js';
import { Signup } from './components/Signup.js';
const App=()=>{
  const [alert,setAlert]=useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
      <Router>
         <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
         <div className="container">
          <Routes>
            < Route exact path="/" element={<Home showAlert={showAlert}/>}/>
            < Route exact path="/about" element={<About showAlert={showAlert}/>}/>
            < Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            < Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
            


          </Routes>
          </div>
        </Router>
        </NoteState>
    </>
  )
}

export default App