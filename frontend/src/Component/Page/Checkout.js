import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getAgentAddress } from '../../features/agentSlice';
export default function Checkout() {
  const [data, setdata] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const { Cart } = useSelector((state) => state?.cartSlice);
  const { Address } = useSelector((state) => state?.agentSlice);
  const dispatch = useDispatch();
  let TotalPrice = 0;
  useEffect(() => {
    Cart?.forEach((Carts) => {
      const total = Carts?.Quantity * (Carts?.productPrice ? Carts?.productPrice : 0);
      TotalPrice += total;

    })
    setaftercoupanprise(TotalPrice);
    setsubtotal(TotalPrice)
    dispatch(getAgentAddress(localStorage.getItem('user_id')));
    getAllCountry();
    //////for status
    getStateByCountry();
    /////for email set 
    setdata({ ...data, email: localStorage.getItem('agent_email') });

  }, [Cart, TotalPrice])
  const [coupan, setCoupan] = useState('');
  const [none, setnone] = useState('none');
  const [aftercoupanprise, setaftercoupanprise] = useState(TotalPrice);
  const [subtotal, setsubtotal] = useState(TotalPrice);
  const [couponprice, setcouponprice] = useState(0);
  const [couponshow, setcouponshow] = useState('block')
  const ApplyCoupan = async (e) => {
    e.preventDefault();
    if (coupan) {
      const coupandata = { coupon_code: coupan, minimum_apply_value: aftercoupanprise }
      ////////coupon check 
      const responce = await fetch(
        `${apiUrl}/ApplyCouponCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coupandata),
        }
      );
      const result = await responce.json();

      if (result.success === true) {
        if (result?.coupon?.coupon_type == 'Price') {
          toast.success(result.message);
          setsubtotal(aftercoupanprise)
          setcouponprice(result?.coupon?.coupon_value);
          setcouponshow('none')
          const nowamount = aftercoupanprise - result?.coupon?.coupon_value;
          setnone('block')
          setaftercoupanprise(nowamount)
        } else {
          var persentage = result?.coupon?.coupon_value;
          const value_of_persentage = parseInt((aftercoupanprise * persentage) / 100);
          toast.success(result.message);
          setsubtotal(aftercoupanprise)
          setcouponprice(value_of_persentage);
          setcouponshow('none')
          const nowamount = aftercoupanprise - value_of_persentage;
          setnone('block')
          setaftercoupanprise(nowamount)
        }

      } else {
        toast.error(result.message);
      }
    } else {
      toast.error('Please enter coupon code');
    }
  }
  const [counrty, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const getAllCountry = async () => {
    const responce = await fetch(`${apiUrl}/get_all_country`);
    const result = await responce.json();

    if (result.success === true) {
      setcountry(result?.country)
    } else {

    }
  }
  const getStateByCountry = async () => {
    const responce = await fetch(`${apiUrl}/get_state_by_country`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ short_name: 'IN' })
    });
    const result = await responce.json();
    if (result.success === true) {
      setstate(result?.state);
    } else {

    }

  };




  const checkoutHandler = async (e) => {
    e.preventDefault();
    let productDetails = []; // Declare an array to store product details
    // Iterate through each item in Cart and populate productDetails array
    Cart?.forEach((cartItem, index) => {
      const productDetail = {
        product_id: cartItem?.productid,
        productimg: cartItem?.productimg,
        product_name: cartItem?.productname,
        product_quantity: cartItem?.Quantity,
        product_weight: cartItem?.productWeight,
        product_price: cartItem?.productPrice,
      };

      productDetails.push(productDetail); // Add each product detail to the array
    });

    const newData = await {
      ...data,
      product_details: productDetails,
      country: 'india',
      // amount: TotalPrice,
      amount: aftercoupanprise,
      user_id: localStorage.getItem('user_id'),
      session_id: localStorage.getItem('session_id'),
      coupanAmount: couponprice,
    };
    const { data: { key } } = await axios.get(`https://www.app.decasys.in/api/getkey`)
    // const { data: { key } } = await axios.get("http://localhost:4000/api/getkey")
    const { data: { order } } = await axios.post(`${apiUrl}/checkout`, newData)
    // const { data: { order } } = await axios.post(`http://localhost:4000/api/v1/checkout`, newData)
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Celtic Sea Salt, Light Grey Celtic",
      description: "Pay Now",
      image: "https://www.decasys.in/images/logo/1.png",
      order_id: order.id,
      callback_url: `${apiUrl}/paymentverification`,
      // callback_url: `http://localhost:4000/api/v1/paymentverification`,
      prefill: {
        name: data?.user_name,
        email: data?.email,
        contact: data?.mobile,
      },
      notes: {
        "address": data?.address,
      },
      theme: {
        "color": "#76c603"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  const AddAddressData = async (id) => {
    const setaddress = await Address?.filter((ele) => ele._id == id)

    setdata({
      ...data,
      address: '',
      user_name: '',
      mobile: '',
      pincode: '',
      Counrty: '',
      state: '',
      city: '',
    });
    setdata({
      ...data,
      address: setaddress[0]?.address,
      user_name: setaddress[0]?.name,
      mobile: setaddress[0]?.mobile,
      pincode: setaddress[0]?.pincode,
      Counrty: 'india',
      state: setaddress[0]?.state,
      city: setaddress[0]?.city,
    })

  }


  const AddShippingAddressData = async (id) => {
    const setaddress = await Address?.filter((ele) => ele._id == id)

    setdata({
      ...data,
      address1: '',
      user_name1: '',
      mobile1: '',
      pincode1: '',
      Counrty1: '',
      state1: '',
      city1: '',
    });
    setdata({
      ...data,
      address1: setaddress[0]?.address,
      user_name1: setaddress[0]?.name,
      mobile1: setaddress[0]?.mobile,
      pincode1: setaddress[0]?.pincode,
      Counrty1: 'india',
      state1: setaddress[0]?.state,
      city1: setaddress[0]?.city,
    })

  }

  console.log('data', data)
  const handleInputChange = (e) => {
    setdata({ ...data, country: e.target.value });

  };
  const [displaynone, setDisplaynone] = useState('none')
  const ShippingAddress = () => {
    if (displaynone == 'none') {
      setDisplaynone('block');
    }
    if (displaynone == 'block') {
      setDisplaynone('none');
    }
  }

  return (
    <div>

      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Checkout section Start */}
      <section className="checkout-section-2 section-b-space">
        <div className="container-fluid-lg">
          <form onSubmit={checkoutHandler}>
            <div className="row g-sm-4 g-3">

              <div className="col-lg-8">
                <div className="left-sidebar-checkout">
                  <div className="checkout-detail-box">
                    <ul>
                      <li>
                        <div className="checkout-icon">
                          <lord-icon target=".nav-item" src="https://cdn.lordicon.com/ggihhudh.json" trigger="loop-on-hover" colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a" className="lord-icon">
                          </lord-icon>
                        </div>
                        <div className="checkout-box">
                          <div className="checkout-title">
                            <h4>Address</h4>
                          </div>
                          <div className="checkout-detail">
                            <div className="row g-4">

                              {Address.map((address, index) => {
                                return (<>
                                  <div className="col-xxl-6 col-lg-12 col-md-6">
                                    <div className="delivery-address-box">
                                      <div>
                                        <div className="form-check">
                                          <input className="form-check-input" onClick={() => AddAddressData(address?._id)} type="radio" name="jack" id="flexRadioDefault1" />
                                        </div>
                                        <ul className="delivery-address-detail">
                                          <li>
                                            <h4 className="fw-500">{address?.name}</h4>
                                          </li>
                                          <li>
                                            <p className="text-content"><span className="text-title">Address
                                              : </span>{address?.address}</p>
                                          </li>
                                          <li>
                                            <h6 className="text-content mb-0"><span className="text-title">Phone
                                              :</span>{address?.mobile}</h6>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div></>)
                              })}
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="checkout-icon">
                          <lord-icon target=".nav-item" src="https://cdn.lordicon.com/qmcsqnle.json" trigger="loop-on-hover" colors="primary:#0baf9a,secondary:#0baf9a" className="lord-icon">
                          </lord-icon>
                        </div>
                        <div className="checkout-box">
                          <div className="checkout-detail">
                            <div className="accordion accordion-flush custom-accordion" id="accordionFlushExample">
                              <div className="right-sidebar-box">
                                <div className="row">
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput" className="form-label">Full Name</label>
                                      <div className="custom-input">
                                        <input type="text"
                                          required
                                          className="form-control"
                                          value={data?.user_name}
                                          onChange={(e) => setdata({ ...data, user_name: e.target.value })}

                                          id="exampleFormControlInput" placeholder="Enter Full Name" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput2" className="form-label">Email Address</label>
                                      <div className="custom-input">
                                        <input type="email" required
                                          onChange={(e) => setdata({ ...data, email: e.target.value })}
                                          value={data?.email}

                                          className="form-control" id="exampleFormControlInput2" placeholder="Enter Email Address" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput3" className="form-label">Contact Number</label>
                                      <div className="custom-input">
                                        <input type="number" required
                                          value={data?.mobile}
                                          onChange={(e) => setdata({ ...data, mobile: e.target.value })}

                                          className="form-control" id="exampleFormControlInput3" placeholder="Enter Contact Number" maxLength={10} oninput="javascript: if (this.value.length > this.maxLength) this.value =
                                      this.value.slice(0, this.maxLength);" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput3" className="form-label">Alternate Number</label>
                                      <div className="custom-input">
                                        <input type="number"
                                          value={data?.altmobile}
                                          onChange={(e) => setdata({ ...data, altmobile: e.target.value })}
                                          className="form-control" id="exampleFormControlInput3" placeholder="Enter Alternate Number" maxLength={10} oninput="javascript: if (this.value.length > this.maxLength) this.value =
                                      this.value.slice(0, this.maxLength);" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput" className="form-label">Select Country</label>
                                      <div className="custom-input">
                                        <select className="form-control"
                                          value={data?.country} required
                                          // onChange={(e) => setdata({ ...data, country: e.target.value })}
                                          onChange={handleInputChange}
                                        >
                                          {/* <option>Select Country</option> */}
                                          {/* {counrty?.map((counrtys, index) => { */}
                                          <option value='india'>India</option>
                                          {/* return (<option value={counrtys?.isoCode}>{counrtys?.name}</option>) */}
                                          {/* })} */}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput" className="form-label">Select State</label>
                                      <div className="custom-input">
                                        <select required
                                          value={data?.state}
                                          onChange={(e) => setdata({ ...data, state: e.target.value })}
                                          className="form-control">
                                          <option>Select State</option>
                                          {state?.map((states, index) => {
                                            return (<option value={states?.name}>{states?.name}</option>)
                                          })}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput" className="form-label">City</label>
                                      <div className="custom-input">
                                        <input type="text" className="form-control"
                                          value={data?.city} required
                                          onChange={(e) => setdata({ ...data, city: e.target.value })}

                                          id="exampleFormControlInput" placeholder="Enter City" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlInput" className="form-label">Pincode</label>
                                      <div className="custom-input">
                                        <input type="text" className="form-control"
                                          value={data?.pincode} required
                                          onChange={(e) => setdata({ ...data, pincode: e.target.value })}
                                          id="exampleFormControlInput" placeholder="Enter Pincode" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="mb-md-2 mb-2 custom-form">
                                      <label htmlFor="exampleFormControlTextarea" className="form-label">Address</label>
                                      <div className="custom-textarea">
                                        <textarea className="form-control"
                                          value={data?.address} required
                                          onChange={(e) => setdata({ ...data, address: e.target.value })}
                                          id="exampleFormControlTextarea" placeholder="Enter Address" rows={2} defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="mb-md-3 mb-3 mt-3 mt-md-3 custom-form">
                                      <div className="custom-input">
                                        <input type="checkbox" onClick={ShippingAddress} className="" id="exampleFormControlInput" />&nbsp;
                                        <label htmlFor="exampleFormControlTextarea" className="form-label">I have a different Shipping address.</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* form1 end */}

                                {/* form different billing address Start */}
                                <div style={{ display: displaynone }}>
                                  <div className="checkout-detail mb-3">
                                    <div className="row g-4">
                                      {Address.map((address, index) => {
                                        return (<>
                                          <div className="col-xxl-6 col-lg-12 col-md-6">
                                            <div className="delivery-address-box">
                                              <div>
                                                <div className="form-check">
                                                  <input className="form-check-input" onClick={() => AddShippingAddressData(address?._id)} type="radio" name="jack1" id="flexRadioDefault1" />
                                                </div>
                                                <ul className="delivery-address-detail">
                                                  <li>
                                                    <h4 className="fw-500">{address?.name}</h4>
                                                  </li>
                                                  <li>
                                                    <p className="text-content"><span className="text-title">Address
                                                      : </span>{address?.address}</p>
                                                  </li>
                                                  <li>
                                                    <h6 className="text-content mb-0"><span className="text-title">Phone
                                                      :</span>{address?.mobile}</h6>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div></>)
                                      })}
                                    </div>
                                  </div>
                                  <div className="row" >
                                    <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlInput" className="form-label">Full Name</label>
                                        <div className="custom-input">
                                          <input type="text"

                                            className="form-control"
                                            value={data?.user_name1}
                                            onChange={(e) => setdata({ ...data, user_name1: e.target.value })}

                                            id="exampleFormControlInput" placeholder="Enter Full Name" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlInput3" className="form-label">Contact Number</label>
                                        <div className="custom-input">
                                          <input type="number"
                                            value={data?.mobile1}
                                            onChange={(e) => setdata({ ...data, mobile1: e.target.value })}
                                            className="form-control" id="exampleFormControlInput3" placeholder="Enter Contact Number" maxLength={10} oninput="javascript: if (this.value.length > this.maxLength) this.value =
                                      this.value.slice(0, this.maxLength);" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlInput" className="form-label">Select Country</label>
                                        <div className="custom-input">
                                          <select className="form-control"
                                            value={data?.country1}
                                            // onChange={(e) => setdata({ ...data, country: e.target.value })}
                                            onChange={handleInputChange}
                                          >
                                            {/* <option>Select Country</option> */}
                                            {/* {counrty?.map((counrtys, index) => { */}
                                            <option value='india'>India</option>
                                            {/* return (<option value={counrtys?.isoCode}>{counrtys?.name}</option>) */}
                                            {/* })} */}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlInput" className="form-label">Select State</label>
                                        <div className="custom-input">
                                          <select
                                            value={data?.state1}
                                            onChange={(e) => setdata({ ...data, state1: e.target.value })}
                                            className="form-control">
                                            <option>Select State</option>
                                            {state?.map((states, index) => {
                                              return (<option value={states?.name}>{states?.name}</option>)
                                            })}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlInput" className="form-label">City</label>
                                        <div className="custom-input">
                                          <input type="text" className="form-control"
                                            value={data?.city1}
                                            onChange={(e) => setdata({ ...data, city1: e.target.value })}

                                            id="exampleFormControlInput" placeholder="Enter City" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 col-xxl-6 col-lg-12 col-sm-6">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlInput" className="form-label">Pincode</label>
                                        <div className="custom-input">
                                          <input type="text" className="form-control"
                                            value={data?.pincode1}
                                            onChange={(e) => setdata({ ...data, pincode1: e.target.value })}
                                            id="exampleFormControlInput" placeholder="Enter Pincode" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="mb-md-2 mb-2 custom-form">
                                        <label htmlFor="exampleFormControlTextarea" className="form-label">Address</label>
                                        <div className="custom-textarea">
                                          <textarea className="form-control"
                                            value={data?.address1}
                                            onChange={(e) => setdata({ ...data, address1: e.target.value })}
                                            id="exampleFormControlTextarea" placeholder="Enter Address" rows={2} defaultValue={""} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* form different billing address end */}

                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="right-side-summery-box">
                  <div className="summery-box-2">
                    <div className="summery-header">
                      <h3>Order Summery</h3>
                    </div>
                    <ul className="summery-contain">

                      {Cart?.map((Carts, index) => {
                        // const total = Carts?.Quantity * (Carts?.productPrice ? (Carts?.productPrice) : 0);
                        // TotalPrice += total;

                        return (
                          <li>
                            <div className="checkout-pro-wrap">
                              <div className="row col-padd-5">
                                <div className="col-3 col-xxl-3 col-lg-3 col-padd-5">
                                  <img src={`${imgUrl}/${Carts?.productimg}`} className="img-fluid blur-up lazyloaded checkout-image" alt />
                                </div>
                                <div className="col-9 col-xxl-9 col-lg-9 col-padd-5">
                                  <div className="row">
                                    <div className="col-8 col-xxl-8 col-lg-8 col-padd-0">
                                      <h4>{Carts?.productname.substring(0, 120)}</h4>
                                    </div>
                                    <div className="col-4 col-xxl-4 col-lg-4">
                                      <h4 className="price pull-right"><strong>₹ {(Carts?.productPrice ? (Carts?.productPrice) : 0)}</strong></h4>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4 col-xxl-4 col-lg-4 col-padd-0">
                                      <h4 className="mt-1"><strong>Qty:</strong> {Carts?.Quantity}</h4>
                                    </div>
                                    <div className="col-8 col-xxl-8 col-lg-8">
                                      <h4 className="mt-1 pull-right"><strong>Total Price:</strong> ₹ {(Carts?.productPrice ? (Carts?.Quantity * Carts?.productPrice) : 0)}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>)
                      })}
                    </ul>
                    <ul>
                      <li style={{ width: '100%' }}>
                        <div className="qa-search-wrapper">
                          <div className="row g-4">
                            <div className="col-12 col-lg-12">
                              <div className="form-floating theme-form-floating">
                                <div className="search-box">
                                  <div className="input-group" >
                                    <input type="text" style={{ display: couponshow }} className="form-control" ame="coupon_apply" value={coupan} onChange={(e) => setCoupan(e.target.value)} placeholder="Please enter coupon code" />
                                    <button style={{ display: couponshow }} onClick={ApplyCoupan} className="btn theme-bg-color-wh m-0" type="button" id="button-addon1">
                                      Apply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <h4><input type="text" name="coupon_apply"  value={coupan}   onChange={(e) => setCoupan(e.target.value)} 
                      class="form-control fontsize rounded-0" placeholder="Enter Coupon Code"/></h4>
                       <h4><button className='' onClick={ApplyCoupan}  type='button'>Apply</button></h4> */}
                      </li>
                    </ul>

                    <ul className="summery-total">
                      <li>
                        <h4>Subtotal</h4>
                        <h4 className="price">₹ {subtotal}</h4>
                      </li>
                      {/* <li>
                      <h4>Shipping</h4>
                      <h4 className="price">Rs. 150</h4>
                    </li> */}
                      {/* <li>
                      <h4>Tax</h4>
                      <h4 className="price">Rs. 150</h4>
                    </li> */}
                      <li>
                        <h4 style={{ display: none }}>Coupon Applied</h4>
                        <h4 style={{ display: none }} className="price">Rs. {couponprice}</h4>
                      </li>
                      <li className="list-total">
                        <h4>Grand Total</h4>
                        <h4 className="price">₹ {aftercoupanprise}</h4>
                      </li>
                    </ul>
                  </div>
                  <button type="submit" className="btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold">Place Order</button>
                </div>
              </div>

            </div> </form>
        </div>
      </section>
      {/* Checkout section End */}
    </div>

  )
}
