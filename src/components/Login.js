import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


export const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        return setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json=await response.json();
        console.log(json)
        if(json.success)
        {
            // saving the token and redirecting
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in successfully","success")
            navigate('/')
        }
        else
        {
            props.showAlert("Invalid credentials","danger")
        }
        
     }

    return (
        <div className="container">
            <h2 className=''>Login to Continue</h2>
            <form onSubmit={handleSubmit} className='my-5'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
