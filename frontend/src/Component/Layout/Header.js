import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser, faSearch, faHome, faFolder } from '@fortawesome/free-solid-svg-icons';
import './Header.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartBySessionId, removecartbycartid } from '../../features/cartSlice';
import { getallWishlist } from '../../features/cartSlice';
import Brand from '../Page/Brand';
export default function Header() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const { Cart, Wishlist } = useSelector((state) => state?.cartSlice);
  const dispatch = useDispatch();
  const [ProductData, setProductData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const [user_id, setuser_id] = useState();
  const Authentication = async () => {
    try {
      const token = await localStorage.getItem('token');
      const user_id = await localStorage.getItem('user_id');
      setuser_id(user_id);
      setIsLogined(Boolean(token));
    } catch (error) {
      console.error('Error reading token from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }
  const [Brand, setbrand] = useState();
  const getbrand = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllbrand`
    );
    const result = await resource.json();
    setbrand(result?.brand);
  }

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const session_id1 = localStorage.getItem('user_id');
    // const data = { session_id: session_id ,user_id: session_id1};
    const data = { user_id: session_id1 };
    const data1 = { user_id: session_id1 };
    const checkToken = async () => {
      await Authentication();
      dispatch(getAllCartBySessionId(data));
      dispatch(getallWishlist(data1));
    };
    checkToken();
    fetchMenuData();
    fetchProduct();
    getbrand();
    if (searchTerm) {
      const filteredResults = ProductData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, user_id]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() === '') {
      document.querySelector('.search-results').style.height = '0vh';
    } else {
      document.querySelector('.search-results').style.height = 'auto';
    }
  };
  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllsubcategory`);
      setMenuData(response.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAllproduct`);
      setProductData(response?.data?.product);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
  ////////for logout 

  const Logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('agent_name');
    localStorage.removeItem('agent_email');
    localStorage.removeItem('agent_mobile');
    localStorage.removeItem('role');

    await navigate('/signin');
    toast.success('Logout Successfully');
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  const GetProductdetail = async (id) => {
    await navigate(`/ProductDetails/${id}`);
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }

  const RemoveCart = async (id) => {
    if (id) {
      dispatch(removecartbycartid(id));
    }
  }

  return (
    <>
      {/* Header Start */}
      <header>
        <div className="header-top">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-xxl-4 col-lg-4">
                <div className="header-offer">
                  <div className="notification-slider">
                    <div>

                    </div>
                    <div>
                      <div className="timer-notification">
                        <h6>
                          <Link to='/brand/664ae09db247e473f517bc5a' className="btn-t-1 text-black">
                            Free Shipping on All Orders.
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-lg-4">
                <div className="header-offer">
                  <div className="notification-slider">
                    <div>

                    </div>
                    <div>
                      <div className="timer-notification">
                        <h6>
                          <Link to='/brand/65e06a4b299335f107e67b14' className="btn-t-2 text-black">
                            Orders shipped within 5-7 working days.
                          </Link>

                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-lg-4 d-none">
                <div className="header-offer">
                  <div className="notification-slider">
                    <div>

                    </div>
                    <div>
                      <div className="timer-notification">
                        <h6>
                          <Link to='/categorylist' className="btn-t-3 text-black">
                            Orders shipped within 4 working days.
                          </Link>

                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-top-m">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xxl-12">
                <div className="header-offer">
                  <h6>
                    <Link to='/brand/65e06a4b299335f107e67b14'>
                      Free Shipping on All Orders.
                    </Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="top-nav top-header sticky-header">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="navbar-top">
                  <button
                    className="navbar-toggler d-xl-none d-inline navbar-menu-button"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#primaryMenu"
                  >
                    <span className="navbar-toggler-icon">
                      <i className="fa-solid fa-bars" />
                    </span>
                  </button>
                  <Link to="/" className="web-logo nav-logo" onClick={() => {
                    window.scrollTo(0, 0);
                  }}>
                    <img
                      src="https://www.decasys.in/images/logo/1.png"
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </Link>

                  <div className="header-nav">
                    <div className="header-nav-middle">
                      <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                        <div
                          className="offcanvas offcanvas-collapse order-xl-2"
                          id="primaryMenu"
                        >
                          <div className="offcanvas-header navbar-shadow">
                            <h5>Menu</h5>
                            <button
                              className="btn-close lead"
                              type="button"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            />
                          </div>
                          <div className="offcanvas-body">
                            <ul className="navbar-nav">
                              <li className="nav-item dropdown new-nav-item">
                                <Link className="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown">Shop by Category</Link>
                                <ul className="dropdown-menu">
                                  {menuData?.data?.map(menuItem => (
                                    menuItem.subcategories.length > 0 ? (
                                      <li key={menuItem.id} className="sub-dropdown-hover">
                                        <Link className="dropdown-item" href="javascript:void(0)">
                                          {menuItem?.category_name}
                                        </Link>
                                        {menuItem.subcategories && menuItem.subcategories.length > 0 && (
                                          <ul className="sub-menu">
                                            {menuItem?.subcategories.map(submenuItem => (
                                              <li key={submenuItem.id}>
                                                <Link className="dropdown-item" to={`/subcategorylist/${submenuItem._id}`}>
                                                  {submenuItem.subcategory}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ) : (
                                      <li key={menuItem.id} className="sub-dropdown-hover">
                                        <Link className="dropdown-item" to={`/categorylist/${menuItem._id}`}>
                                          {menuItem?.category_name}
                                        </Link>
                                      </li>
                                    )
                                  ))}
                                </ul>
                              </li>
                              <li className="nav-item dropdown new-nav-item">
                                <Link className="nav-link dropdown-toggle" href="javascript:void(0)" data-bs-toggle="dropdown">Brand</Link>
                                <ul className="dropdown-menu">
                                  {Brand?.map(menuItem => (

                                    <li key={menuItem.id} className="sub-dropdown">
                                      <Link className="dropdown-item" to={`/brand/${menuItem._id}`}>
                                        {menuItem?.brand}
                                      </Link>
                                    </li>

                                  ))}
                                </ul>
                              </li>
                              <li className="nav-item">
                                <Link to="/Contact"
                                  className="nav-link"
                                >
                                  Help
                                </Link>

                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="middle-box">
                    <div className="search-box">
                      <div className="input-group">
                        <input
                          className="form-control"
                          placeholder="I'm searching for..."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          type="text"
                          value={searchTerm}
                          onChange={handleChange}
                        />
                        <button className="btn" type="button" id="button-addon2">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                      <ul className="search-results">
                        {searchResults?.map((result, index) => (
                          <li key={index} className="search-item">
                            <div className="onhover-div">
                              <ul className="cart-list">
                                <li className="product-box-contain">
                                  <div className="drop-cart">
                                    <a href='#' onClick={(e) => GetProductdetail(result?._id)} className="drop-image">
                                      <img
                                        src={`${imgUrl}/${result?.images[0]?.image_name}`}
                                        className="blur-up lazyload"
                                        alt=""
                                      />
                                    </a>
                                    <div className="drop-contain">
                                      <a href='#' onClick={(e) => GetProductdetail(result?._id)} className="drop-image">
                                        <h5>{result.name}</h5>
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                  <div className="rightside-box">
                    <div className="search-full">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                          type="text"
                          className="form-control search-type"
                          placeholder="Search here.."
                        />
                        <span className="input-group-text close-search">
                          <i data-feather="x" className="font-light" />
                        </span>
                      </div>
                    </div>
                    <ul className="right-side-menu">
                      <li className="right-side">
                        <div className="delivery-login-box">
                          <div className="delivery-icon">
                            <div className="search-box">
                              <i data-feather="search" />
                            </div>
                          </div>
                        </div>
                      </li>

                      {

                        localStorage.getItem('user_id') ? (<li className="right-side onhover-dropdown">
                          <div className="delivery-login-box login-btn-top">
                            <div className="delivery-icon">
                              {/* <i class="fa fa-user-o" aria-hidden="true"></i> */}
                              &nbsp; Welcome
                            </div>
                            {/* <div className="delivery-detail">
                              <h6>Hello,</h6>
                              <h5>My Account</h5>
                            </div> */}
                          </div>
                          <div className="onhover-div onhover-div-login">
                            <ul className="user-box-name">
                              <li className="product-box-contain">
                                <Link to="/MyAccount">My Account</Link>
                              </li>
                              <li className="product-box-contain">
                                <a href='#' onClick={Logout}>Logout</a>
                              </li>
                            </ul>
                          </div>
                        </li>) : (<li className="right-side onhover-dropdown">
                          <div className="delivery-login-box login-btn-top">
                            <div className="delivery-icon">
                              <i class="fa fa-user-o" aria-hidden="true"></i> &nbsp;Sign In
                            </div>
                          </div>
                          <div className="onhover-div onhover-div-login">
                            <ul className="user-box-name">
                              <li className="product-box-contain">
                                <Link to="/signin">Log In</Link>
                              </li>
                              <li className="product-box-contain">
                                <Link to="/SignUp">New customer? <span style={{ color: '#7fc600', }}>Sign Up</span></Link>
                              </li>
                            </ul>
                          </div>
                        </li>)
                      }

                      {user_id ? (<><li className="right-side">
                        <Link
                          to="/Wishlist"
                          className="btn p-0 position-relative header-wishlist"
                        >
                          <i class="fa fa-heart-o" aria-hidden="true"></i>
                          <span className="position-absolute top-0 start-100 translate-middle badge">
                            {Wishlist?.length}
                          </span>
                        </Link>
                      </li></>) : (<><li className="right-side">
                        <Link
                          to="/Wishlist"
                          className="btn p-0 position-relative header-wishlist"
                        >
                          <i class="fa fa-heart-o" aria-hidden="true"></i>
                          <span className="position-absolute top-0 start-100 translate-middle badge">
                            {Wishlist?.length}
                          </span>
                        </Link>
                      </li></>)}

                      <li className="right-side">
                        <div className="onhover-dropdown header-badge">
                          <button
                            type="/cart"
                            className="btn p-0 position-relative header-wishlist"
                          >
                            <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge">
                              {Cart?.length}
                            </span>
                          </button>
                          <div className="onhover-div">
                            <ul className="cart-list">
                              {
                                Cart?.map((carts, index) => {
                                  return (
                                    <li className="product-box-contain">
                                      <div className="drop-cart">
                                        <Link to={`/ProductDetails/${carts?.productid}`} className="drop-image">
                                          <img src={`${imgUrl}/${carts?.productimg}`} className="img-fluid blur-up lazyload" alt="" />
                                        </Link>
                                        <div className="drop-contain">
                                          <Link to={`/ProductDetails/${carts?.productid}`}>
                                            <h5>{carts?.productname}</h5>
                                          </Link>
                                          <h6><strong>₹ </strong> {carts?.productPrice}</h6>
                                          <h6><strong>Qty:</strong> {carts?.Quantity}</h6>
                                          <button onClick={() => RemoveCart(carts?._id)} className="close-button close_button">
                                            <i className="fa-solid fa-xmark" />
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                            {
                              Cart?.length > 0 ? (
                                <>
                                  <div className="button-group">
                                    <Link to="/cart" className="btn btn-sm cart-button">
                                      View Cart
                                    </Link>
                                    {localStorage.getItem('user_id') ? (
                                      <Link
                                        to="/Checkout" className="btn btn-sm cart-button theme-bg-color text-white">
                                        Checkout
                                      </Link>
                                    ) : (
                                      <Link to="/signin" className="btn btn-sm cart-button theme-bg-color text-white">
                                        Log In to Checkout
                                      </Link>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>No Item In Cart</>)
                            }

                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header End */}

      <div className="banneroffer-bar sm-none">
        <div className="row">
          <div className="col-xxl-12 col-lg-12">
            <div >
              <Link to="/brand/65e06a4b299335f107e67b14">
                <img
                  src="images/vegetable/banner/banner-head.jpg"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="banneroffer-bar d-lg-none d-xs-block">
        <div className="row">
          <div className="col-xxl-12 col-lg-12">
            <div >
              <Link to="/brand/65e06a4b299335f107e67b14">
                <img
                  src="images/vegetable/banner/banner-head-m.jpg"
                  className="img-fluid"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>





      {/* mobile fix menu start */}
      <div className="mobile-menu d-md-none d-block mobile-cart">
        <ul>
          <li className="active">
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className="icli" />
              <span>Home</span>
            </Link>
          </li>
          <li className="mobile-category">
            <Link to="/categorylist">
              <FontAwesomeIcon icon={faFolder} className="icli" />
              <span>Category</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="search-box">
              <FontAwesomeIcon icon={faSearch} className="icli" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/signin" className="notifi-wishlist">
              <FontAwesomeIcon icon={faHeart} className="icli" />
              <span>My Wish</span>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} className="icli" />
              <span>Cart</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* mobile fix menu end */}</>
  )
}