import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import NavBar_Inner from "../NavBar_Inner";

export default function Cashback_Details() {
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

  const [file, setFile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/cashback/getSinglecashback/" + id
        );
        //console.log(response);
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
      } catch (error) {
        //console.log(error)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <NavBar_Inner></NavBar_Inner>

        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="content-page-header">
                <h5>Cashback Details</h5>
              </div>
            </div>

            <div className="card customer-details-group">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-img d-inline-flex">
                          <img
                            className="rounded-circle"
                            src={`http://43.205.22.150:5000/users/${file}`}
                            alt="profile-img"
                          />
                        </span>
                        <div className="customer-details-cont">
                          <h6>{title}</h6>
                          <p>Caal-12345</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-mail"></i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Customer</h6>
                          <p>{customer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-phone"></i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Cashback</h6>
                          <p>{cashback}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div className="customer-details">
                      <div className="d-flex align-items-center">
                        <span className="customer-widget-icon d-inline-flex">
                          <i className="fe fe-globe"></i>
                        </span>
                        <div className="customer-details-cont">
                          <h6>Limit</h6>
                          <p>{limit}</p>
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
                      <label>title</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="input-block mb-3">
                      <label>Coupon Type</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <div className="input-block mb-3">
                      <label>Store</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-3 col-lg-5 col-sm-7 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-info-light">
                        <img
                          src="../assets/img/icons/receipt-item.svg"
                          alt="img"
                        />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Total Lead</div>
                        <div className="dash-counts">
                          <p>0</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of todays{" "}
                        <span className="rounded-circle bg-light-gray">0</span>
                      </p>
                      <p className="inovice-trending text-success-light">
                        0{" "}
                        <span className="ms-2">
                          <i className="fe fe-trending-up"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-5 col-sm-7 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-primary-light">
                        <img
                          src="../assets/img/icons/message-edit.svg"
                          alt="img"
                        />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Completed Lead</div>
                        <div className="dash-counts">
                          <p>0</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of todays{" "}
                        <span className="rounded-circle bg-light-gray">0</span>
                      </p>
                      <p className="inovice-trending text-success-light">
                        0{" "}
                        <span className="ms-2">
                          <i className="fe fe-trending-up"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-5 col-sm-7 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-warning-light">
                        <img
                          src="../assets/img/icons/archive-book.svg"
                          alt="img"
                        />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Pending Lead</div>
                        <div className="dash-counts">
                          <p>0</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of todays{" "}
                        <span className="rounded-circle bg-light-gray">0</span>
                      </p>
                      <p className="inovice-trending text-danger-light">
                        0{" "}
                        <span className="ms-2">
                          <i className="fe fe-trending-down"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-5 col-sm-7 col-12 d-flex">
                <div className="card inovices-card w-100">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="inovices-widget-icon bg-primary-light">
                        <img
                          src="../assets/img/icons/clipboard-close.svg"
                          alt="img"
                        />
                      </span>
                      <div className="dash-count">
                        <div className="dash-title">Cancelled Lead</div>
                        <div className="dash-counts">
                          <p>0</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="inovices-all">
                        No of todays{" "}
                        <span className="rounded-circle bg-light-gray">0</span>
                      </p>
                      <p className="inovice-trending text-danger-light">
                        0{" "}
                        <span className="ms-2">
                          <i className="fe fe-trending-down"></i>
                        </span>
                      </p>
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
                      <table className="table table-stripped table-hover datatable">
                        <thead className="thead-light">
                          <tr>
                            <th>
                              <label className="custom_check">
                                <input type="checkbox" name="invoice" />
                                <span className="checkmark"></span>
                              </label>
                              Lead No
                            </th>
                            <th>Category</th>
                            <th>Created On</th>
                            <th>Lead Title</th>

                            <th>Status</th>
                            <th className="text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <label className="custom_check">
                                <input type="checkbox" name="invoice" />
                                <span className="checkmark"></span>
                              </label>
                              <a
                                href="invoice-details.html"
                                className="invoice-link"
                              >
                                #4987
                              </a>
                            </td>
                            <td>Food</td>
                            <td>23 Mar 2023</td>

                            <td>25 Mar 2023</td>
                            <td>
                              <span className="badge bg-success-light">
                                Paid
                              </span>
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="#"
                                  className=" btn-action-icon "
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-v"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end customer-dropdown">
                                  <ul>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="edit-customer.html"
                                      >
                                        <i className="far fa-edit me-2"></i>Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#delete_modal"
                                      >
                                        <i className="far fa-trash-alt me-2"></i>
                                        Delete
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="customer-details.html"
                                      >
                                        <i className="far fa-eye me-2"></i>View
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href>
                                        <i className="fe fe-send me-2"></i>Send
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href>
                                        <i className="fe fe-download me-2"></i>
                                        Download
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="add-credit-notes.html"
                                      >
                                        <i className="fe fe-file-text me-2"></i>
                                        Convert to Sales Return
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href>
                                        <i className="fe fe-copy me-2"></i>Clone
                                        as Invoice
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal custom-modal fade"
              id="delete_modal"
              role="dialog"
            >
              <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="form-header">
                      <h3>Delete Customer Details</h3>
                      <p>Are you sure want to delete?</p>
                    </div>
                    <div className="modal-btn delete-action">
                      <div className="row">
                        <div className="col-6">
                          <a
                            href="#"
                            data-bs-dismiss="modal"
                            className="btn btn-primary paid-continue-btn"
                          >
                            Delete
                          </a>
                        </div>
                        <div className="col-6">
                          <a
                            href="#"
                            data-bs-dismiss="modal"
                            className="btn btn-primary paid-cancel-btn"
                          >
                            Cancel
                          </a>
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
    </>
  );
}
