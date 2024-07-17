import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { addCart, addWishlist, removecartbycartid, addCartDecreaseQuantity } from '../../features/cartSlice';
export default function Cart() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const { Cart } = useSelector((state) => state?.cartSlice);
  let TotalPrice = 0;
  const dispatch = useDispatch();
  const DecreaseQuantity = async (id, currentQuantity) => {
    if (currentQuantity == 1) {
      return toast.success('Minimum 1 Quantity is Required');
    }

    const selectedData = await Cart.find((item) => item?._id === id);
    // if(selectedData?.Quantity==1){
    //     return  toast.success('Minimum 1 Quantity is Required');
    // }
    const randomNum = Math.floor(Math.random() * 1000);
    const currentTime = Math.floor(Date.now() / 1000);
    const Session_id = await localStorage.getItem('session_id');
    if (!Session_id) {
      const genrateId = randomNum + 'cqoetb' + currentTime;
      await localStorage.setItem('session_id', genrateId);
    }
    const Quantity1 = parseInt(selectedData?.Quantity) - parseInt(2);
    const data = {
      productid: selectedData?.productid,
      Quantity: Quantity1,
      user_id: localStorage.getItem('user_id'),
      productimg: selectedData?.productimg,
      productWeight: selectedData?.productWeight,
      productPrice: selectedData?.productPrice,
      session_id: selectedData?.session_id,
      productname: selectedData?.productname,
    };
    const aaaa = await dispatch(addCartDecreaseQuantity(data));

  }

  const IncreaseQuantity = async (id) => {
    const selectedData = await Cart.find((item) => item?._id === id);
      if (selectedData?.Quantity == 2) {
       return alert('Max 2 Quantity');
      } 
      const randomNum = Math.floor(Math.random() * 1000);
    const currentTime = Math.floor(Date.now() / 1000);
    const Session_id = await localStorage.getItem('session_id');
    if (!Session_id) {
      const genrateId = randomNum + 'cqoetb' + currentTime;
      await localStorage.setItem('session_id', genrateId);
    }
    const data = {
      productid: selectedData?.productid,
      Quantity: selectedData?.Quantity,
      user_id: localStorage.getItem('user_id'),
      productimg: selectedData?.productimg,
      productWeight: selectedData?.productWeight,
      productPrice: selectedData?.productPrice,
      session_id: selectedData?.session_id,
      productname: selectedData?.productname,
    };
    const aaaa = await dispatch(addCart(data));

  }
  const navigate = useNavigate();
  const RemoveCart = async (id) => {
    if (id) {
      const response = await dispatch(removecartbycartid(id));
      if (response.payload.success === true) {
        if (Cart.length <= 1) {
          navigate('/')
        }
        // toast.success(response.payload.message);
        toast.success('Product removed from cart successfully');
      } else {
        toast.warn(response.payload.message);
      }



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
                      <a href="index.html">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Cart Section Start */}
      <section className="cart-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-5 g-3">
            <div className="col-md-8 col-xxl-8">
              {Cart?.map((Carts, index) => {
                const total = Carts?.Quantity * (Carts?.productPrice ? (Carts?.productPrice) : 0);
                console.log('ll', Carts?.productPrice)
                TotalPrice += total;

                return (
                  <div className="cart-table mb-4">
                    <div className="row">
                      <div className="col-2 col-xxl-2 plr-0">
                        <div className="product-detail">
                          <div className="product">
                            <Link to={`/ProductDetails/${Carts?.productid}`} className="product-image">
                              <img
                                src={`${imgUrl}/${Carts?.productimg}`}
                                className="img-fluid blur-up lazyload" alt />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-10 col-xxl-10">
                        <div className="row">
                          <div className="col-12 col-xxl-5">
                            <div className="product-detail">
                              <ul>
                                <li className="name">
                                  <Link to={`/ProductDetails/${Carts?.productid}`}>{Carts?.productname.substring(0, 200)}</Link>
                                  <br></br>
                                  {/* <Link to={`/ProductDetails/${Carts?.productid}`}>{Carts?.productname.substring(28, 200)}</Link> */}
                                </li>
                                <li className="text-content"><span className="text-title">Price:</span> ₹ {Carts?.productPrice}</li>
                                <li className="text-content"><span className="text-title">Weight:</span>  {Carts?.productWeight}</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-12 col-xxl-7 mtop-sm-4">
                            <div className="row">
                              <div className="col-4 col-xxl-4">
                                <div className="subtotal">
                                  <h4>Total</h4>
                                  <h5>₹ {total}</h5>
                                </div>
                              </div>
                              <div className="col-5 col-xxl-4">
                                <div className="quantity">
                                  <h4>Qty</h4>
                                  <div className="quantity-price">
                                    <div className="cart_qty">
                                      <div className="quantityes">
                                        <button type="button" onClick={() => DecreaseQuantity(Carts?._id, Carts?.Quantity)} className="decrementes" data-type="minus" data-field>
                                          -
                                        </button>
                                        <input className="value incrementss" type="text" name="quantity" Value={Carts?.Quantity} />
                                        <button type="button" onClick={() => IncreaseQuantity(Carts?._id)} className="incrementes" data-type="plus" data-field>
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-3 col-xxl-4">
                                <div className="save-remove mt-4">
                                  {/* <h4>Action</h4> */}
                                  <button onClick={() => RemoveCart(Carts?._id)} className="btn btn-sm cart-button remove close_button btn-save-remove" >Remove</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
            <div className="col-md-4 col-xxl-4">
              <div className="summery-box p-sticky">
                <div className="summery-header">
                  <h3>Cart Total</h3>
                </div>
                <div className="summery-contain">

                  <ul>
                    <li>
                      <h4>Subtotal</h4>
                      <h4 className="price">₹ {TotalPrice}</h4>
                    </li>

                  </ul>
                </div>
                <ul className="summery-total">
                  <li className="list-total border-top-0">
                    <h4>Total</h4>
                    <h4 className="price theme-color">₹ {TotalPrice}</h4>
                  </li>
                </ul>
                <div className="button-group cart-button">
                  <ul>
                    <li>
                      {localStorage.getItem('user_id') ? (
                        <Link to="/Checkout">
                          <a className="btn theme-bg-color proceed-btn fw-bold">
                            <span style={{ color: '#fff' }}>Proceed To Checkout</span>
                          </a>
                        </Link>
                      ) : (
                        <Link to="/signin">
                          <a className="btn theme-bg-color proceed-btn fw-bold">
                            <span style={{ color: '#fff' }}>Log In to Checkout</span>
                          </a>
                        </Link>
                      )}

                    </li>
                    <li>
                      <Link to="/">
                        <button className="btn btn-light shopping-button text-dark">
                          <i className="fa-solid fa-arrow-left-long" /> Return To Shopping
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      {/* Cart Section End */}
    </div >

  )
}
