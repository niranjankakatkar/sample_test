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
  const [zone, setZone] = useState("");
  const [type, setType] = useState("");
  const [seller, setSeller] = useState("");
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  //  const [file, setFile] = useState(null);

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
    type: "",
    seller: "",
    file: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/subcategory/getAllSubcategory")
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/module/getAllModule")
      .then((res) => setModules(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5000/category/getAllCategory")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/banner/editBanner/" + id
        );
        console.log(response);
        setID(response.data._id);
        setModuleId(response.data.moduleId);
        setCategoryId(response.data.categoryId);
        setSubcategoryId(response.data.subcategoryId);
        setTitle(response.data.title);
        setZone(response.data.zone);
        setType(response.data.type);
        setSeller(response.data.seller);
        // setFile(response.data.file);
      } catch (error) {
        console.log(error);
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
    if (!zone) formErrors.zone = "Zone is required.";
    if (!type) formErrors.type = "Type is required.";
    if (!seller) formErrors.seller = "Seller is required.";
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

    formData.append("moduleId", moduleId);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("title", title);
    formData.append("zone", zone);
    formData.append("type", type);
    formData.append("seller", seller);
    formData.append("file", file);

    axios
      .post("http://localhost:5000/banner/editBanner/" + id, formData)
      .then((res) => {
        //    const loginID = res.data._id;
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
        console.log(err);
      });

    navigate("/banner");
  };

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
                                "assets/img/companies/company-profile-img.svg"
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
                            <input type="file"  accept="image/png,image/jpg,image/jpeg" 
                            onChange={handleFileChange} />
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
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Module <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setModuleId(e.target.value)}
                            >
                              {modules.map((opt) => (
                                <option value={opt._id}>{opt.module}</option>
                              ))}
                            </select>
                            {errors.moduleId && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.moduleId}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Category <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setCategoryId(e.target.value)}
                            >
                              {categories.map((opt) => (
                                <option value={opt._id}>{opt.category}</option>
                              ))}
                            </select>
                            {errors.categoryId && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.categoryId}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Subcategory <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setSubcategoryId(e.target.value)}
                            >
                              {subcategories.map((opt) => (
                                <option value={opt._id}>
                                  {opt.subcategory}
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

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Title <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Title"
                              name="name"
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

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Zone <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Zone"
                              name="name"
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

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Type <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Type"
                              name="name"
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

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Seller <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Seller"
                              name="name"
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
