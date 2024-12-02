import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import Navbar from "../Navbar";

export default function AddCashback() {
  const navigate = useNavigate();

  const [moduleId, setModuleId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [title, setTitle] = useState();
  const [customer, setCustomer] = useState();
  const [cashback, setCashback] = useState();
  const [minpurchase, setMinpurchase] = useState();
  const [maxdiscount, setMaxdiscount] = useState();
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [limit, setLimit] = useState();
  const [activeFlag, setActiveFlag] = useState(true);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [errors, setErrors] = useState({
    moduleId: "",
    categoryId: "",
    subcategoryId: "",
    title: "",
    customer: "",
    cashback: "",
    minpurchase: "",
    maxdiscount: "",
    startdate: "",
    enddate: "",
    limit: "",
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
    if (!customer) formErrors.customer = "Customer is required.";
    if (!cashback) formErrors.cashback = "Cashback is required.";
    if (!minpurchase) formErrors.minpurchase = "Min Purchase is required.";
    if (!maxdiscount) formErrors.maxdiscount = "Max Discount is required.";
    if (!startdate) formErrors.startdate = "Startdate is required.";
    if (!enddate) formErrors.enddate = "End Date is required.";
    if (!limit) formErrors.limit = "Limit is required.";
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
    formData.append("cashback", cashback);
    formData.append("customer", customer);
    formData.append("minpurchase", minpurchase);
    formData.append("maxdiscount", maxdiscount);
    formData.append("startdate", startdate);
    formData.append("enddate", enddate);
    formData.append("limit", limit);
    formData.append("file", file);

    axios
      .post("http://localhost:5000/cashback/createCashbackImg", formData)
      .then(() => {
        toast.success("Record Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
        navigate("/addcashback");
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
            height: "100%",
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
                <label className="form-label">Customer</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter customer"
                  name="customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
                {errors.customer && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.customer}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Cashback</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Cashback"
                  name="cashback"
                  value={cashback}
                  onChange={(e) => setCashback(e.target.value)}
                />
                {errors.cashback && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.cashback}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Minimum Purchase</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Discount"
                  name="minpurchase"
                  value={minpurchase}
                  onChange={(e) => setMinpurchase(e.target.value)}
                />
                {errors.minpurchase && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.minpurchase}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Max Discount</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Max Discount"
                  name="maxdiscount"
                  value={maxdiscount}
                  onChange={(e) => setMaxdiscount(e.target.value)}
                />
                {errors.maxdiscount && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.maxdiscount}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Limit</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Limit"
                  name="limit"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
                {errors.limit && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.limit}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  onChange={(e) => setStartdate(e.target.value)}
                  value={startdate}
                  className="form-control"
                  placeholderText="Enter Start Date"
                />
                {errors.startdate && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.startdate}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setEnddate(e.target.value)}
                  value={enddate}
                  placeholderText="Enter End Date"
                />
                {errors.enddate && (
                  <div style={{ color: "red", fontSize: "0.85em" }}>
                    {errors.enddate}
                  </div>
                )}
              </div>
            </div>

            {/* Active Flag */}
            <div className="col-md-12">
              <div className="input-block mb-3"></div>
            </div>

            {/* Submit Button */}
            <div
              className="col-md-12"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="input-block">
                <button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    backgroundColor: "#7539ff",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
