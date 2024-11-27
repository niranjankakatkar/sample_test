import React, { useEffect, useState } from 'react'
import { toast, Slide } from "react-toastify";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


import { useParams } from 'react-router-dom'

import NavBar_Inner from "../NavBar_Inner";

export default function UpdateUser() {
  const navigate = useNavigate();
  

  const {id} = useParams();

  const [ID, setID]=useState();
  const [name, setName]=useState();
  const [email, setEmail]=useState();
  const [mobileno, setMobile]=useState();
 
  useEffect(()=>{
      const fetchData= async() =>{
          try {
              const response=await axios.get("http://localhost:5000/user/editUser/" + id);
              console.log(response);
              setID(response.data._id);
              setName(response.data.name);
              setEmail(response.data.email);
              setMobile(response.data.mobileno);
              //setFileName(response.data.filename);
          } catch (error) {
              //console.log(error)
          }
      }
      fetchData();
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobileno', mobileno);
    

   
        axios.post('http://localhost:5000/user/editUser/'+id, formData)
        .then(res => {
          //  const loginID = res.data._id;
            console.log(res);
            //axios.post('http://43.205.22.150:5000/auth/createAuth', { id,name, email, mobileno })
            //.then(res1=>{ //console.log("---------"+res1);})
            //.catch .catch(err1=>{ //console.log("-------"+err1);})

            toast.success('Record Added Successfully', {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Slide,
            });

        })
        .catch(err => {
            toast.error('Somthing is wrong', {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Slide,
            });
            //console.log(err)
        })

       


    /*  axios.post('http://43.205.22.150:5000/user/uploadimg',formData)
      .then(res=>{
          //console.log(res);
         
         
      })
      .catch(err=>{
        
      })*/
    /*
    try {
        const response=fetch("http://43.205.22.150:5000/user/createUser",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result=(await response).json();
        //console.log(result);
        toast.success('Record Added Successfully', {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Slide,
            });
        navigate("/user");
        
       
    } catch (error) {
        //console.log(error.message);
    }finally{
        setFormData({
            name:"",
            email:"",
            mobileno:"",
            password:"",
            activeFlag:""
        })
    }*/
    navigate("/user");
}

 




  
 
    // Creating FormData and appending the form fields
    
    // Send data to the backend via axios
    

  return (
    <>
     <NavBar_Inner />
       <div className="page-wrapper">
            <div className="content container-fluid">
                <div className="card mb-0">
                    <div className="card-body">

                        <div className="page-header">
                            <div className="content-page-header">
                                <h5>Edit Customer</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                    <div className="form-group-item">
                                        <h5 className="form-title">Basic Details</h5>
                                        <div className="profile-picture">
                                            <div className="upload-profile">
                                                <div className="profile-img">
                                                    <img id="blah" className="avatar"
                                                        src="../assets/img/profiles/avatar-14.jpg" alt="profile-img"/>
                                                </div>
                                                <div className="add-profile">
                                                    <h5>Upload a New Photo</h5>
                                                    <span>Profile-pic.jpg</span>
                                                </div>
                                            </div>
                                            <div className="img-upload">
                                                <label className="btn btn-upload">
                                                    Upload <input type="file"/>
                                                </label>
                                                <a className="btn btn-remove">Remove</a>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="input-block mb-3">
                                                    <label>Name <span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
                                                   </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="input-block mb-3">
                                                    <label>Email <span className="text-danger">*</span></label>
                                                    <input type="email" className="form-control"
                                                        placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-12">
                                                <div className="input-block mb-3">
                                                    <label>Phone <span className="text-danger">*</span></label>
                                                    <input type="text" id="mobile_code" className="form-control"
                                                        placeholder="Phone Number" name="name" value={mobileno} onChange={(e) => setMobile(e.target.value)} />
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-12">
                                            <div className="input-block mb-3">
                                                <label className="form-label">Full Address </label>
                                                <textarea type="text" className="form-control" rows="3">{}</textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block mb-3">
                                                <label>Plan Name</label>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block mb-3">
                                                <label>Plan Type</label>
                                               
                                            </div>
                                        </div>

                                        </div>
                                    </div>
                                    
                                    
                                    <div className="add-customer-btns text-end">
                                        <a href="customers.html" className="btn customer-btn-cancel">Cancel</a>
                                        <button type="submit" className="btn customer-btn-save">Update Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
