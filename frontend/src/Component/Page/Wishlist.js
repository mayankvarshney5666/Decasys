import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { removewishlistbywishlistid ,addCart, getallWishlist} from '../../features/cartSlice';
export default function Wishlist() {
  const {  Wishlist } = useSelector((state) => state?.cartSlice);
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const session_id = localStorage.getItem('session_id');
    const session_id1 = localStorage.getItem('user_id');
    const data = { session_id: session_id };
    const data1 = { user_id: session_id1 };
    const checkToken = async () => {
      
      dispatch(getallWishlist(data1));
    };
    checkToken();
  },[])
  const removewishlist = async (id) => {
    if (id) {
      const response = await dispatch(removewishlistbywishlistid(id));
      if (response.payload.success === true) {
        if (Wishlist.length <= 1) {
          navigate('/')
        }
        toast.success('Removed from wishlist successfully');
      } else {
        toast.warn(response.payload.message);
      }
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


  return (
    <div>

      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <h2>Wishlist</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wishlist-section section-b-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-3 g-2">
            {Wishlist?.map((Wishlist1, index) => {
              return (<>
                <div className="col-xxl-2 col-lg-3 col-md-4 col-6 product-box-contain">
                  <div className="product-box-3 h-100">
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
                        {/* <span className="span-name">Vegetable</span> */}
                        <a href="product-left-thumbnail.html">
                          <h5 className="name">{Wishlist1?.productname}</h5>
                        </a>
                        <h6 className="unit mt-1">{Wishlist1?.productWeight}</h6>
                        <h5 className="price">
                          <span className="theme-color">   Rs. {Wishlist1?.productPrice}</span>
                          {/* <del>$15.15</del> */}
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
                </div>
              </>)
            })}


          </div>
        </div>
      </section>
      {/* Wishlist Section End */}
    </div>

  )
}
