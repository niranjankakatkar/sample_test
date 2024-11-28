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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("moduleId", moduleId);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("title", title);
    formData.append("zone", zone);
    formData.append("type", type);
    formData.append("seller", seller);

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
