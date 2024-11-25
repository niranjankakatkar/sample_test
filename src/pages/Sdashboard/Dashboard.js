import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Slide, toast } from 'react-toastify';
import axios from 'axios';

export default function Dashboard() {
    const [userName, setUserName] = useState();
    const [franchiseeCount, setFranchiseeCount] = useState();

    const loginID = localStorage.getItem("loginID");



    useEffect(() => {
        axios.get('http://43.205.22.150:5000/user/getSingleUser/' + loginID)
            .then(res => {
                //console.log(res);
                setUserName(res.data.name);
            })
            .catch(err => console.error(err))

        //franchisee
        axios.get('http://43.205.22.150:5000/franchisee/getAllCnt')
            .then(res => {
                //console.log(res);
                setFranchiseeCount(res.data.cnt);
            })
            .catch(err => console.error(err))

    }, [])

    return (
        <>
            <div className="main-wrapper">

                <Navbar></Navbar>

                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <div className="row">
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dash-widget-header">
                                            <span className="dash-widget-icon bg-1">
                                                <i className="fas fa-dollar-sign"></i>
                                            </span>
                                            <div className="dash-count">
                                                <div className="dash-title">Total Earnings</div>
                                                <div className="dash-counts">
                                                    <p>1,642</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress progress-sm mt-3">
                                            <div className="progress-bar bg-5" role="progressbar" style={{width: '75%'}}
                                                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-danger me-1"><i
                                            className="fas fa-arrow-down me-1"></i>1.15%</span> since last week</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dash-widget-header">
                                            <span className="dash-widget-icon bg-2">
                                                <i className="fas fa-users"></i>
                                            </span>
                                            <div className="dash-count">
                                                <div className="dash-title">Total subscription</div>
                                                <div className="dash-counts">
                                                    <p>3,642</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress progress-sm mt-3">
                                            <div className="progress-bar bg-6" role="progressbar" style={{width: '65%'}}
                                                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-success me-1"><i
                                            className="fas fa-arrow-up me-1"></i>2.37%</span> since last week</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dash-widget-header">
                                            <span className="dash-widget-icon bg-3">
                                                <i className="fas fa-file-alt"></i>
                                            </span>
                                            <div className="dash-count">
                                                <div className="dash-title">Total Bookings</div>
                                                <div className="dash-counts">
                                                    <p>1,041</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress progress-sm mt-3">
                                            <div className="progress-bar bg-7" role="progressbar" style={{width: '85%'}}
                                                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-success me-1"><i
                                            className="fas fa-arrow-up me-1"></i>3.77%</span> since last week</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="dash-widget-header">
                                            <span className="dash-widget-icon bg-4">
                                                <i className="far fa-file"></i>
                                            </span>
                                            <div className="dash-count">
                                                <div className="dash-title">Total Service Man</div>
                                                <div className="dash-counts">
                                                    <p>2,150</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress progress-sm mt-3">
                                            <div className="progress-bar bg-8" role="progressbar" style={{width: '45%'}}
                                                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <p className="text-muted mt-3 mb-0"><span className="text-danger me-1"><i
                                            className="fas fa-arrow-down me-1"></i>8.68%</span> since last week</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-7 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title">Sales Analytics</h5>
                                            <div className="dropdown main">
                                                <button className="btn btn-white btn-sm dropdown-toggle" type="button"
                                                    id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Monthly
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">Yearly</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                                            <div className="w-md-100 d-flex align-items-center mb-3 flex-wrap flex-md-nowrap">
                                                <div>
                                                    <span>Total Sales</span>
                                                    <p className="h3 text-primary me-5">Rs.1000</p>
                                                </div>
                                                <div>
                                                    <span>Receipts</span>
                                                    <p className="h3 text-success me-5">Rs.1000</p>
                                                </div>
                                                <div>
                                                    <span>Expenses</span>
                                                    <p className="h3 text-danger me-5">Rs.300</p>
                                                </div>
                                                <div>
                                                    <span>Earnings</span>
                                                    <p className="h3 text-dark me-5">Rs.700</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="sales_chart"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title">Invoice Analytics</h5>
                                            <div className="dropdown main">
                                                <button className="btn btn-white btn-sm dropdown-toggle" type="button"
                                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Monthly
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">Weekly</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">Monthly</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);" className="dropdown-item">Yearly</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div id="invoice_chart"></div>
                                        <div className="text-center text-muted">
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i
                                                            className="fas fa-circle text-primary me-1"></i> Invoiced</p>
                                                        <h5>Rs.2,132</h5>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i
                                                            className="fas fa-circle text-success me-1"></i> Received</p>
                                                        <h5>Rs.1,763</h5>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i
                                                            className="fas fa-circle text-danger me-1"></i> Pending</p>
                                                        <h5>Rs.973</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="card mb-0">
                                    <div className="card-header">
                                        <div className="row align-center">
                                            <div className="col">
                                                <h5 className="card-title">Recent Bookings</h5>
                                            </div>
                                            <div className="col-auto">
                                                <a href="Bookings.html" className="btn-right btn btn-sm btn-outline-primary">
                                                    View All
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <div className="progress progress-md rounded-pill mb-3">
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: '47%'}}
                                                    aria-valuenow="47" aria-valuemin="0" aria-valuemax="100"></div>
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: '28%'}}
                                                    aria-valuenow="28" aria-valuemin="0" aria-valuemax="100"></div>
                                                <div className="progress-bar bg-danger" role="progressbar" style={{width: '15%'}}
                                                    aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                                <div className="progress-bar bg-info" role="progressbar" style={{width: '10%'}}
                                                    aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-success me-1"></i> Paid
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-warning me-1"></i> Unpaid
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-danger me-1"></i> Overdue
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-info me-1"></i> Draft
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-stripped table-hover">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Customer</th>
                                                        <th>Amount</th>
                                                        <th>Due Date</th>
                                                        <th>Status</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-04.jpg"
                                                                    alt="User Image"/>Barbara Moore</a>
                                                            </h2>
                                                        </td>
                                                        <td>Rs.118</td>
                                                        <td>23 Nov 2020</td>
                                                        <td><span className="badge bg-success-light">Paid</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-copy me-2"></i>Clone Invoice</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-06.jpg"
                                                                    alt="User Image"/>Karlene Chaidez</a>
                                                            </h2>
                                                        </td>
                                                        <td>Rs.222</td>
                                                        <td>18 Nov 2020</td>
                                                        <td><span className="badge bg-info-light text-info">Sent</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-copy me-2"></i>Clone Invoice</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-08.jpg"
                                                                    alt="User Image"/>Russell Copeland</a>
                                                            </h2>
                                                        </td>
                                                        <td>Rs.347</td>
                                                        <td>10 Nov 2020</td>
                                                        <td><span className="badge bg-warning-light text-warning">Partially
                                                            Paid</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-copy me-2"></i>Clone Invoice</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-10.jpg"
                                                                    alt="User Image"/>Joseph Collins</a>
                                                            </h2>
                                                        </td>
                                                        <td>Rs.826</td>
                                                        <td>25 Sep 2020</td>
                                                        <td><span className="badge bg-danger-light">Overdue</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-copy me-2"></i>Clone Invoice</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-11.jpg"
                                                                    alt="User Image"/>Jennifer Floyd</a>
                                                            </h2>
                                                        </td>
                                                        <td>Rs.519</td>
                                                        <td>18 Sep 2020</td>
                                                        <td><span className="badge bg-success-light">Paid</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-copy me-2"></i>Clone Invoice</a>
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
                            <div className="col-md-6 col-sm-6">
                                <div className="card mb-0">
                                    <div className="card-header">
                                        <div className="row align-center">
                                            <div className="col">
                                                <h5 className="card-title">Recent Estimates</h5>
                                            </div>
                                            <div className="col-auto">
                                                <a href="invoice-details.html" className="btn-right btn btn-sm btn-outline-primary">
                                                    View All
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <div className="progress progress-md rounded-pill mb-3">
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: '39%'}}
                                                    aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div>
                                                <div className="progress-bar bg-danger" role="progressbar" style={{width: '35%'}}
                                                    aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                                <div className="progress-bar bg-warning" role="progressbar" style={{width: '26%'}}
                                                    aria-valuenow="26" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-success me-1"></i> Sent
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-warning me-1"></i> Draft
                                                </div>
                                                <div className="col-auto">
                                                    <i className="fas fa-circle text-danger me-1"></i> Expired
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>Customer</th>
                                                        <th>Expiry Date</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-05.jpg"
                                                                    alt="User Image"/> Greg Lynch</a>
                                                            </h2>
                                                        </td>
                                                        <td>5 Nov 2020</td>
                                                        <td>Rs.175</td>
                                                        <td><span className="badge bg-info-light text-info">Sent</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-file-alt me-2"></i>Convert to
                                                                        Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send
                                                                        Estimate</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        Accepted</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-times-circle me-2"></i>Mark as
                                                                        Rejected</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-06.jpg"
                                                                    alt="User Image"/> Karlene Chaidez</a>
                                                            </h2>
                                                        </td>
                                                        <td>28 Oct 2020</td>
                                                        <td>Rs.1500</td>
                                                        <td><span className="badge bg-warning-light text-warning">Expired</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-file-alt me-2"></i>Convert to
                                                                        Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send
                                                                        Estimate</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        Accepted</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-times-circle me-2"></i>Mark as
                                                                        Rejected</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-07.jpg"
                                                                    alt="User Image"/> John Blair</a>
                                                            </h2>
                                                        </td>
                                                        <td>17 Oct 2020</td>
                                                        <td>Rs.2350</td>
                                                        <td><span className="badge bg-success-light">Accepted</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-file-alt me-2"></i>Convert to
                                                                        Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send
                                                                        Estimate</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        Accepted</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-times-circle me-2"></i>Mark as
                                                                        Rejected</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-08.jpg"
                                                                    alt="User Image"/> Russell Copeland</a>
                                                            </h2>
                                                        </td>
                                                        <td>8 Oct 2020</td>
                                                        <td>Rs.1890</td>
                                                        <td><span className="badge bg-success-light">Accepted</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-file-alt me-2"></i>Convert to
                                                                        Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send
                                                                        Estimate</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        Accepted</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-times-circle me-2"></i>Mark as
                                                                        Rejected</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <h2 className="table-avatar">
                                                                <a href="profile.html"><img
                                                                    className="avatar avatar-sm me-2 avatar-img rounded-circle"
                                                                    src="assets/img/profiles/avatar-09.jpg"
                                                                    alt="User Image"/> Leatha Bailey</a>
                                                            </h2>
                                                        </td>
                                                        <td>30 Sep 2020</td>
                                                        <td>Rs.785</td>
                                                        <td><span className="badge bg-success-light">Accepted</span></td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                                        className="fas fa-ellipsis-h"></i></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="edit-invoice.html"><i
                                                                        className="far fa-edit me-2"></i>Edit</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-trash-alt me-2"></i>Delete</a>
                                                                    <a className="dropdown-item" href="invoice-details.html"><i
                                                                        className="far fa-eye me-2"></i>View</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-file-alt me-2"></i>Convert to
                                                                        Invoice</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        sent</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-paper-plane me-2"></i>Send
                                                                        Estimate</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-check-circle me-2"></i>Mark as
                                                                        Accepted</a>
                                                                    <a className="dropdown-item" href="javascript:void(0);"><i
                                                                        className="far fa-times-circle me-2"></i>Mark as
                                                                        Rejected</a>
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
                    </div>
                </div>

            </div>

        </>
    )

}
