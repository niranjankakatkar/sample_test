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
        setCustomer(response.data.customer)
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
                              Customer <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Customer"
                              value={customer}
                              onChange={(e) => setCustomer(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Cashback<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Store"
                              name="store"
                              value={cashback}
                              onChange={(e) => setCashback(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="input-block mb-3">
                            <label className="form-label">Min purchase</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Customer"
                              name="customer"
                              value={minpurchase}
                              onChange={(e) => setMinpurchase(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Max Discount</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Code"
                              name="code"
                              value={maxdiscount}
                              onChange={(e) => setMaxdiscount(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Limit</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Limit"
                              name="limit"
                              value={limit}
                              onChange={(e) => setLimit(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">Start Date</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Start data"
                              name="startend"
                              value={startdate}
                              onChange={(e) => setStartdate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">End Date</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter End Date"
                              name="Enddate "
                              value={enddate}
                              onChange={(e) => setEnddate(e.target.value)}
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
