import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
export const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const navigate = useNavigate();
  const onChange = (e) => {
    return setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    // const {name,email,password}=credentials
    if(credentials.password!==credentials.cpassword)
    {
      return props.showAlert("password does not match","danger")
    }
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name,email: credentials.email, password: credentials.password })
    });
    const json=await response.json();
    console.log(json)
    
     if(json.success)
    {
        // saving the token and redirecting
        localStorage.setItem('token',json.authtoken);
        navigate('/')
        props.showAlert("Accound Created Successfully","success")
    }
    else
    {
        props.showAlert("Invalid Credentials","danger")
    }
    
 }
  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name}  aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name="password" required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Sign Up</button>
</form>
    </div>
  )
}
