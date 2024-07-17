import React, { useEffect, useState } from 'react';
import { getAgentDetails } from '../../features/agentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GetOrderBySessionIdOrUserId } from '../../features/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { removewishlistbywishlistid, addCart } from '../../features/cartSlice';
import { addAddress, getAgentAddress, editAddress } from '../../features/agentSlice';
import { DeleteAddress } from '../../features/agentSlice';



export default function AccountPage() {
    const { Wishlist } = useSelector((state) => state?.cartSlice);
    const { Order } = useSelector((state) => state?.orderSlice);
    const apiUrl = process.env.REACT_APP_API_URL;
    const imgUrl = process.env.REACT_APP_IMAGE_URL;
    const { Agent, Address } = useSelector((state) => state?.agentSlice);
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const closeSidebar = () => {
        setMenuVisible(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(getAgentDetails());
        dispatch(GetOrderBySessionIdOrUserId({
            user_id: localStorage.getItem('user_id'),
            session_id: localStorage.getItem('session_id')
        }));
        dispatch(getAgentAddress(localStorage.getItem('user_id')));
        getStateByCountry();
    }, []);


    const navigate = useNavigate();

    const removewishlist = async (id) => {
        if (id) {
            const response = await dispatch(removewishlistbywishlistid(id));
            if (response.payload.success === true) {
                if (Wishlist.length <= 1) {
                    navigate('/')
                }
                toast.success('Remove from wishlist successfully');
            } else {
                toast.warn(response.payload.message);
            }
        }
    }

    const [address, setaddress] = useState([]);

    const SaveAddress = async (e) => {
        e.preventDefault(); const update = { ...address, user_id: localStorage.getItem('user_id'), Country: 'india' };
        const response = await dispatch(addAddress(update));
        console.log(response)
        if (response?.payload?.success === true) {
            toast.success(response.payload.message);
        } else {
            toast.warn(response.payload.message);
        }

    }
    const [addressid, setaddressid] = useState('')
    const handleRemove = async (addressId) => {
        setaddressid('');
        setaddressid(addressId);

    }
    const handleEdit = async (addressId) => {
        setaddressid('');
        setaddressid(addressId);
        const editaddress = await Address.filter((item) => item?._id == addressId);
        setaddress(editaddress[0]);
    }

    const EditAddress = async (e) => {
        e.preventDefault();
        const response = await dispatch(editAddress(address));
        if (response?.payload?.success === true) {
            toast.success(response.payload.message);
        } else {
            toast.warn(response.payload.message);
        }
    }

    const RemoveAddress = async () => {
        const response = await dispatch(DeleteAddress(addressid));
        if (response?.payload?.success === true) {
            toast.success(response.payload.message);
        } else {
            toast.warn(response.payload.message);
        }
    }

    const [formData, setFormData] = useState({
        _id: localStorage.getItem('user_id'),
        agent_name: "",
        agent_email: "",
        agent_mobile: "",
        gstno: "",
        company_name: "",
    });

    const ProfileEdit = async (e) => {
        e.preventDefault();
        const responce = await fetch(`${apiUrl}/EditAgentDetails/${formData?._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        const result = await responce.json();
        if (result.success === true) {
            toast.success('Update Profile Successfully');
            setTimeout(() => {
                window.location.reload(false);
            }, 500);
        } else {
            toast.success('Not Update Profile')
        }
    }

    const addtocart = async (id) => {
        const selectedData = await Wishlist?.find((item) => item?.productid === id);

        const user_id = localStorage.getItem('user_id');
        const randomNum = Math.floor(Math.random() * 1000);
        const currentTime = Math.floor(Date.now() / 1000);

        const Session_id = await localStorage.getItem('session_id');
        if (!Session_id) {
            const genrateId = randomNum + 'cqoetb' + currentTime;
            await localStorage.setItem('session_id', genrateId);
        }
        const data = {
            productid: selectedData?.productid,
            Quantity: 1,
            user_id: localStorage.getItem('user_id'),
            productimg: selectedData?.productimg,
            productWeight: selectedData?.productWeight,
            productPrice: selectedData?.productPrice,
            session_id: localStorage.getItem('session_id'),
            productname: selectedData?.productname,
        };
        const aaaa = await dispatch(addCart(data));
        if (aaaa.payload.success === true) {
            toast.success(aaaa.payload.message);
            dispatch(removewishlistbywishlistid(selectedData?._id));
        } else {
            toast.warn(aaaa.payload.message);
        }
    }

    const setroute = async (id, ids) => {
        if (id === 'pills-order-tab') {
            const tabPaneElement = document.getElementById('pills-address-tab');
            const tabPaneElement1 = document.getElementById('pills-wishlist-tab');
            const tabPaneElement2 = document.getElementById('pills-order-tab');
            const tabPaneElement3 = document.getElementById('pills-profile-tab');
            const tabPaneElement4 = document.getElementById('pills-dashboard-tab');
            tabPaneElement2.classList.add('active', 'show');
            tabPaneElement1.classList.remove('active', 'show');
            tabPaneElement.classList.remove('active', 'show');
            tabPaneElement3.classList.remove('active', 'show');
            tabPaneElement4.classList.remove('active', 'show');
        }
        if (id === 'pills-wishlist-tab') {
            const tabPaneElement = document.getElementById('pills-address-tab');
            const tabPaneElement1 = document.getElementById('pills-wishlist-tab');
            const tabPaneElement2 = document.getElementById('pills-order-tab');
            const tabPaneElement3 = document.getElementById('pills-profile-tab');
            const tabPaneElement4 = document.getElementById('pills-dashboard-tab');
            tabPaneElement.classList.remove('active', 'show');
            tabPaneElement1.classList.add('active', 'show');
            tabPaneElement2.classList.remove('active', 'show');
            tabPaneElement3.classList.remove('active', 'show');
            tabPaneElement4.classList.remove('active', 'show');
        }

        if (ids === 'pills-order') {
            const tabPaneElement = document.getElementById('pills-order');
            const tabPaneElement1 = document.getElementById('pills-address');
            const tabPaneElement2 = document.getElementById('pills-wishlist');
            const tabPaneElement3 = document.getElementById('pills-profile');
            const tabPaneElement4 = document.getElementById('pills-dashboard');
            tabPaneElement.classList.add('active', 'show');
            tabPaneElement1.classList.remove('active', 'show');
            tabPaneElement2.classList.remove('active', 'show');
            tabPaneElement3.classList.remove('active', 'show');
            tabPaneElement4.classList.remove('active', 'show');
        }
        if (ids === 'pills-wishlist') {
            const tabPaneElement = document.getElementById('pills-order');
            const tabPaneElement1 = document.getElementById('pills-address');
            const tabPaneElement2 = document.getElementById('pills-wishlist');
            const tabPaneElement3 = document.getElementById('pills-profile');
            const tabPaneElement4 = document.getElementById('pills-dashboard');
            tabPaneElement.classList.remove('active', 'show');
            tabPaneElement1.classList.remove('active', 'show');
            tabPaneElement2.classList.add('active', 'show');
            tabPaneElement3.classList.remove('active', 'show');
            tabPaneElement4.classList.remove('active', 'show');
        }


    }
    const [state, setstate] = useState([]);
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
    const editProfiledataadd = async () => {
        setFormData(Agent[0]);
    }
   const [pass,setPass]=useState();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(pass?.newconfpass!==pass?.newpass){
            return toast.error('Plz Enter New Password And New Confirm Password Same');
        }
     const data1=await {...pass,agent_email:Agent[0]?.agent_email}
      try {
        const response = await fetch(`${apiUrl}/resetPassword`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data1)
        });
  
        const data = await response.json();
  
        if (data.success) {
         toast.success(data.message)
        
        } else {
            toast.warn(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.warn('An error occurred. Please try again later.');
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
                                        <li className="breadcrumb-item active">My Account</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="user-dashboard-section section-b-space">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-xxl-3 col-lg-4">
                            <div className={`dashboard-left-sidebar ${isMenuVisible ? 'show' : ''}`}>
                                <div className="close-button d-flex d-lg-none">
                                    <button className="close-sidebar" onClick={closeSidebar}>
                                        <i className="fa-solid fa-xmark" />
                                    </button>
                                </div>
                                <div className="profile-box">
                                    <div className="cover-image">
                                        <img src="images/inner-page/cover-img.jpg" className="img-fluid blur-up lazyload" alt />
                                    </div>
                                    <div className="profile-contain">
                                        <div className="profile-image">
                                            <div className="position-relative">
                                                <img src="images/inner-page/user/1.jpg" className="blur-up lazyload update_img" alt />
                                            </div>
                                        </div>
                                        <div className="profile-name">
                                            <h3>{Agent[0]?.agent_name}</h3>
                                        </div>
                                    </div>
                                </div>
                                <ul className="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation" onClick={closeSidebar}>
                                        <button className="nav-link active" id="pills-dashboard-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard"
                                            aria-selected="true"><i data-feather="home" />
                                            Dashboard</button>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={closeSidebar}>
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                            aria-selected="false"><i data-feather="user" />
                                            Profile</button>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={closeSidebar}>
                                        <button className="nav-link" id="pills-order-tab"
                                            data-bs-toggle="pill" data-bs-target="#pills-order"
                                            type="button" role="tab" aria-controls="pills-order" aria-selected="false">
                                            <i data-feather="shopping-bag" />Order</button>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={closeSidebar}>
                                        <button className="nav-link" id="pills-wishlist-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-wishlist" type="button" role="tab" aria-controls="pills-wishlist"
                                            aria-selected="false"><i data-feather="heart" />
                                            Wishlist</button>
                                    </li>
                                    <li className="nav-item" role="presentation" onClick={closeSidebar}>
                                        <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-address" type="button" role="tab" aria-controls="pills-address"
                                            aria-selected="false"><i data-feather="map-pin" />
                                            Address</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xxl-9 col-lg-8 wid-100">
                            <button className="btn left-dashboard-show btn-animation fw-bold d-block d-lg-none" onClick={toggleMenu} style={{ width: '100%' }}>Click Here for Open Menu</button>
                            <div className="dashboard-right-sidebar">
                                <div className="tab-content" id="pills-tabContent">

                                    <div className="tab-pane fade show active" id="pills-dashboard" role="tabpanel" aria-labelledby="pills-dashboard-tab">
                                        <div className="dashboard-home">
                                            <div className="title">
                                                <h2>Dashboard</h2>
                                            </div>
                                            <div className="dashboard-user-name">
                                                <h6 className="text-content">Hello, <b className="text-title">{Agent[0]?.agent_name}</b></h6>
                                            </div>
                                            <div className="total-box">
                                                <div className="row g-sm-4 g-3">
                                                    <div className="col-6 col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div className="totle-contain" onClick={() => setroute('pills-order-tab', 'pills-order')}>
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" className="img-1 blur-up lazyload" alt />
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" className="blur-up lazyload" alt />
                                                            <div className="totle-detail">
                                                                <h5>All Orders</h5>
                                                                <h3>{Order?.length}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6 d-lg-block sm-none">
                                                        <div className="totle-contain">
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" className="img-1 blur-up lazyload" alt />
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" className="blur-up lazyload" alt />
                                                            <div className="totle-detail">
                                                                <h5>Pending Orders</h5>
                                                                <h3>0</h3>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-6 col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div className="totle-contain" onClick={() => setroute('pills-wishlist-tab', 'pills-wishlist')}>
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" className="img-1 blur-up lazyload" alt />
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" className="blur-up lazyload" alt />
                                                            <div className="totle-detail">
                                                                <h5>Wishlist</h5>
                                                                <h3>{Wishlist?.length}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dashboard-title">
                                                <h3>Account Information</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-xxl-6">
                                                    <div className="dashboard-info-sec">
                                                        <div className="dashboard-contant-title">
                                                            <h4>Contact Details</h4>
                                                        </div>
                                                        <div className="dashboard-detail">
                                                            <h6 className="text-content"><strong>Name:</strong> {Agent[0]?.agent_name}</h6>
                                                            <h6 className="text-content"><strong>Email:</strong> {Agent[0]?.agent_email}</h6>
                                                            <h6 className="text-content"><strong>Contact No.:</strong> {Agent[0]?.agent_mobile}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xxl-6">
                                                    <div className="dashboard-info-sec">
                                                        <div className="dashboard-contant-title">
                                                            <h4>Company Details</h4>
                                                        </div>
                                                        <div className="row g-4">
                                                            <div className="col-xxl-12">
                                                                <div className="dashboard-detail">
                                                                    <h6 className="text-content"><strong>Company Name:</strong> {Agent[0]?.company_name}</h6>
                                                                    <h6 className="text-content"><strong>GST No.:</strong> {Agent[0]?.gstno}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="dashboard-profile">
                                            <div className="title">
                                                <h2>My Profile</h2>
                                            </div>

                                            {/* Personal informetion Start */}
                                            <div className="row g-4">
                                                <div className="col-12 col-xxl-6">
                                                    <div className="profile-detail dashboard-bg-box">
                                                        <div className="dashboard-title">
                                                            <h3>Personal Information</h3>
                                                        </div>
                                                        <div className="profile-name-detail">
                                                            <div className="align-items-center d-block">
                                                                <h3>Name : {Agent[0]?.agent_name},</h3>
                                                                <h3>Company Name : {Agent[0]?.company_name},</h3>
                                                                <h3>GST No. : {Agent[0]?.gstno}</h3>
                                                            </div>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal" onClick={editProfiledataadd} data-bs-target="#editProfile">Edit</a>
                                                        </div>
                                                        <div className="location-profile">
                                                            <ul>
                                                                {/* <li>
                                                                    <div className="location-box">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                                                        <h6>{Agent[0]?.agent_email}</h6>
                                                                    </div>
                                                                </li> */}
                                                                <li>
                                                                    <div className="location-box">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                                        <h6>{Agent[0]?.agent_mobile}</h6>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xxl-6">
                                                    {/* Login Details Start */}
                                                    <div className="profile-detail dashboard-bg-box">
                                                        <div className="dashboard-title">
                                                            <h3>Login Details</h3>
                                                        </div>
                                                        <div className="profile-name-detail">
                                                            <div className="align-items-center d-block">
                                                                <h3>Email Id : {Agent[0]?.agent_email}</h3>
                                                                <h3>Password : ●●●●●●</h3>
                                                            </div>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editLoginDetails">Edit</a>
                                                        </div>
                                                    </div>
                                                    {/* Login Details Start */}
                                                </div>
                                            </div>
                                            {/* Personal informetion Start */}
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show" id="pills-order" role="tabpanel" aria-labelledby="pills-order-tab">
                                        <div className="dashboard-order">
                                            <div className="title">
                                                <h2>Order History</h2>
                                            </div>
                                            <div className="order-contain">
                                                {Order?.map((orders, index) => {
                                                    return (<><div className="order-box dashboard-bg-box">
                                                        <div className="order-container">
                                                            <div className="order-icon">
                                                                <i data-feather="box" />
                                                            </div>
                                                            <div className="order-detail">
                                                                <h4>Payment Status <span>{orders?.payment_status}</span></h4>
                                                            </div>
                                                            <div className="order-detail">
                                                                <Link to={`https://ship.nimbuspost.com/shipping/tracking/${orders?.tracking_details[0]?.awb_number}`}
                                                                    target="_blank" rel="noopener noreferrer">
                                                                    <h4><span>Check Tracking </span></h4>
                                                                </Link>
                                                            </div>
                                                            <div className="order-detail">
                                                                <Link to={`/invoice/${orders._id}`} target="_blank" rel="noopener noreferrer">
                                                                    <h4><span> Download Invoice </span></h4>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="product-order-detail">
                                                            <div class="row">
                                                                <div class="col-3 col-xxl-2 col-lg-2 col-md-3">
                                                                    <Link to={`/ProductDetails/${orders?.product_details[0]?.product_id}`}>
                                                                        <img
                                                                            src={`${imgUrl}/${orders?.product_details[0]?.productimg}`}
                                                                            className="img-fluid blur-up lazyloaded" alt />
                                                                    </Link>
                                                                </div>
                                                                <div class="col-9 col-xxl-10 col-lg-10 col-md-9">
                                                                    <div className="order-wrap">
                                                                        <Link to={`/ProductDetails/${orders?.product_details[0]?.product_id}`}>
                                                                            <h3>{orders?.product_details[0]?.product_name}</h3>
                                                                        </Link>

                                                                        <ul className="product-size">
                                                                            <li>
                                                                                <div className="size-box">
                                                                                    <h6 className="text-content">Price:&nbsp;₹</h6>
                                                                                    <h5>{orders?.product_details[0]?.product_price}</h5>
                                                                                </div>
                                                                            </li>
                                                                            {/* <li>
                                                                                <div className="size-box">
                                                                                    <h6 className="text-content">Rate : </h6>
                                                                                    <div className="product-rating ms-2">
                                                                                        <ul className="rating">
                                                                                            <li>
                                                                                                <i data-feather="star" className="fill" />
                                                                                            </li>
                                                                                            <li>
                                                                                                <i data-feather="star" className="fill" />
                                                                                            </li>
                                                                                            <li>
                                                                                                <i data-feather="star" className="fill" />
                                                                                            </li>
                                                                                            <li>
                                                                                                <i data-feather="star" className="fill" />
                                                                                            </li>
                                                                                            <li>
                                                                                                <i data-feather="star" />
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </li> */}
                                                                            <li>
                                                                                <div className="size-box">
                                                                                    <h6 className="text-content">Quantity : </h6>
                                                                                    <h5>{orders?.product_details[0]?.product_quantity}</h5>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="size-box">
                                                                                    <h6 className="text-content">Weight : </h6>
                                                                                    <h5>{orders?.product_details[0]?.product_weight}</h5>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div></>)
                                                })}


                                                {/* <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box" />
                                                        </div>
                                                        <div className="order-detail">
                                                            <h4>Delivered <span className="success-bg">Success</span></h4>
                                                            <h6 className="text-content">Cheese on toast cheesy grin cheesy grin
                                                                cottage cheese caerphilly everyone loves cottage cheese the big
                                                                cheese.</h6>
                                                        </div>
                                                    </div>
                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="images/vegetable/product/2.png" alt className="blur-up lazyload" />
                                                        </a>
                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>Cold Brew Coffee Instant Coffee 50 g</h3>
                                                            </a>
                                                            <p className="text-content">Pecorino paneer port-salut when the cheese
                                                                comes out everybody's happy red leicester mascarpone blue
                                                                castello cauliflower cheese.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" />
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box" />
                                                        </div>
                                                        <div className="order-detail">
                                                            <h4>Delivere <span>Panding</span></h4>
                                                            <h6 className="text-content">Cheesy grin boursin cheesy grin cheesecake
                                                                blue castello cream cheese lancashire melted cheese.</h6>
                                                        </div>
                                                    </div>
                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="images/vegetable/product/3.png" alt className="blur-up lazyload" />
                                                        </a>
                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>Peanut Butter Bite Premium Butter Cookies 600 g</h3>
                                                            </a>
                                                            <p className="text-content">Cow bavarian bergkase mascarpone paneer
                                                                squirty cheese fromage frais cheese slices when the cheese comes
                                                                out everybody's happy.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" />
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="order-box dashboard-bg-box">
                                                    <div className="order-container">
                                                        <div className="order-icon">
                                                            <i data-feather="box" />
                                                        </div>
                                                        <div className="order-detail">
                                                            <h4>Delivered <span className="success-bg">Success</span></h4>
                                                            <h6 className="text-content">Caerphilly port-salut parmesan pecorino
                                                                croque monsieur dolcelatte melted cheese cheese and wine.</h6>
                                                        </div>
                                                    </div>
                                                    <div className="product-order-detail">
                                                        <a href="product-left-thumbnail.html" className="order-image">
                                                            <img src="images/vegetable/product/4.png" className="blur-up lazyload" alt />
                                                        </a>
                                                        <div className="order-wrap">
                                                            <a href="product-left-thumbnail.html">
                                                                <h3>SnackAmor Combo Pack of Jowar Stick and Jowar Chips</h3>
                                                            </a>
                                                            <p className="text-content">The big cheese cream cheese pepper jack
                                                                cheese slices danish fontina everyone loves cheese on toast
                                                                bavarian bergkase.</p>
                                                            <ul className="product-size">
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Price : </h6>
                                                                        <h5>$20.68</h5>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Rate : </h6>
                                                                        <div className="product-rating ms-2">
                                                                            <ul className="rating">
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" className="fill" />
                                                                                </li>
                                                                                <li>
                                                                                    <i data-feather="star" />
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Sold By : </h6>
                                                                        <h5>Fresho</h5>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="size-box">
                                                                        <h6 className="text-content">Quantity : </h6>
                                                                        <h5>250 G</h5>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show" id="pills-wishlist" role="tabpanel" aria-labelledby="pills-wishlist-tab">
                                        <div className="dashboard-wishlist">
                                            <div className="title">
                                                <h2>Wishlist</h2>
                                            </div>
                                            <div className="row g-sm-4 g-3">
                                                {Wishlist?.map((Wishlist1, index) => {

                                                    return (<>   <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                                        <div className="product-box-3 theme-bg-white h-100">
                                                            <div className="product-header">
                                                                <div className="product-image">
                                                                    <Link to={`/ProductDetails/${Wishlist1?.productid}`}>
                                                                        <img
                                                                            src={`${imgUrl}/${Wishlist1?.productimg}`}
                                                                            className="img-fluid blur-up lazyload" alt />
                                                                    </Link>
                                                                    <div className="product-header-top">
                                                                        <button onClick={(e) => removewishlist(Wishlist1._id)} className="btn wishlist-button close_button">
                                                                            <FontAwesomeIcon icon={faTimes} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-footer">
                                                                <div className="product-detail">
                                                                    <a href="product-left-thumbnail.html">
                                                                        <h5 className="name">{Wishlist1?.productname}  </h5>
                                                                    </a>
                                                                    <h6 className="unit mt-1">{Wishlist1?.productWeight}</h6>
                                                                    <h5 className="price">
                                                                        <span className="theme-color">  ₹ {Wishlist1?.productPrice}</span>
                                                                    </h5>
                                                                    <div className="add-to-cart-box  mt-2">
                                                                        {Wishlist1?.Stock > 0 ? (
                                                                            <button
                                                                                type='button'
                                                                                className="btn btn-add-cart addcart-button"
                                                                                onClick={() => addtocart(Wishlist1?.productid)}
                                                                            >
                                                                                Add to Cart
                                                                            </button>
                                                                        ) : (<Link to={`/ProductDetails/${Wishlist1?.productid}`}> <button className="btn btn-add-cart addcart-button">Out Of Stock
                                                                        </button></Link>)}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> </>)

                                                })}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade show" id="pills-address" role="tabpanel" aria-labelledby="pills-address-tab">
                                        <div className="dashboard-address">
                                            <div className="title title-flex">
                                                <div>
                                                    <h2>Address</h2>
                                                </div>
                                                <button className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                                                    data-bs-toggle="modal" data-bs-target="#add-address"><i data-feather="plus"
                                                        className="me-2" /> Add New Address</button>
                                            </div>
                                            <div className="row g-sm-4 g-3">

                                                {Address.map((address, index) => {
                                                    return (<>
                                                        <div className="col-12 col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                                                            <div className="address-box">
                                                                <div>
                                                                    {/* <div className="form-check">
                                                                        <input className="form-check-input" type="radio" name="jack" id="flexRadioDefault4" />
                                                                    </div> */}
                                                                    <div className="table-responsive address-table">
                                                                        <table className="table">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td colSpan={2}>{address?.name}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Address :</td>
                                                                                    <td>
                                                                                        <p>{address?.address}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Country :</td>
                                                                                    <td>
                                                                                        <p>{address?.Country}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>State :</td>
                                                                                    <td>
                                                                                        <p>{address?.state}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>City :</td>
                                                                                    <td>
                                                                                        <p>{address?.city}</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Pin Code :</td>
                                                                                    <td>{address?.pincode}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Phone :</td>
                                                                                    <td>{address?.mobile}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div className="button-group">
                                                                    <button className="btn btn-sm add-button w-100" onClick={() => handleEdit(address?._id)} data-bs-toggle="modal" data-bs-target="#edit-address"><i data-feather="edit" />
                                                                        Edit</button>
                                                                    <button
                                                                        onClick={() => handleRemove(address?._id)}
                                                                        className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#removeProfile"><i data-feather="trash-2" />
                                                                        Remove</button>
                                                                </div>
                                                            </div>
                                                        </div></>)
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                        {/* Remove Profile Modal Start */}
                                        <div className="modal fade theme-modal remove-profile" id="removeProfile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                                                <div className="modal-content">
                                                    <div className="modal-header d-block text-center">
                                                        <h5 className="modal-title w-100" id="exampleModalLabel22">Are You Sure ?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                            <i className="fa-solid fa-xmark" />
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="remove-box">
                                                            <p>The permission for the use/group, preview is inherited from the object, object will create a
                                                                new permission for this object</p>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-animation btn-md fw-bold" data-bs-dismiss="modal">No</button>
                                                        <button type="button" onClick={RemoveAddress} className="btn theme-bg-color btn-md fw-bold text-light" >Yes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Remove Profile Modal End */}
                                    </div>

                                    {/* Edit Profile Start */}
                                    <div className="modal fade theme-modal" id="editProfile" tabIndex={-1} aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                        <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel2">Edit Profile</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        <i className="fa-solid fa-xmark" />
                                                    </button>
                                                </div>
                                                <form onSubmit={ProfileEdit}>
                                                    <div className="modal-body">
                                                        <div className="row g-4">
                                                            <div className="col-6 col-xxl-6">
                                                                <label htmlFor="pname">Name</label>
                                                                <div className="form-floating theme-form-floating">
                                                                    <input type="text"
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                agent_name: e.target.value,
                                                                            })
                                                                        }
                                                                        value={formData?.agent_name}
                                                                        placeholder=''

                                                                        className="form-control" id="pname" />
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-6 col-xxl-6">
                                                                <label htmlFor="pname">Email</label>
                                                                <div className="form-floating theme-form-floating">
                                                                    <input type="email"
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                agent_email: e.target.value,
                                                                            })
                                                                        }
                                                                        value={formData?.agent_email}
                                                                        className="form-control" id="email1" defaultValue="admin@gmail.com" />
                                                                </div>
                                                            </div> */}
                                                            <div className="col-6 col-xxl-6">
                                                                <label htmlFor="pname">Contact No.</label>
                                                                <div className="form-floating theme-form-floating">
                                                                    <input className="form-control"
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                agent_mobile: e.target.value,
                                                                            })
                                                                        }
                                                                        value={formData?.agent_mobile}
                                                                        type="tel" name="mobile" id="mobile" maxLength={10} oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" />
                                                                    {/* <label htmlFor="mobile">{Agent[0]?.agent_mobile}</label> */}
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <label htmlFor="pname">Company Name</label>
                                                                <div className="form-floating theme-form-floating">
                                                                    <input type="text"
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                company_name: e.target.value,
                                                                            })
                                                                        }
                                                                        value={formData?.company_name}

                                                                        className="form-control" id="pname" defaultValue="Decasys" />
                                                                    {/* <label htmlFor="pname">{Agent[0]?.company_name}</label> */}
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xxl-6">
                                                                <label htmlFor="pname">GST No.</label>
                                                                <div className="form-floating theme-form-floating">
                                                                    <input type="text"
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                gstno: e.target.value,
                                                                            })
                                                                        }
                                                                        value={formData?.gstno}

                                                                        className="form-control" id="pname" defaultValue="GSHJ8847574O5" />
                                                                    {/* <label htmlFor="pname">{Agent[0]?.gstno}</label> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-animation btn-md fw-bold" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" data-bs-dismiss="modal" className="btn theme-bg-color btn-md fw-bold text-light">Save changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Edit Profile End */}

                                    {/* Edit Login Details Start */}
                                    <div className="modal fade theme-modal" id="editLoginDetails" tabIndex={-1} aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                        <div className="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel2">Edit Login Details</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        <i className="fa-solid fa-xmark" />
                                                    </button>
                                                </div>
                                                <form onSubmit={handleSubmit}>
                                                <div className="modal-body">
                                                    <div className="row g-4">
                                                        <div className="col-12 col-xxl-12">
                                                            <label htmlFor="pname">Email</label>
                                                            <div className="form-floating theme-form-floating">
                                                                <input type="email" disabled value={Agent[0]?.agent_email} className="form-control" id="email1" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-xxl-12">
                                                            <label htmlFor="pname">Old Password</label>
                                                            <div className="form-floating theme-form-floating">
                                                                <input type="text"  name='oldpass' onChange={(e)=>setPass({ ...pass, [e.target.name]: e.target.value })}  className="form-control" id="pname"  />
                                                             </div>
                                                        </div>
                                                        <div className="col-12 col-xxl-12">
                                                            <label htmlFor="pname">New Password</label>
                                                            <div className="form-floating theme-form-floating">
                                                                <input type="text" name='newpass' onChange={(e)=>setPass({ ...pass, [e.target.name]: e.target.value })}  className="form-control" id="pname"  />
                                                             </div>
                                                        </div>
                                                        <div className="col-12 col-xxl-12">
                                                            <label htmlFor="pname">New Confirm Password</label>
                                                            <div className="form-floating theme-form-floating">
                                                                <input type="text" name='newconfpass' onChange={(e)=>setPass({ ...pass, [e.target.name]: e.target.value })}  className="form-control" id="pname"  />
                                                             </div>
                                                        </div>
                                                     </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-animation btn-md fw-bold" data-bs-dismiss="modal">Close</button>
                                                    <button type="submit" 
                                                    // data-bs-dismiss="modal" 
                                                    className="btn theme-bg-color btn-md fw-bold text-light" data-bs-dismiss="modal"  >Save changes</button>
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Edit Login Details End */}

                                    {/* <!-- Add address modal box start --> */}
                                    <div className="modal fade theme-modal" id="add-address" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Add a new address</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        <i className="fa-solid fa-xmark" />
                                                    </button>
                                                </div>
                                                <form onSubmit={SaveAddress}>
                                                    <div className="modal-body">
                                                        <div className="row g-4">
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-2 theme-form-floating">
                                                                    <input type="text" onChange={(e) => setaddress({ ...address, name: e.target.value })} className="form-control" id="fname" placeholder="Enter First Name" />
                                                                    <label htmlFor="fname">Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-2 theme-form-floating">
                                                                    <input type="number" className="form-control" onChange={(e) => setaddress({ ...address, mobile: e.target.value })} id="number" placeholder="Enter Mobile No." />
                                                                    <label htmlFor="number">Contact No</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xxl-12">
                                                                <div className="form-floating mb-2 theme-form-floating">
                                                                    <textarea className="form-control" onChange={(e) => setaddress({ ...address, address: e.target.value })} placeholder="Leave a comment here" id="address" style={{ height: 100 }} defaultValue={""} />
                                                                    <label htmlFor="address">Address</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-2 theme-form-floating">
                                                                    <select className="form-control" onChange={(e) => setaddress({ ...address, Country: e.target.value })} >
                                                                        <option value='india'>India</option>
                                                                    </select>
                                                                    <label htmlFor="pin">Country</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-2 theme-form-floating">
                                                                    <select required
                                                                        onChange={(e) => setaddress({ ...address, state: e.target.value })}
                                                                        className="form-control">
                                                                        <option>Select State</option>
                                                                        {state?.map((states, index) => {
                                                                            return (<option value={states?.name}>{states?.name}</option>)
                                                                        })}
                                                                    </select>
                                                                    <label htmlFor="pin">State</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-2 theme-form-floating">
                                                                    <input type="text" onChange={(e) => setaddress({ ...address, city: e.target.value })} className="form-control" id="pin" placeholder="Enter  city" />
                                                                    <label htmlFor="pin">City</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <input type="number" onChange={(e) => setaddress({ ...address, pincode: e.target.value })} className="form-control" id="pin" placeholder="Enter Pin Code" />
                                                                    <label htmlFor="pin">Pin Code</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary btn-md" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn theme-bg-color btn-md text-white" data-bs-dismiss="modal" >Save
                                                            changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Add address modal box end --> */}

                                    {/* Edit Address Start */}
                                    <div className="modal fade theme-modal" id="edit-address" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Edit address</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        <i className="fa-solid fa-xmark" />
                                                    </button>
                                                </div>
                                                <form onSubmit={EditAddress}>
                                                    <div className="modal-body">
                                                        <div className="row g-4">
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <input type="text" onChange={(e) => setaddress({ ...address, name: e.target.value })} value={address.name} className="form-control" id="fname" placeholder="Enter First Name" />
                                                                    <label htmlFor="fname">Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <input type="number" className="form-control" value={address.mobile} onChange={(e) => setaddress({ ...address, mobile: e.target.value })} id="number" placeholder="Enter Mobile No." />
                                                                    <label htmlFor="number">Contact No</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xxl-12">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <textarea className="form-control" value={address.address} onChange={(e) => setaddress({ ...address, address: e.target.value })} placeholder="Leave a comment here" id="address" style={{ height: 100 }} defaultValue={""} />
                                                                    <label htmlFor="address">Address</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <select className="form-control"
                                                                        value={address.Country}
                                                                        onChange={(e) => setaddress({ ...address, Country: e.target.value })} >
                                                                        <option value='india'>India</option>
                                                                    </select>
                                                                    <label htmlFor="pin">Country</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <select required
                                                                        value={address.state}
                                                                        onChange={(e) => setaddress({ ...address, state: e.target.value })}
                                                                        className="form-control">
                                                                        <option>Select State</option>
                                                                        {state?.map((states, index) => {
                                                                            return (<option value={states?.name}>{states?.name}</option>)
                                                                        })}
                                                                    </select>
                                                                    <label htmlFor="pin">State</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <input type="text" value={address.city} onChange={(e) => setaddress({ ...address, city: e.target.value })} className="form-control" id="pin" placeholder="Enter  city" />
                                                                    <label htmlFor="pin">City</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 col-xxl-6">
                                                                <div className="form-floating mb-4 theme-form-floating">
                                                                    <input type="number" value={address.pincode} onChange={(e) => setaddress({ ...address, pincode: e.target.value })} className="form-control" id="pin" placeholder="Enter Pin Code" />
                                                                    <label htmlFor="pin">Pin Code</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary btn-md" data-bs-dismiss="modal">Close</button>
                                                        <button type="submit" className="btn theme-bg-color btn-md text-white" data-bs-dismiss="modal" >Save
                                                            changes</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Edit Address End */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >


        </div >

    )
}
