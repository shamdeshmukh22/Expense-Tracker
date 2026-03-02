import axios from 'axios';
import React, { useState } from 'react';

export default function Signup() {
      var [data,setdata]=useState({
        name:'',
        email:'',
        mobile:'',
        password:'',
       confirmpassword:'',
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.password!=data.confirmpassword){
            alert('confirm password does not match !');
            return
        }
    axios.post('http://localhost:1000/signup',data).then((res)=>{
        console.log(res);
    }).catch((e)=>{
        console.log(e);
    });
console.log(data);
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
               <h4 className='alert alert-danger'> sign up here</h4>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-5 border border-gray rounded p-5 border-3 shadow-lg ">
                   <form onSubmit={handleSubmit}>
                     <div className="mb-3">
                            <label className="form-label">name <span className='text-danger'>*</span></label>
                            <input 
                                type="text" 
                                className="form-control custom-input" 
                                placeholder="your name" 
                                name='name' 
                                 value={data.name}
                                onChange={handleChange}
                            />
                        </div>

                         <div className="mb-3">
                            <label className="form-label">mobile number <span className='text-danger'>*</span></label>
                            <input 
                                type="number" 
                                name='mobile' 
                                className="form-control custom-input" 
                                placeholder="9122323121"  
                                  value={data.mobile}
                                onChange={handleChange}
                            />
                        </div>


                       

                        <div className="mb-3">
                            <label className="form-label">Email address <span className='text-danger'>*</span></label>
                            <input 
                                name='email' 
                                type="email" 
                                className="form-control custom-input" 
                                placeholder="name@example.com"  
                                  value={data.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password <span className='text-danger'>*</span></label>
                            <input 
                                type="password" 
                                name='password'
                                className="form-control custom-input" 
                                placeholder="Enter password"  
                                  value={data.password}
                                onChange={handleChange}
                            />
                        </div>
                          <div className="mb-3">
                            <label className="form-label"> Confirm Password <span className='text-danger'>*</span></label>
                            <input 
                                type="password" 
                                name='confirmpassword'
                                className="form-control custom-input" 
                                placeholder="Enter confirm password"  
                                  value={data.confirmpassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className=" ms-5 btn btn-primary mt-3 w-75 animated-button">
                            sign up
                        </button>
                    </form>
                    <div className="text-center mt-3">
                       
                         <a href="/login" className="text-decoration-none small text-muted"> Already Have Account </a>
                    </div>
            </div>
          </div>
        </div>
       
       </>
    )
}
