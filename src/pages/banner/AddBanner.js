import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import Navbar from "../Navbar";

export default function AddBanner() {
  const navigate = useNavigate();

  const [moduleId, setModuleId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [zone, setZone] = useState("");
  const [type, setType] = useState("");
  const [seller, setSeller] = useState("");
  const [activeFlag, setActiveFlag] = useState(true);
  const [file, setFile] = useState(null);
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
    zone: "",
    type: "",
    seller: "",
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
    if (moduleId) {
      axios
        .get(
          `http://43.205.22.150:5000/category/getCategoriesByModule/${moduleId}`
        )
        .then((res) => setFilteredCategories(res.data))
        .catch((err) => console.error(err));
    } else {
      setFilteredCategories([]);
    }
  }, [moduleId]);

  useEffect(() => {
    if (categoryId) {
      axios
        .get(
          `http://43.205.22.150:5000/category/getSubcategoriesByCategory/${categoryId}`
        )
        .then((res) => setFilteredCategories(res.data))
        .catch((err) => console.error(err));
    } else {
      setFilteredCategories([]);
    }
  }, [categoryId]);

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
    if (!type) formErrors.type = "Type is required.";
    if (!seller) formErrors.seller = "Seller is required.";
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
    formData.append("type", type);
    formData.append("seller", seller);
    formData.append("file", file);

    axios
      .post("http://localhost:5000/banner/createBannerImg", formData)
      .then(() => {
        toast.success("Record Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
        navigate("/addbanner");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
      });
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <div
        className="page-wrapper"
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          paddingTop: "80px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="modal-body"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "30px",
            width: "100%",
            height: "100vh",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="form-field-item">
                <div className="profile-picture">
                  <div className="upload-profile">
                    <div className="profile-img company-profile-img">
                      <img
                        id="company-img"
                        className="img-fluid me-0"
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
                    {errors.file && (
                      <div style={{ color: "red", fontSize: "0.85em" }}>
                        {errors.file}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
                    <option key={categoryId._id} value={category._id}>
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
                    <option key={subcategoryId._id} value={subcategory._id}>
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

            {/* Title */}
            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
                {errors.title && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.title}
                  </div>
                )}
              </div>
            </div>

            {/* Zone */}
            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Zone</label>
                <input
                  type="text"
                  className="form-control"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="Enter zone"
                />
                {errors.zone && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.zone}
                  </div>
                )}
              </div>
            </div>

            {/* Type */}
            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter type"
                />
                {errors.type && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.type}
                  </div>
                )}
              </div>
            </div>

            {/* Seller */}
            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Seller</label>
                <input
                  type="text"
                  className="form-control"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                  placeholder="Enter seller"
                />
                {errors.seller && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.seller}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
