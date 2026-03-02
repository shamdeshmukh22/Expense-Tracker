import axios from 'axios';
import React, { useState } from 'react';

export default function Login() {
  
    var[data,setdata]=useState({
        email:'',
        password:''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:1000/login',data).then((res)=>
        {
            if( !res.data || res.data.length==0){
                 alert('insert email and password properly');
                return;
            }
           alert("Login Successful ✅");
        }).catch((er)=>{
            console.log(er);
        });
    };

    const handleChange = (e) => {
           const { name, value } = e.target;

           setdata((prev) => ({
             ...prev,
             [name]: value,
           }));
         };
  
    return (
       <>
       <div className="container-fluid pt-5">
        <div className="row">
            <div className="col-md-12 ">
               <h4 className='alert alert-danger'> login here</h4>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-5 border border-gray rounded p-5 border-3 shadow-lg ">
                   <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control custom-input" 
                                placeholder="name@example.com" 
                                onChange={handleChange}
                                value={data.email} 

                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="form-control custom-input" 
                                placeholder="Enter password" 
                                onChange={handleChange}
                                value={data.password} 
                            />
                        </div>
                        <button type="submit" className="ms-5 btn btn-primary mt-3 w-75 animated-button">
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none small text-muted">Forgot password?</a>
                        <br />
                         <a href="/signup" className="text-decoration-none small text-muted">Sign Up</a>
                    </div>
            </div>
          </div>
        </div>
       
       </>
    )
}
