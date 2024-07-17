import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import './Invoice.css';

const Invoice = () => {
    const { id } = useParams();
    let TotalPrice = 0;
    const apiUrl = process.env.REACT_APP_API_URL;

    const [order, setorder] = useState([]);
    const GetOrderBySessionIdOrUserId = async () => {

        const responce = await fetch(`${apiUrl}/GetOrderByOrderId/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await responce.json();
        setorder(result?.order);
    }
    useEffect(() => {
        GetOrderBySessionIdOrUserId();
    }, [id])

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };


    return (
        <div className="card-container-outer">
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body" style={{ width: "100%" }}>
                    <div className="invoice-title">
                        <div className="float-end" style={{ textAlign: 'right' }}>
                            {/* <a href="javascript:window.print()">Print & Download Invoice</a> */}
                            <h4>Tax Invoice/Bill of Supply/Cash Memo</h4>
                            <h5>(Original for Recipient)</h5>
                        </div>
                        <div className="mb-4">
                            <img src="https://www.decasys.in/images/logo/1.png" style={{ width: 250, height: 65 }} class="img-fluid blur-up lazyloaded" alt=""></img>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <div className="text-muted card-sold-sec">
                                        <h5 className="">Sold By :</h5>
                                        <p className="">Decasys Enterprises</p>
                                        <p className="">151-A, Pocket-E, LIG Flats, GTB Enclave, Nand Nagri, Delhi-110093 INDIA</p>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3 mt-2">
                                    <div className="text-muted card-Invoice-sec">
                                        <div style={{ display: 'flex' }}>
                                            <h5>Company Name:</h5>
                                            <p style={{ paddingLeft: 5 }}>Decasys Enterprises</p>
                                        </div>
                                        <div className="mt-1" style={{ display: 'flex' }}>
                                            <h5>GST Registration No:</h5>
                                            <p style={{ paddingLeft: 5 }}>07FJXPS2270D1ZQ</p>
                                        </div>
                                        <div className="mt-2">
                                            <h5>Invoice No:</h5>
                                            <p>{order?.invoice_no}</p>
                                        </div>
                                        <div className="mt-2">
                                            <h5>Invoice Date:</h5>
                                            <p>{formatDate(order?.createdAt)}</p>
                                        </div>
                                        <div className="mt-2">
                                            <h5>Order No:</h5>
                                            <p>{order?.order_no}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-sm-12 mb-4">
                                    <div className="text-muted card-address-sec">
                                        <h5 className="">Billing Address :</h5>
                                        <p className="">{order?.user_name}</p>
                                        <p className="">{order?.address}</p>
                                        <p className="">{order?.email}</p>
                                        <p>{order?.mobile}</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 mt-5">
                                    <div className="text-muted card-address-sec">
                                        <h5 className="">Shipping Address :</h5>
                                        <p className="">{order?.user_name1?order?.user_name1:order?.user_name}</p>
                                        <p className="">{order?.address1?order?.address1:order?.address}</p>
                                        <p className="">{order?.email}</p>
                                        <p>{order?.mobile1?order?.mobile1:order?.mobile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-2">
                        {/* <h5 className="font-size-15">Order Summary</h5> */}
                        <div className="table-responsive">
                            <table className="table align-middle table-bordered table-nowrap table-centered mb-0" style={{ borderColor: '#000' }}>
                                <thead style={{ fontSize: 13 }}>
                                    <tr>
                                        <th style={{ width: 70 }}>Sl. No.</th>
                                        <th>Description</th>
                                        <th>Unit Price</th>
                                        <th>Qty</th>
                                        <th>Tax Rate</th>
                                        <th>Tax Type</th>
                                        <th>Tax Amount</th>
                                        <th className="text-end" >Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.product_details?.map((product, index) => {
                                        const total = product?.product_quantity * (product?.product_price ? product?.product_price : 0);
                                        TotalPrice += total;
                                        return (<tr>
                                            <th scope="row" style={{ fontSize: 13 }}>{index + 1}</th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14 mb-1" style={{ fontSize: 13 }}>{product?.product_name.substring(0, 45)}
                                                        <br>
                                                        </br>{product?.product_name.substring(45, 150)}
                                                    </h5>
                                                </div>
                                                <div>
                                                    <p className="text-muted mb-0" style={{ fontSize: 13 }}>({product?.product_weight})</p>
                                                </div>
                                            </td>
                                            <td style={{ fontSize: 13 }}>₹ {product?.product_price}</td>
                                            <td style={{ fontSize: 13 }}>{product?.product_quantity}</td>
                                            <td style={{ fontSize: 13 }}>0%</td>
                                            <td style={{ fontSize: 13 }}>GST</td>
                                            <td style={{ fontSize: 13 }}>₹0.00</td>
                                            <td className="text-end" style={{ fontSize: 13 }}>₹ {product?.product_price * product?.product_quantity}</td>
                                        </tr>)
                                    })}
                                    <tr>
                                        <th scope="row" colSpan={7} className="text-end" style={{ fontSize: 13 }}>Sub Total :</th>
                                        <td className="text-end" style={{ fontSize: 13 }}>₹ {TotalPrice}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colSpan={7} className="text-end" style={{ fontSize: 13 }}>Coupon Discount :</th>
                                        <td className="text-end" style={{ fontSize: 13 }}>- ₹ {order?.coupanAmount}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colSpan={7} className="text-end" style={{ fontSize: 13 }}>Total : </th>
                                        <td className="text-end"><h4 className="m-0 fw-semibold" style={{ fontSize: 13 }}>₹ {TotalPrice-order?.coupanAmount}</h4></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8} className="text-end">
                                            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 5, }}>For Decasys Enterprises:</h4>
                                            <img src="https://www.decasys.in/images/logo/Asignatory.jpg" style={{ width: 200, height: 45 }} class="img-fluid blur-up lazyloaded" alt=""></img>
                                            <h4 style={{ fontSize: 16, fontWeight: 700, marginTop: 5, }}>Authorized Signatory</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="d-print-none mt-4">
                            <div className="float-end">
                                <a href="javascript:window.print()" className="btn btn-success me-1" style={{ fontSize: 13 }}>Print & Download Invoice</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
