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
  const [title, setTitle] = useState();
  const [coupontype, setCoupontype] = useState();
  const [store, setStore] = useState();
  const [customer, setCustomer] = useState();
  const [code, setCode] = useState();
  const [limit, setLimit] = useState();
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [discounttype, setDiscounttype] = useState();
  const [discount, setDiscount] = useState();
  const [maxdiscount, setMaxdiscount] = useState();
  const [mindiscount, setMindiscount] = useState();

  //  const [file, setFile] = useState(null);

  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

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
        setCoupontype(response.data.coupontype);
        setStore(response.data.store);
        setCustomer(response.data.customer);
        setCode(response.data.code);
        setLimit(response.data.limit);
        setStartdate(response.data.startdate);
        setEnddate(response.data.enddate);
        setDiscounttype(response.data.discounttype);
        setDiscount(response.data.discount);
        setMaxdiscount(response.data.maxdiscount);
        setMindiscount(response.data.mindiscount);
        // setFile(response.data.file);
      } catch (error) {
        console.log(error);
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
    formData.append("coupontype", coupontype);
    formData.append("store", store);
    formData.append("customer", customer);
    formData.append("code", code);
    formData.append("limit", limit);
    formData.append("startdate", startdate);
    formData.append("enddate", enddate);
    formData.append("discounttype", discounttype);
    formData.append("discount", discount);
    formData.append("maxdiscount", maxdiscount);
    formData.append("mindiscount", mindiscount);

    axios
      .post("http://localhost:5000/coupon/editCoupon/" + id, formData)
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

    navigate("/coupon");
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
                  <h5>Edit Coupon</h5>
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
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Coupon Type <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Coupon Type"
                              name="name"
                              value={coupontype}
                              onChange={(e) => setCoupontype(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Store <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Store"
                              name="name"
                              value={store}
                              onChange={(e) => setStore(e.target.value)}
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
                              id="mobile_code"
                              className="form-control"
                              placeholder="Customer"
                              name="name"
                              value={customer}
                              onChange={(e) => setCustomer(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Code <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Code"
                              name="name"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Limit <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Limit"
                              name="name"
                              value={limit}
                              onChange={(e) => setLimit(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Startdate <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Startdate"
                              name="name"
                              value={startdate}
                              onChange={(e) => setStartdate(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Enddate <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="End date"
                              name="name"
                              value={enddate}
                              onChange={(e) => setEnddate(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Discount Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Discount Type"
                              name="name"
                              value={discounttype}
                              onChange={(e) => setDiscounttype(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Discount <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Discount"
                              name="name"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Max Discount{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Max Discount"
                              name="name"
                              value={maxdiscount}
                              onChange={(e) => setMaxdiscount(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Min Discount{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="mobile_code"
                              className="form-control"
                              placeholder="Customer"
                              name="name"
                              value={mindiscount}
                              onChange={(e) => setMindiscount(e.target.value)}
                            />
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
