import React, { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import NavBar_Inner from "../NavBar_Inner";

export default function UpdateUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [ID, setID] = useState();
  const [moduleId, setModuleId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [validity, setValidity] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Validation states
  const [errors, setErrors] = useState({
    moduleId: "",
    categoryId: "",
    subcategoryId: "",
    title: "",
    description: "",
    seller: "",
    priority: "",
    type: "",
    validity: "",
    review: "",
    rating: "",
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
          "http://localhost:5000/advertisement/editAdvertisement/" + id
        );
        console.log(response);
        setID(response.data._id);
        setModuleId(response.data.moduleId);
        setCategoryId(response.data.categoryId);
        setSubcategoryId(response.data.subcategoryId);
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

  // Validation function
  const validateForm = () => {
    let formErrors = {};

    if (!moduleId) formErrors.moduleId = "Module is required.";
    if (!categoryId) formErrors.categoryId = "Category is required.";
    if (!subcategoryId) formErrors.subcategoryId = "Subcategory is required.";
    if (!title) formErrors.title = "Title is required.";
    if (!seller) formErrors.seller = "Seller is required.";
    if (!type) formErrors.type = "Type is required.";
    if (!description) formErrors.description = "Description is required.";
    if (!priority) formErrors.priority = "Priority is required.";
    if (!validity) formErrors.validity = "Validity is required.";
    if (!review) formErrors.review = "Review is required.";
    if (!rating) formErrors.rating = "Rating is required.";
    if (!file) formErrors.file = "Image file is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

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
        "http://localhost:5000/advertisement/editAdvertisement/" + id,
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

    navigate("/advertisement");
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
                        </div>
                      </div>
                      <div className="row">
                        {/* Module Name */}
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

                        {/* Category */}
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Category</label>
                            <select
                              className="form-control"
                              value={categoryId}
                              onChange={(e) => setCategoryId(e.target.value)}
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option
                                  key={categoryId._id}
                                  value={category._id}
                                >
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

                        {/* Subcategory */}
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Subcategory</label>
                            <select
                              className="form-control"
                              value={subcategoryId}
                              onChange={(e) => setSubcategoryId(e.target.value)}
                            >
                              <option value="">Select Subcategory</option>
                              {subcategories.map((subcategory) => (
                                <option
                                  key={subcategoryId._id}
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
                            {errors.title && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.title}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Seller <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Seller"
                              value={seller}
                              onChange={(e) => setSeller(e.target.value)}
                            />
                            {errors.seller && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.seller}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Type<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Type"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                            />
                            {errors.type && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.type}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Description<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Description"
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

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Priority <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Priority"
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                            />
                            {errors.priority && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.priority}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Validity<span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Validity"
                              value={validity}
                              onChange={(e) => setValidity(e.target.value)}
                            />
                            {errors.validity && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.validity}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Review<span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Review"
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                            />
                            {errors.review && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.review}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Rating<span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            />
                            {errors.rating && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.rating}
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
