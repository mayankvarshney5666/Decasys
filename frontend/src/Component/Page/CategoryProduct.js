import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addCart, addWishlist } from '../../features/cartSlice';
import { toast } from 'react-toastify';

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from './Rating';

export default function CategoryProduct() {

  const sliderRef = useRef(null);

  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Default slides to show
    slidesToScroll: 2,
    initialSlide: 0, // Ensure starting from the first slide
    // responsive: [
    //   {
    //     breakpoint: 768, // Adjust this breakpoint according to your design
    //     settings1: {
    //       dots: true,
    //       infinite: true,
    //       slidesToShow: 2, // Change slides to show for mobile view
    //       slidesToScroll: 1,
    //       initialSlide: 0, // Ensure starting from the first slide on mobile view
    //     },
    //   },
    // ],
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Default slides to show
    slidesToScroll: 2,
    initialSlide: 0, // Ensure starting from the first slide
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint according to your design
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2, // Change slides to show for mobile view
          slidesToScroll: 1,
          initialSlide: 0, // Ensure starting from the first slide on mobile view
        },
      },
    ],
  };

  const handleBreakpoint = (breakpoint) => {
    if (breakpoint === 768 && sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  const dispatch = useDispatch();
  const [category, setcategory] = useState();
  const [product, setproduct] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const navigate = useNavigate();
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
    getProduct();
  }, []);
  const addtocart = async (id) => {
    const selectedData = await product.find((item) => item?._id === id);
    const user_id = localStorage.getItem('user_id');
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const currentTime = Math.floor(Date.now() / 1000);
    // alert(currentTime)
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

    //login must before Add to cart 
    if (!user_id) {
      await navigate('/signin');
      toast.success('Plz Login First Add to Cart');
    } else {
      const aaaa = await dispatch(addCart(data));
      if (aaaa.payload.success === true) {
        toast.success(aaaa.payload.message);
      } else {
        toast.warn(aaaa.payload.message);
      }
    }
  }

  const { Wishlist } = useSelector((state) => state?.cartSlice);
  // const isProductInWishlist = Wishlist.includes(product._id);
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

  return (
    <>
      <section className="product-section">
        <div className="container">

          {/* Product Section Desktop Start */}
          <div className="row g-sm-4 g-3 d-lg-block sm-none">
            <div className="col-xxl-12 col-xl-12">
              <div className="title title-flex">
                <div>
                  <h3>Recommended for you</h3>
                </div>
              </div>
              <div className="section-b-space">
                <div className="overflow-hidden">
                  <div className="row  product-list-section">
                    <Slider ref={sliderRef} {...settings}>  {product?.map((products, index) => {
                      const weightWishPrice = JSON.parse(products?.weightwishprice);
                      const isProductInWishlist = Wishlist.some(item => item.productid === products?._id);

                      return (<div>
                        <div className={`product-box-3 h-100 wow fadeInUp`}>
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
                              <Link to={`ProductDetails/${products?._id}`}>
                                <img
                                  src={`${imgUrl}/${products?.images[0]?.image_name}`}
                                  // src="images/vegetable/product/Celtic-Sea-Salt,-Fine-Ground,-Vital-Mineral-Blend.png"
                                  className="img-fluid blur-up lazyload"
                                  alt=""
                                />
                              </Link>
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
                              {/* <span className="span-name">By-: {products?.brand['0']?.brand}</span> */}
                              <div className="product-title-wrap">
                                <Link to={`/ProductDetails/${products?._id}`}>
                                  <h5 className="name">{products?.name}</h5>
                                </Link>
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
                              {/* <h6 className="unit">454 g</h6> */}
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
                    })}</Slider>
                  </div>
                </div>
              </div>
              <div className="title title-flex">
                <div>
                  <h3>Specials picked for you</h3>
                </div>
              </div>
              <div className="section-b-space">
                <div className="overflow-hidden">
                  <div className="row  product-list-section">
                    <Slider ref={sliderRef} {...settings}>  {product?.map((products, index) => {
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
                              <Link to={`ProductDetails/${products?._id}`}>
                                <img
                                  src={`${imgUrl}/${products?.images[0]?.image_name}`}
                                  // src="images/vegetable/product/Celtic-Sea-Salt,-Fine-Ground,-Vital-Mineral-Blend.png"
                                  className="img-fluid blur-up lazyload"
                                  alt=""
                                />
                              </Link>
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
                              {/* <span className="span-name">By-: {products?.brand['0']?.brand}</span> */}
                              <div className="product-title-wrap">
                                <Link to={`/ProductDetails/${products?._id}`}>
                                  <h5 className="name">{products?.name}</h5>
                                </Link>
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
                              {/* <h6 className="unit">454 g</h6> */}
                              <h5 className="price">
                                <span>₹ {weightWishPrice[0]?.price}</span>
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
                    })}</Slider>
                  </div>
                </div>
              </div>
              {/* <div className="title d-none">
                <h3>Shop by Categories</h3>
              </div> */}

              {/* <div className="product-wrapper no-arrow d-none">
                <div className="row">
                  {category?.map((category1, index) => {
                    return (<div className="col-lg-2">
                      <Link to="/categorylist" className="category-box category-dark">
                        <div>
                          <img
                            src="https://www.decasys.in/images/logo/favicon-1.png"
                            className="blur-up lazyload"
                            alt=""
                          />
                          <h5>{category1?.category_name}</h5>
                        </div>
                      </Link>
                    </div>)
                  })}

                </div>
              </div> */}
            </div>
          </div>
          {/* Product Section Desktop End */}

          {/* Product Section Mobile Start */}
          <div className="row g-sm-4 g-3 d-none sm-block">
            <div className="col-xxl-12 col-xl-12">
              <div className="title title-flex">
                <div>
                  <h3>Recommended for you</h3>
                </div>
              </div>
              <div className="section-b-space">
                <div className="overflow-hidden">
                  <div className="row  product-list-section">
                    <Slider ref={sliderRef} {...settings1}>  {product?.map((products, index) => {
                      const weightWishPrice = JSON.parse(products?.weightwishprice);
                      const isProductInWishlist = Wishlist.some(item => item.productid === products?._id);

                      return (<div>
                        <div className={`product-box-3 h-100 wow fadeInUp`}>
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
                              <Link to={`ProductDetails/${products?._id}`}>
                                <img
                                  src={`${imgUrl}/${products?.images[0]?.image_name}`}
                                  // src="images/vegetable/product/Celtic-Sea-Salt,-Fine-Ground,-Vital-Mineral-Blend.png"
                                  className="img-fluid blur-up lazyload"
                                  alt=""
                                />
                              </Link>
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
                              {/* <span className="span-name">By-: {products?.brand['0']?.brand}</span> */}
                              <div className="product-title-wrap-mob">
                                <Link to={`/ProductDetails/${products?._id}`}>
                                  <h5 className="name">{products?.name}</h5>
                                </Link>
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
                                <span class="review" style={{fontSize:14, marginLeft: 5}}>({products?.totalReviews})</span>
                              </div>
                              {/* <h6 className="unit">454 g</h6> */}
                              <h5 className="price">
                                <span>₹ {weightWishPrice[0]?.price}</span>
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
                    })}</Slider>
                  </div>
                </div>
              </div>
              <div className="title title-flex">
                <div>
                  <h3>Specials picked for you</h3>
                </div>
              </div>
              <div className="section-b-space">
                <div className="overflow-hidden">
                  <div className="row  product-list-section">
                    <Slider ref={sliderRef} {...settings1}>  {product?.map((products, index) => {
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
                              <Link to={`ProductDetails/${products?._id}`}>
                                <img
                                  src={`${imgUrl}/${products?.images[0]?.image_name}`}
                                  // src="images/vegetable/product/Celtic-Sea-Salt,-Fine-Ground,-Vital-Mineral-Blend.png"
                                  className="img-fluid blur-up lazyload"
                                  alt=""
                                />
                              </Link>
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
                              {/* <span className="span-name">By-: {products?.brand['0']?.brand}</span> */}
                              <div className="product-title-wrap-mob">
                                <Link to={`/ProductDetails/${products?._id}`}>
                                  <h5 className="name">{products?.name}</h5>
                                </Link>
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
                                <span class="review" style={{fontSize:14, marginLeft: 5}}>({products?.totalReviews})</span>
                              </div>
                              {/* <h6 className="unit">454 g</h6> */}
                              <h5 className="price">
                                <span>₹ {weightWishPrice[0]?.price}</span>
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
                    })}</Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Section Mobile End */}

        </div>
      </section>
      <section className="banner-section dextop-banner">
        <div className="container">
          <div className="row gy-lg-0 gy-3">
            <div className="col-lg-12 col-sm-12 col-12">
              <div className="banner-contain-3 pt-lg-4 h-100 hover-effect">
                <a href="javascript:void(0)">
                  <img src="https://www.backend.decasys.in/1711601185734-Cealtic salt post Desktop.png" className="img-fluid social-image blur-up w-100 lazyloaded" alt />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner-section mob-banner">
        <div className="container">
          <div className="row gy-lg-0 gy-3">
            <div className="col-lg-12 col-sm-12 col-12">
              <div className="banner-contain-3 pt-lg-4 h-100 hover-effect">
                <a href="javascript:void(0)">
                  <img src="https://www.decasys.in/images/shop/mob.jpg" className="img-fluid social-image blur-up w-100 lazyloaded" alt />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="blog-section section-b-space d-none">
        <div className="container">
          <div className="row g-4">
            <div className="col-xxl-12 col-xl-12 col-lg-12">

              <div className="title title-flex">
                <div>
                  <h3>Visit Our Blog</h3>
                  <p>
                    Don't miss this opportunity at a special discount just for this
                    week.
                  </p>
                </div>
              </div>

              <div className="row g-4 ratio_65">

                <div className="col-xxl-2 col-sm-2">
                  <div className="blog-box wow fadeInUp">
                    <div className="blog-image">
                      <a href="#">
                        <img src="images/inner-page/blog/b-3.jpg" className="blog-img-sm bg-img blur-up lazyload" />
                      </a>
                    </div>
                    <div className="blog-contain">
                      <a href="#">
                        <h3>3 Reasons Why Peptides Should Be In Your Skincare Routine</h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-2 col-sm-2">
                  <div className="blog-box wow fadeInUp">
                    <div className="blog-image">
                      <a href="#">
                        <img src="images/inner-page/blog/b-1.jpg" className="blog-img-sm bg-img blur-up lazyload" />
                      </a>
                    </div>
                    <div className="blog-contain">
                      <a href="#">
                        <h3>3 Reasons Why Peptides Should Be In Your Skincare Routine</h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-2 col-sm-2">
                  <div className="blog-box wow fadeInUp">
                    <div className="blog-image">
                      <a href="#">
                        <img src="images/inner-page/blog/b-2.jpg" className="blog-img-sm bg-img blur-up lazyload" />
                      </a>
                    </div>
                    <div className="blog-contain">
                      <a href="#">
                        <h3>3 Reasons Why Peptides Should Be In Your Skincare Routine</h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-2 col-sm-2">
                  <div className="blog-box wow fadeInUp">
                    <div className="blog-image">
                      <a href="#">
                        <img src="images/inner-page/blog/b-4.jpg" className="blog-img-sm bg-img blur-up lazyload" />
                      </a>
                    </div>
                    <div className="blog-contain">
                      <a href="#">
                        <h3>3 Reasons Why Peptides Should Be In Your Skincare Routine</h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-2 col-sm-2">
                  <div className="blog-box wow fadeInUp">
                    <div className="blog-image">
                      <a href="#">
                        <img src="images/inner-page/blog/b-5.jpg" className="blog-img-sm bg-img blur-up lazyload" />
                      </a>
                    </div>
                    <div className="blog-contain">
                      <a href="#">
                        <h3>3 Reasons Why Peptides Should Be In Your Skincare Routine</h3>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-2 col-sm-2">
                  <div className="blog-box wow fadeInUp">
                    <div className="blog-image">
                      <a href="#">
                        <img src="images/inner-page/blog/b-6.jpg" className="blog-img-sm bg-img blur-up lazyload" />
                      </a>
                    </div>
                    <div className="blog-contain">
                      <a href="#">
                        <h3>3 Reasons Why Peptides Should Be In Your Skincare Routine</h3>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section section-b-space">
        <div className="container">
          <div className="newsletter-box newsletter-box-2 newsletter-box-3">
            <div className="newsletter-contain py-5">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-4 col-lg-5 col-md-7 col-sm-9 offset-xxl-2 offset-md-1">
                    <div className="newsletter-detail">
                      <h2>Join our newsletter and get...</h2>
                      <h5>200 inr. discount for your first order</h5>
                      <div className="input-box">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Email" />
                        <i className="fa-solid fa-envelope arrow" />
                        <button className="sub-btn btn text-white theme-bg-color">
                          <span className="d-sm-block d-none">Subscribe</span>
                          <i className="fa-solid fa-arrow-right icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>)
}