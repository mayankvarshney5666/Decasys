import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { addCart, addWishlist } from '../../features/cartSlice';
import Rating from './Rating';
export default function ReletedProduct() {
  const [category, setcategory] = useState();
  const [product, setproduct] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const getcategory = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllcategory`
    );
    const result = await resource.json();
    setcategory(result?.category);
  }
  const getProduct = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllproduct`
    );
    const result = await resource.json();
    setproduct(result?.product);
  }
  useEffect(() => {
    getcategory();
    getProduct()
  }, []);
  const dispatch = useDispatch();
  const addtocart = async (id) => {
    const selectedData = await product.find((item) => item?._id === id);
    const randomNum = Math.floor(Math.random() * 1000);
    const currentTime = Math.floor(Date.now() / 1000);
    const Session_id = await localStorage.getItem('session_id');
    if (!Session_id) {
      const genrateId = randomNum + 'cqoetb' + currentTime;
      await localStorage.setItem('session_id', genrateId);
    }
    const data = {
      productid: selectedData?._id,
      Quantity: 1,
      user_id: localStorage.getItem('user_id'),
      productimg: selectedData?.images[0]?.image_name,
      productWeight: JSON.parse(selectedData?.weightwishprice[0])[0].weight,
      productPrice: JSON.parse(selectedData?.weightwishprice[0])[0].price,
      session_id: localStorage.getItem('session_id'),
      productname: selectedData?.name,
    };
    const aaaa = await dispatch(addCart(data));
    if (aaaa.payload.success === true) {
      toast.success(aaaa.payload.message);
    } else {
      toast.warn(aaaa.payload.message);
    }
  }

  const navigate = useNavigate();
  const { Wishlist } = useSelector((state) => state?.cartSlice);
  const addtowishlist = async (id) => {
    const selectedData = await product.find((item) => item?._id === id);
    const data = {
      productid: selectedData?._id,
      Quantity: 1,
      user_id: localStorage.getItem('user_id'),
      productimg: selectedData?.images[0]?.image_name,
      productWeight: JSON.parse(selectedData?.weightwishprice[0])[0].weight,
      productPrice: JSON.parse(selectedData?.weightwishprice[0])[0].price,
      session_id: localStorage.getItem('session_id'),
      productname: selectedData?.name,
    };
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      await navigate('/signin');
      toast.success('Plz Login First Add to Wishlist');
    } else {
      const aaaa = await dispatch(addWishlist(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
    }
  }

  const GetProductdetail = async (id) => {
    await navigate(`/ProductDetails/${id}`);
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }


  return (
    <section className="product-section">
      <div className="container-fluid-lg">

        <div className="row g-sm-4 g-3">
          <div className="col-xxl-12 col-xl-12">

            <div className="title title-flex">
              <div>
                <h2>Related Products</h2>
                <span className="title-leaf">
                  <svg className="icon-width">
                    <use xlinkHref="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf" />
                  </svg>
                </span>
                <p>
                  Don't miss this opportunity at a special discount just for this
                  week.
                </p>
              </div>
            </div>

            <div className="section-b-space">
              <div className="overflow-hidden">
                <div className="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">

                  {product?.map((products, index) => {
                    const weightWishPrice = JSON.parse(products?.weightwishprice);
                    const isProductInWishlist = Wishlist.some(item => item.productid === products?._id);
                    return (<div>
                      <div className="product-box-3 h-100 wow fadeInUp">
                        <div className="product-wish-icon">
                            <a href="javascript:void(0);">
                              <span onClick={() => addtowishlist(products?._id)} className="notifi-wishlist">
                                {/* <i class="fa fa-heart-o" aria-hidden="true"></i>
                                <i class="fa fa-heart" aria-hidden="true"></i> */}

                                {isProductInWishlist ? (
                                  <span style={{ color: '#76c603' }}><i className="fa fa-heart" aria-hidden="true"></i></span>
                                ) : (
                                  <span><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                                )}
                              </span>
                            </a>
                          </div>
                        <div className="product-header">
                          <div className="product-image">
                            <a   href='#' onClick={(e) => GetProductdetail(products?._id)}  >
                              <img
                                src={`${imgUrl}/${products?.images[0]?.image_name}`}
                                // src="images/vegetable/product/Celtic-Sea-Salt,-Fine-Ground,-Vital-Mineral-Blend.png"
                                className="img-fluid blur-up lazyload"
                                alt=""
                              />
                            </a>
                            <ul className="product-option d-none justify-content-center align-items-center" style={{ width: '60px' }}>
                              <li
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Wishlist"
                              >
                                <a href="javascript:void(0);"><span onClick={() => addtowishlist(products?._id)} className="notifi-wishlist">
                                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                                </span></a>
                              </li>
                            </ul>

                          </div>
                        </div>
                        <div className="product-footer">
                          <div className="product-detail">
                            <span className="span-name d-none">By-: {products?.brand['0']?.brand}</span>
                            <div className="product-title-wrap">
                                <a  href='#' onClick={(e) => GetProductdetail(products?._id)} >
                                  <h5 className="name">{products?.name}</h5>
                                </a>
                              </div>
                            <div className="product-rating mt-2">
                                {
                                  Number.isInteger(products?.averageRating) ? (
                                    <span style={{fontSize:14}}>({products?.averageRating}.0)</span>
                                  ) : (
                                    <span style={{fontSize:14}}>({products?.averageRating})</span>
                                  )
                                }
                              <ul className="rating">
                                <Rating rating={products?.averageRating} />
                              </ul>
                              <span class="review" style={{fontSize:14, marginLeft:5}}>({products?.totalReviews})</span>
                            </div>
                            <h5 className="price">
                              <span>₹  {weightWishPrice[0]?.price}</span>
                            </h5>
                            {products?.Stock > 0 ? (
                              <div className="add-to-cart-box">
                                <button
                                  type='button'
                                  className="btn btn-add-cart addcart-button"
                                  onClick={() => addtocart(products?._id)}
                                >
                                  Add to Cart
                                </button>
                              </div>
                            ) : (
                              <div className="add-to-cart-box" style={{ backgroundColor: '#fe5831' }}>
                                <Link to={`/ProductDetails/${products?._id}`}>
                                  <button className="btn btn-add-cart addcart-button">Out Of Stock</button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>)
                  })}


                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
