import React, { useEffect, useState } from "react";
import { toast, Slide } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import NavBar_Inner from "../NavBar_Inner";

export default function UpdateCashback() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { id } = useParams();

  const [ID, setID] = useState();
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
  const [activeFlag, setActiveFlag] = useState();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/cashback/editcashback/" + id
        );
        console.log(response);
        setID(response.data._id);
        setModuleId(response.data.moduleId);
        setCategoryId(response.data.categoryId);
        setSubcategoryId(response.data.subcategoryId);
        setTitle(response.data.title);
        setCustomer(response.data.customer);
        setCashback(response.data.cashback);
        setMinpurchase(response.data.minpurchase);
        setMaxdiscount(response.data.maxdiscount);
        setLimit(response.data.limit);
        setStartdate(response.data.startdate);
        setEnddate(response.data.enddate);
        setFile(response.data.file);

        //setFileName(response.data.filename);
      } catch (error) {
        //console.log(error)
      }
    };
    fetchData();
  }, []);

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
      .post("http://localhost:5000/cashback/editCashback/" + id, formData)
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

    navigate("/cashback");
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
                  <h5>Edit Cashback</h5>
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
                                id="company-img"
                                className="img-fluid me-0"
                                src={
                                  imagePreview ||
                                  "assets/img/companies/company-add-img.svg"
                                }
                               
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
                              Customer <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Customer"
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
                            <label>
                              Cashback<span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Store"
                              name="store"
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
                            <label className="form-label">Min purchase</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Customer"
                              name="customer"
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
                              placeholder="Enter Code"
                              name="code"
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
                              className="form-control"
                              placeholder="Enter Start data"
                              name="startend"
                              value={startdate}
                              onChange={(e) => setStartdate(e.target.value)}
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
                              placeholder="Enter End Date"
                              name="Enddate "
                              value={enddate}
                              onChange={(e) => setEnddate(e.target.value)}
                            />
                            {errors.enddate && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.enddate}
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
