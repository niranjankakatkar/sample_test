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
  const [moduleId, setModuleId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [zone, setZone] = useState("");
  const [sendto, setSendto] = useState("");
  const [description, setDescription] = useState("");
  const [activeFlag, setActiveFlag] = useState(true);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  // Validation states
  const [errors, setErrors] = useState({
    moduleId: "",
    categoryId: "",
    subcategoryId: "",
    title: "",
    zone: "",
    sendto: "",
    description: "",
    file: "",
  });

  useEffect(() => {
    axios
      .get("http://43.205.22.150:5000/subcategory/getAllSubcategory")
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://43.205.22.150:5000/module/getAllModule")
      .then((res) => setModules(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://43.205.22.150:5000/category/getAllCategory")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/pushnotification/editPushnotification/" + id
        );
        console.log(response);
        setID(response.data._id);
        setModuleId(response.data.moduleId);
        setCategoryId(response.data.categoryId);
        setSubcategoryId(response.data.categoryId);
        setZone(response.data.zone);
        setSendto(response.data.sendto);
        setDescription(response.data.description);

        setFile(response.data.file);

        //setFileName(response.data.filename);
      } catch (error) {
        //console.log(error)
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};

    if (!moduleId) formErrors.moduleId = "Module is required.";
    if (!categoryId) formErrors.categoryId = "Category is required.";
    if (!subcategoryId) formErrors.subcategoryId = "Subcategory is required.";
    if (!title) formErrors.title = "Title is required.";
    if (!zone) formErrors.zone = "Zone is required.";
    if (!sendto) formErrors.sendto = "Sendto is required.";
    if (!description) formErrors.description = "Description is required.";
    if (!file) formErrors.file = "Image file is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("title", title);
    formData.append("zone", zone);
    formData.append("sendto", sendto);
    formData.append("description", description);
    formData.append("file", file);

    axios
      .post(
        "http://localhost:5000/pushnotification/editPushnotification/" + id,
        formData
      )
      .then((res) => {
        //  const loginID = res.data._id;
        console.log(res);

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
                          <div className="profile-img company-profile-img">
                            <img
                              id="blah"
                              className="avatar"
                              src={
                                imagePreview ||
                                "assets/img/companies/company-add-img.svg"
                              }
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
                            Upload{" "}
                            <input
                              type="file"
                              accept="image/png,image/jpg,image/jpeg"
                              onChange={handleFileChange}
                            />
                          </label>
                          <a className="btn btn-remove">Remove</a>
                          {errors.file && (
                            <div style={{ color: "red", fontSize: "0.85em" }}>
                              {errors.file}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Module Name</label>
                            <select
                              className="form-control"
                              value={moduleId}
                              onChange={(e) => setModuleId(e.target.value)}
                            >
                              <option value="">Select Module</option>
                              {modules.map((module) => (
                                <option key={module._id} value={module._id}>
                                  {module.module}
                                </option>
                              ))}
                            </select>
                            {errors.moduleId && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.moduleId}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Category Name</label>
                            <select
                              className="form-control"
                              value={categoryId}
                              onChange={(e) => setCategoryId(e.target.value)}
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                  {category.category}
                                </option>
                              ))}
                            </select>
                            {errors.categoryId && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.categoryId}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">
                              Subcategory Name
                            </label>
                            <select
                              className="form-control"
                              value={subcategoryId}
                              onChange={(e) => setSubcategoryId(e.target.value)}
                            >
                              <option value="">Select Subcategory</option>
                              {subcategories.map((subcategory) => (
                                <option
                                  key={subcategory._id}
                                  value={subcategory._id}
                                >
                                  {subcategory.subcategory}
                                </option>
                              ))}
                            </select>
                            {errors.subcategoryId && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.subcategoryId}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Title Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Title"
                              name="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.title}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Zone</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Review"
                              name="zone"
                              value={zone}
                              onChange={(e) => setZone(e.target.value)}
                            />
                            {errors.zone && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.zone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Send to</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Type"
                              name="sendto"
                              value={sendto}
                              onChange={(e) => setSendto(e.target.value)}
                            />
                            {errors.sendto && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.sendto}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Seller</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Seller"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.description}
                              </div>
                            )}
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
