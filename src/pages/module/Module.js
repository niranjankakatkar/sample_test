import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import axios from "axios";

export default function User() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [module, setModule] = useState();
  const [activeFlag, setActiveFlag] = useState();
  const [file, setFile] = useState();

  const [allCount, setAllCount] = useState();
  const [activeCount, setActiveCount] = useState();
  const [inactiveCount, setInactiveCount] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Logic to calculate the index range for the current page
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
 

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const { deletID } = useParams();

  // Validation states
  const [errors, setErrors] = useState({
    module: "",
    file: "",
  });

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
    axios
      .get("http://43.205.22.150:5000/module/getAllModule")
      .then((res) => {
        //console.log(res);
        setData(res.data);
      })
      .catch((err) => console.error(err));

    //Ge tALL Count
    axios
      .get("http://43.205.22.150:5000/module/getAllCnt")
      .then((res) => {
        //console.log(res);

        setAllCount(res.data.cnt);
      })
      .catch((err) => console.error(err));

    //Ge Active Count
    axios
      .get("http://43.205.22.150:5000/module/getActiveCnt")
      .then((res) => {
        //console.log(res);

        setActiveCount(res.data.cnt);
      })
      .catch((err) => console.error(err));

    //Get In Active Count
    axios
      .get("http://43.205.22.150:5000/module/getInactiveCnt")
      .then((res) => {
        //console.log(res);

        setInactiveCount(res.data.cnt);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://43.205.22.150:5000/module/deleteSingleModule/" + id)
      .then((res) => {
        //console.log(res);
        navigate("/module");
      })
      .catch((err) => console.error(err));
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};

    if (!module) formErrors.moduleId = "Module is required.";
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
    formData.append("module", module);
    formData.append("file", file);

    axios
      .post("http://43.205.22.150:5000/module/createModuleImg", formData)
      .then((res) => {
        //console.log(res);
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
        //console.log(err);
      });
    navigate("/module");
  };

  return (
    <>
      <div className="main-wrapper">
        <Navbar></Navbar>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>Modules</h5>
                <div className="page-content">
                  <div className="list-btn">
                    <ul className="filter-list">
                      <li>
                        <a
                          className="btn-filters"
                          href="javascript:void(0);"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Refresh"
                        >
                          <span>
                            <i className="fe fe-refresh-ccw"></i>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="btn btn-filters w-auto popup-toggle"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Filter"
                        >
                          <span className="me-2">
                            <img
                              src="assets/img/icons/filter-icon.svg"
                              alt="filter"
                            />
                          </span>
                          Filter
                        </a>
                      </li>
                      <li>
                        <div
                          className="dropdown dropdown-action"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Download"
                        >
                          <a
                            href="#"
                            className="btn btn-filters"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="me-2">
                              <i className="fe fe-download"></i>
                            </span>
                            Export
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <ul className="d-block">
                              <li>
                                <a
                                  className="d-flex align-items-center download-item"
                                  href="javascript:void(0);"
                                  download
                                >
                                  <i className="far fa-file-pdf me-2"></i>Export
                                  as PDF
                                </a>
                              </li>
                              <li>
                                <a
                                  className="d-flex align-items-center download-item"
                                  href="javascript:void(0);"
                                  download
                                >
                                  <i className="far fa-file-text me-2"></i>
                                  Export as Excel
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a
                          className="btn btn-filters"
                          href="javascript:void(0);"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Print"
                        >
                          <span className="me-2">
                            <i className="fe fe-printer"></i>
                          </span>{" "}
                          Print
                        </a>
                      </li>
                      <li>
                        <a
                          className="btn btn-primary"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_companies"
                        >
                          <i
                            className="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>
                          Add Module
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-list-head">
              <div className="row">
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="card w-100">
                    <div className="card-body">
                      <div className="grid-info-item total-items">
                        <div className="grid-info">
                          <span>Total Module</span>
                          <h4>{allCount}</h4>
                        </div>
                        <div className="grid-head-icon">
                          <i className="fe fe-life-buoy"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="card w-100">
                    <div className="card-body">
                      <div className="grid-info-item active-items">
                        <div className="grid-info">
                          <span>Active Module</span>
                          <h4>{activeCount}</h4>
                        </div>
                        <div className="grid-head-icon">
                          <i className="fe fe-check-square"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="card w-100">
                    <div className="card-body">
                      <div className="grid-info-item inactive-items">
                        <div className="grid-info">
                          <span>Inactive Module</span>
                          <h4>{inactiveCount}</h4>
                        </div>
                        <div className="grid-head-icon">
                          <i className="fe fe-x-circle"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="card w-100">
                    <div className="card-body">
                      <div className="grid-info-item location-info">
                        <div className="grid-info">
                          <span>Module Locations</span>
                          <h4>0</h4>
                        </div>
                        <div className="grid-head-icon">
                          <i className="fe fe-map-pin"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="filter_inputs" className="card filter-card">
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-sm-6 col-md-3">
                    <div className="input-block mb-3">
                      <label>Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="input-block mb-3">
                      <label>Email</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="input-block mb-3">
                      <label>Phone</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card-table">
                  <div className="card-body">
                    <div className="table-responsive">
                      <div
                        className="companies-table"
                        style={{ height: "100vh" }}
                      >
                        <table className="table table-center table-hover datatable">
                          <thead className="thead-light">
                            <tr>
                              <th className="no-sort">#</th>
                              <th>Module Name</th>
                              <th>Status</th>
                              <th className="no-sort">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentData.map((user, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <h2 className="table-avatar ">
                                      <a className="">
                                        <img
                                          className="avatar-xl"
                                          src="http://localhost:3000/assets/img/logo.png"
                                          alt="Company Image"
                                        />
                                      </a>
                                      <a href="#">{user.module}</a>
                                    </h2>
                                  </td>

                                  {/* <td>
                                    <a href="" className="__cf_email__">
                                      {user.email}
                                    </a>
                                  </td>
                                  <td>{user.mobileno}</td> */}
                                  <td>
                                    <span className="badge bg-success-light d-inline-flex align-items-center">
                                      <i className="fe fe-check me-1"></i>Active
                                    </span>
                                  </td>
                                  <td className="d-flex align-items-center">
                                    <div className="dropdown dropdown-action">
                                      <a
                                        href="#"
                                        className=" btn-action-icon "
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i className="fas fa-ellipsis-v"></i>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-end">
                                        <ul className="dropdown-ul">
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              to={`/module_detail/${user._id}`}
                                            >
                                              <i className="far fa-eye me-2"></i>
                                              View User Details
                                            </Link>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                              data-bs-toggle="modal"
                                              data-bs-target="#edit_companies"
                                            >
                                              <i className="fe fe-edit me-2"></i>
                                              Edit
                                            </a>
                                          </li>
                                          <li className="delete-alt">
                                            <div>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleDelete(user._id)
                                                }
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                              >
                                                <i className="fe fe-trash-2 me-2"></i>
                                                Delete
                                              </a>
                                            </div>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i className="fe fe-shuffle me-2"></i>
                                              Subscription Log
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <div
                          className="pagination-container"
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            marginTop: "16px",
                          }}
                        >
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                              backgroundColor: "#7539ff",
                              color: "white",
                            }}
                          >
                            Previous
                          </button>

                          <span
                            className="page-info"
                            style={{ margin: "0 8px" }}
                          >
                            Page {currentPage} of {totalPages}
                          </span>

                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                              backgroundColor: "#07bc0c",
                              color: "white",
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal fade modal-delete"
          id="delete_modal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <div className="delete-modal-icon">
                    <span>
                      <i className="fe fe-check-circle"></i>
                    </span>
                  </div>
                  <h3>Are You Sure?</h3>
                  <p>You want delete user</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="modal-footer justify-content-center p-0">
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary paid-continue-btn me-2"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      className="btn btn-back cancel-btn"
                    >
                      No, Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="add_companies"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Add New Category</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-field-item">
                        <h5 className="form-title">Module</h5>

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
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="form-label">Module Name </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Module Name"
                          name="module"
                          value={module}
                          onChange={(e) => setModule(e.target.value)}
                        />
                        {errors.module && (
                          <div style={{ color: "red", fontSize: "0.85em" }}>
                            {errors.module}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md12">
                      <div className="d-flex align-items-center mb-3">
                        <h6 className="mb-0">Status</h6>
                        <div className="status-toggle">
                          <input
                            id="access-trail"
                            className="check"
                            type="checkbox"
                            checked
                            value={activeFlag}
                            onChange={(e) => setActiveFlag(e.target.value)}
                          />
                          <label
                            for="access-trail"
                            className="checktoggle checkbox-bg"
                          >
                            checkbox
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-back cancel-btn me-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="edit_companies"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Edit Company</h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form action="https://kanakku.dreamstechnologies.com/html/template/companies.html">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-field-item">
                        <h5 className="form-title">Company Profile</h5>
                        <div className="profile-picture">
                          <div className="upload-profile">
                            <div className="profile-img company-profile-img">
                              <img
                                id="edit-company-img"
                                className="img-fluid me-0"
                                src="assets/img/companies/company-01.svg"
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
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="form-label">Name </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Name"
                          value="Hermann Groups"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Email Address </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Email"
                          value="info@example.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Account Url </label>
                        <div className="url-text-box">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Account URL"
                            value="www.hru.example.com"
                          />
                          <span className="url-text">kanakku.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="mb-2">Phone Number</label>
                        <input
                          className="form-control"
                          id="phone_2"
                          name="phone"
                          type="text"
                          placeholder="Phone Number"
                          value="1245547887"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-label">Website </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Website"
                          value="www.example.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-control-label">Password</label>
                        <div className="pass-group modal-password-field">
                          <input
                            type="password"
                            className="form-control pass-input"
                            placeholder="Password"
                            value="12345"
                          />
                          <span className="fas toggle-password fa-eye-slash"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label className="form-control-label">
                          Confirm Password
                        </label>
                        <div className="pass-group modal-password-field">
                          <input
                            type="password"
                            className="form-control pass-input-two"
                            placeholder="Confirm Password"
                            value="12345"
                          />
                          <span className="fas toggle-password-two fa-eye-slash"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block mb-3">
                        <label className="form-label">Company Address </label>
                        <textarea type="text" className="form-control" rows="3">
                          22 Junior Avenue Duluth, GA 30097
                        </textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Plan Name</label>
                        <select className="select">
                          <option>All Plans</option>
                          <option>Advanced</option>
                          <option>Basic</option>
                          <option>Enterprise</option>
                          <option>Premium</option>
                          <option>Free</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Plan Type</label>
                        <select className="select">
                          <option>Monthly</option>
                          <option>Yearly</option>
                          <option>Lifetime</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Select Currency</label>
                        <select className="select">
                          <option>United Stated Dollar (USD)</option>
                          <option>$</option>
                          <option>£</option>
                          <option>€</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-3">
                        <label>Select Language</label>
                        <select className="select">
                          <option>English</option>
                          <option>French</option>
                          <option>Spanish</option>
                          <option>German</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex align-items-center mb-3">
                        <h6 className="mb-0">Status</h6>
                        <div className="status-toggle">
                          <input
                            id="access-trail-2"
                            className="check"
                            type="checkbox"
                            checked
                          />
                          <label
                            for="access-trail-2"
                            className="checktoggle checkbox-bg"
                          >
                            checkbox
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-back cancel-btn me-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="view_companies"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">User Details</h4>
                </div>
                <div className="d-flex details-edit-link">
                  <a
                    href="#"
                    className="modal-edit-link d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_companies"
                  >
                    <i className="fe fe-edit me-2"></i>Edit User
                  </a>
                  <button
                    type="button"
                    className="btn-close ms-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-field-item">
                      <div className="profile-picture company-detail-head">
                        <div className="upload-profile">
                          <div className="profile-img company-profile-img">
                            <img
                              id="view-company-img"
                              className="img-fluid me-0"
                              src="assets/img/companies/company-01.svg"
                              alt="profile-img"
                            />
                          </div>
                          <div className="add-profile">
                            <h5>Hermann Groups</h5>
                            <span>
                              <a
                                href="https://kanakku.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="c981acbba4a5a5bba0aaa189acb1a8a4b9a5ace7aaa6a4"
                              >
                                [email&#160;protected]
                              </a>
                            </span>
                          </div>
                        </div>
                        <span className="badge bg-success-light d-inline-flex align-items-center">
                          <i className="fe fe-check me-1"></i>Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="plane-basic-info">
                      <h5>Basic Info</h5>
                      <div className="row">
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Account URL</h6>
                            <p>hru.example.com</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Phone Number</h6>
                            <p>+1 15541 54544</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Website</h6>
                            <p>www.example.com</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Company Address</h6>
                            <p>
                              22 Junior Avenue <br />
                              Duluth, GA 30097
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Currency</h6>
                            <p>United Stated Dollar (USD)</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Language</h6>
                            <p>English</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="plane-basic-info plane-detail">
                      <h5>Plan Details</h5>
                      <div className="row">
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Plan Name</h6>
                            <p>Enterprise</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Plan Type</h6>
                            <p>Yearly</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Price</h6>
                            <p>$200</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Register Date</h6>
                            <p>15 Jan 2024</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="basic-info-detail">
                            <h6>Expiring On</h6>
                            <p>15 Jan 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal custom-modal custom-lg-modal fade p-20"
          id="change_pane"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header border-0">
                <div className="form-header modal-header-title text-start mb-0">
                  <h4 className="mb-0">Update Package</h4>
                </div>
                <button
                  type="button"
                  className="btn-close ms-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form action="#">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="plane-basic-info plane-detail">
                        <h5>Current Plan Details</h5>
                        <div className="row">
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Company Name</h6>
                              <p>Hermann Groups</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Plan Name</h6>
                              <p>Enterprise</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Plan Type</h6>
                              <p>Yearly</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Price</h6>
                              <p>$200</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Register Date</h6>
                              <p>15 Jan 2024</p>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                            <div className="basic-info-detail">
                              <h6>Expiring On</h6>
                              <p>15 Jan 2025</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="plane-basic-info plane-detail">
                        <h5>Change Company Plan</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label>Plan Name</label>
                              <select className="select">
                                <option>Enterprise</option>
                                <option>Advanced</option>
                                <option>Basic</option>
                                <option>Premium</option>
                                <option>Free</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label>Plan Type</label>
                              <select className="select">
                                <option>Yearly</option>
                                <option>Monthly</option>
                                <option>Lifetime</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-label">Amount </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-control-label">
                                Payment Date
                              </label>
                              <div className="cal-icon">
                                <input
                                  type="email"
                                  className="form-control datetimepicker"
                                  placeholder="DD-MM-YYYY"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-control-label">
                                Next Payment Date
                              </label>
                              <div className="cal-icon">
                                <input
                                  type="email"
                                  className="form-control datetimepicker"
                                  placeholder="DD-MM-YYYY"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-block mb-3">
                              <label className="form-control-label">
                                Expiring On
                              </label>
                              <div className="cal-icon">
                                <input
                                  type="email"
                                  className="form-control datetimepicker"
                                  placeholder="DD-MM-YYYY"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-back cancel-btn me-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary paid-continue-btn"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
