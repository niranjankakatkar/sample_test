import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

import { useParams } from "react-router-dom";

import NavBar_Inner from "../NavBar_Inner";

export default function UpdateUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [ID, setID] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [tax, setTax] = useState();
  const [time, setTime] = useState({ hour: "", minute: "", period: "AM" });
  const [zone, setZone] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [ofname, setofName] = useState();
  const [olname, setolName] = useState();
  const [mobileno, setMobileno] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [activeFlag, setActiveFlag] = useState();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  // Validation states
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    tax: "",
    time: "",
    zone: "",
    lat: "",
    long: "",
    ofname: "",
    olname: "",
    mobileno: "",
    email: "",
    password: "",
    file: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/banner/editBanner/" + id
        );
        console.log(response);
        setID(response.data._id);
        setName(response.data.name);
        setAddress(response.data.address);
        setTax(response.data.tax);
        const [hour, minute, period] = response.data.time?.split(/[: ]/) || [
          "",
          "",
          "AM",
        ];
        setTime({
          hour: hour || "",
          minute: minute || "",
          period: period || "AM",
        });
        setZone(response.data.zone);
        setLat(response.data.lat);
        setLong(response.data.long);
        setofName(response.data.ofname);
        setolName(response.data.olname);
        setMobileno(response.data.mobileno);
        setEmail(response.data.email);
        setPassword(response.data.password);
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

    if (!name) formErrors.name = "Name is required.";
    if (!address) formErrors.address = "Address is required.";
    if (!tax) formErrors.tax = "Tax is required.";
    if (!time.hour || !time.minute || !time.period)
      formErrors.time = "Time is required.";
    if (!zone) formErrors.zone = "Zone is required.";
    if (!lat) formErrors.lat = "Latitude is required.";
    if (!long) formErrors.long = "Longitude is required.";
    if (!ofname) formErrors.ofname = "Owner Name is required.";
    if (!olname) formErrors.olname = "Owner Name is required.";
    if (!/^\d{10}$/.test(mobileno)) {
      formErrors.mobileno = "Mobile number must be exactly 10 digits.";
    }
    if (!email) formErrors.email = "Email is required.";
    if (!password) formErrors.password = "Password is required.";
    if (!file) formErrors.file = "File is required.";

    // if (!file) formErrors.file = "Image file is required.";

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

  const handleTimeChange = (event) => {
    const { name, value } = event.target;

    // Update the `time` object in the state
    setTime((prevTime) => ({
      ...prevTime,
      [name]: value,
    }));
  };

  const formatTime = (time) => {
    if (time?.hour && time?.minute && time?.period) {
      return `${time.hour}:${
        time.minute < 10 ? `0${time.minute}` : time.minute
      } ${time.period}`;
    }
    return null; // Return null if any part of the time is missing
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

    const formattedTime = formatTime(time);

    if (!formattedTime) {
      toast.error("Please select a valid time", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("address", address);
    formData.append("tax", tax);
    formData.append("time", formattedTime); // Append the formatted time
    formData.append("zone", zone);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("ofname", ofname);
    formData.append("olname", olname);
    formData.append("mobileno", mobileno);
    formData.append("email", email);
    formData.append("password", password);
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

    navigate("/seller");
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
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Seller Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Seller Name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.name}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Tax <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Tax"
                              name="tax"
                              value={tax}
                              onChange={(e) => setTax(e.target.value)}
                            />
                            {errors.tax && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.tax}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-block mb-3">
                            <label>
                              Address<span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Enter Address"
                              name="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              rows="1"
                            />
                            {errors.address && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.address}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Zone<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Zone"
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
                            <label className="form-label">Time</label>
                            <br />

                            {/* Hour Selector */}
                            <select
                              name="hour"
                              value={time.hour}
                              onChange={handleTimeChange}
                              className="form-control"
                              style={{ display: "inline-block", width: "30%" }}
                            >
                              <option value="">Hour</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (hour) => (
                                  <option key={hour} value={hour}>
                                    {hour < 10 ? `0${hour}` : hour}
                                  </option>
                                )
                              )}
                            </select>

                            {/* Minute Selector */}
                            <select
                              name="minute"
                              value={time.minute}
                              onChange={handleTimeChange}
                              className="form-control"
                              style={{
                                display: "inline-block",
                                width: "30%",
                                marginLeft: "5px",
                              }}
                            >
                              <option value="">Minute</option>
                              {Array.from({ length: 60 }, (_, i) => i).map(
                                (minute) => (
                                  <option key={minute} value={minute}>
                                    {minute < 10 ? `0${minute}` : minute}
                                  </option>
                                )
                              )}
                            </select>

                            {/* AM/PM Selector */}
                            <select
                              name="period"
                              value={time.period}
                              onChange={handleTimeChange}
                              className="form-control"
                              style={{
                                display: "inline-block",
                                width: "30%",
                                marginLeft: "5px",
                              }}
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                            {errors.time && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.time}
                              </div>
                            )}
                          </div>

                          {/* Display Selected Time */}
                          <div>
                            <p>
                              Selected Time:{" "}
                              {time.hour && time.minute
                                ? `${time.hour}:${time.minute} ${time.period}`
                                : "Not Selected"}
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Latitude <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Latitude"
                              name="lat"
                              value={lat}
                              onChange={(e) => setLat(e.target.value)}
                            />
                            {errors.lat && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.lat}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label>
                              Longitude <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Longitude"
                              name="long"
                              value={long}
                              onChange={(e) => setLong(e.target.value)}
                            />
                            {errors.long && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.long}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Owner First Name */}
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">
                              Owner First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                              name="ofname"
                              value={ofname}
                              onChange={(e) => setofName(e.target.value)}
                            />
                            {errors.ofname && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.ofname}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Owner Last Name */}
                        <div className="col-md-6">
                          <div className="input-block mb-3">
                            <label className="form-label">
                              Owner Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Last Name"
                              name="olname"
                              value={olname}
                              onChange={(e) => setolName(e.target.value)}
                            />
                            {errors.olname && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.olname}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Mobile No */}
                        <div className="col-md-4">
                          <div className="input-block mb-3">
                            <label className="form-label">Mobile No</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Mobile No"
                              name="mobileno"
                              value={mobileno}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Allow only numeric values and restrict to 10 digits
                                if (/^\d{0,10}$/.test(value)) {
                                  setMobileno(value);
                                }
                              }}
                            />
                            {errors.mobileno && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.mobileno}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Email */}
                        <div className="col-md-4">
                          <div className="input-block mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Password */}
                        <div className="col-md-4">
                          <div className="input-block mb-3">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Enter Password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                              <div style={{ color: "red", fontSize: "0.85em" }}>
                                {errors.password}
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
