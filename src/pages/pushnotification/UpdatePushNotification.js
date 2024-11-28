import React, { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import NavBar_Inner from "../NavBar_Inner";

export default function UpdatePushNotification() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { id } = useParams();

  const [ID, setID] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [seller, setSeller] = useState();
  const [priority, setPriority] = useState();
  const [type, setType] = useState();
  const [validity, setValidity] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState();

  const [file, setFile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pushnotification/editPushnotification/" + id
        );
        console.log(response);
        setID(response.data._id);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setSeller(response.data.seller);
        setPriority(response.data.priority);
        setType(response.data.type);
        setValidity(response.data.validity);
        setReview(response.data.review);
        setRating(response.data.rating);
        setFile(response.data.file);

        //setFileName(response.data.filename);
      } catch (error) {
        //console.log(error)
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("priority", priority);
    formData.append("type", type);
    formData.append("validity", validity);
    formData.append("review", review);
    formData.append("rating", rating);
    formData.append("file", file);

    axios
      .post(
        "http://localhost:5000/pushnotification/editPushnotification/" + id,
        formData
      )
      .then((res) => {
        //  const loginID = res.data._id;
        console.log(res);
        //axios.post('http://43.205.22.150:5000/auth/createAuth', { id,name, email, mobileno })
        //.then(res1=>{ //console.log("---------"+res1);})
        //.catch .catch(err1=>{ //console.log("-------"+err1);})

        toast.success("Record Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
      })
      .catch((err) => {
        toast.error("Somthing is wrong", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
        //console.log(err)
      });

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
    navigate("/pushnotification");
  };

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
                            <img
                              id="blah"
                              className="avatar"
                              src="../assets/img/profiles/avatar-14.jpg"
                              alt="profile-img"
                            />
                          </div>
                          <div className="add-profile">
                            <h5>Upload a New Photo</h5>
                            <span>Profile-pic.jpg</span>
                          </div>
                        </div>
                        <div className="img-upload">
                          <label className="btn btn-upload">
                            Upload <input type="file" />
                          </label>
                          <a className="btn btn-remove">Remove</a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Title <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Description <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Seller <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Seller"
                              name="seller"
                              value={seller}
                              onChange={(e) => setSeller(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="input-block mb-3">
                            <label className="form-label">Priority</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Priority"
                              name="priority"
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Type</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Type"
                              name="type"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Validity</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Validity"
                              name="validity"
                              value={validity}
                              onChange={(e) => setValidity(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Review</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Review"
                              name="review"
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Rating</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Rating"
                              name="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="add-customer-btns text-end">
                      <a
                        href="customers.html"
                        className="btn customer-btn-cancel"
                      >
                        Cancel
                      </a>
                      <button type="submit" className="btn customer-btn-save">
                        Update Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
