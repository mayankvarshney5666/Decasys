import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from './Rating';
import { removewishlistbywishlistid, addCart, addWishlist } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

export default function Brand() {

  const { Wishlist } = useSelector((state) => state?.cartSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setcategory] = useState();
  const [subcategory, setsubcategory] = useState();
  const [brand, setbrand] = useState();
  const [product, setproduct] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const imgUrl = process.env.REACT_APP_IMAGE_URL;
  const _id = useParams();

  const getcategory = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllcategory`
    );
    const result = await resource.json();
    setcategory(result?.category);
  }
  const getsubcategory = async () => {
    const resource = await fetch(
      `${apiUrl}/getsubcategory`
    );
    const result = await resource.json();
    setsubcategory(result?.subcategory);
  }
  const getbrand = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllbrand`
    );
    const result = await resource.json();
    setbrand(result?.brand);
  }
  const getProduct = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllproduct`
    );
    const result = await resource.json();
    setproduct(result?.product);
  }
  const getAllProductByBrand = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllProductByBrand/${_id.id}`
    );
    const result = await resource.json();
    setproduct(result?.products);
  }
  useEffect(() => {
    getcategory();
    getsubcategory();
    getbrand();
    getAllProductByBrand(_id?.id)


  }, [_id])

  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = async (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setSelectedValues(prevState => [...prevState, { name, value }]);
    } else {
      setSelectedValues(prevState => prevState.filter(item => item.value !== value));
    }
  }

  const addtocart1 = async (id) => {
    const selectedData = await product.find((item) => item?._id === id);
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

    //login must before Add to cart 
    if (!user_id) {
      await navigate('/signin');
      toast.success('Plz Login First Add to Cart');
    } else {
      const aaaa = await dispatch(addCart(data));
    if (aaaa.payload.success === true) {
      toast.success(aaaa.payload.message);
      // dispatch(removewishlistbywishlistid(selectedData?._id));
    } else {
      toast.warn(aaaa.payload.message);
    }
    }

    
  }

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
    <div>
      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href>
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Brand Page</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>


          
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Shop Section Start */}
      <section className="section-b-space shop-section">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-custome-3 wow fadeInUp">
              <div className="left-box">
                <div className="shop-left-sidebar">
                  <div className="back-button">
                    <h3><i className="fa-solid fa-arrow-left" /> Back</h3>
                  </div>

                  <div className="accordion custome-accordion " id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <span>Category</span>
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                          <ul className="category-list custom-padding custom-height">
                            {category?.map((categorye, index) => {
                              return (<li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input name='category_id' onChange={handleCheckboxChange} value={categorye?._id} className="checkbox_animated" type="checkbox" id="fruit" />
                                  <label className="form-check-label" htmlFor="fruit">
                                    <span className="name">{categorye?.category_name}</span>
                                  </label>
                                </div>
                              </li>)
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#SubCategory" aria-expanded="true" aria-controls="collapseOne">
                          <span>SubCategory</span>
                        </button>
                      </h2>
                      <div id="SubCategory" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                          <ul className="category-list custom-padding custom-height">

                            {subcategory?.map((categorye, index) => {
                              return (<li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input name='subcategory_id' onChange={handleCheckboxChange} value={categorye?._id} className="checkbox_animated" type="checkbox" id="fruit" />
                                  <label className="form-check-label" htmlFor="fruit">
                                    <span className="name">{categorye?.subcategory}</span>
                                    {/* <span className="number">(2)</span> */}
                                  </label>
                                </div>
                              </li>)
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#Brand" aria-expanded="true" aria-controls="collapseOne">
                          <span>Brand</span>
                        </button>
                      </h2>
                      <div id="Brand" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                          <ul className="category-list custom-padding custom-height">

                            {brand?.map((categorye, index) => {
                              return (<li>
                                <div className="form-check ps-0 m-0 category-list-box">
                                  <input name='brand_id' onChange={handleCheckboxChange} value={categorye?._id} className="checkbox_animated" type="checkbox" id="fruit" />
                                  <label className="form-check-label" htmlFor="fruit">
                                    <span className="name">{categorye?.brand}</span>
                                    {/* <span className="number">(2)</span> */}
                                  </label>
                                </div>
                              </li>)
                            })}

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item d-none">
                      <h2 className="accordion-header" id="panelsStayOpen-headingOne2">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne">
                          <span>Price </span>
                        </button>
                      </h2>
                      <div id="collapseOne1" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne2">
                        <div className="accordion-body">
                          <ul className="category-list custom-padding custom-height">
                            <li>
                              <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="fruit" />
                                <label className="form-check-label" htmlFor="fruit">
                                  <span className="name">Rs.0 - Rs.500</span>
                                  <span className="number">(15)</span>
                                </label>
                              </div>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item d-none">
                      <h2 className="accordion-header" id="panelsStayOpen-headingFour1">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                          <span>Discount</span>
                        </button>
                      </h2>
                      <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingFour1">
                        <div className="accordion-body">
                          <ul className="category-list custom-padding">
                            <li>
                              <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                  <span className="name">upto 5%</span>
                                  <span className="number">(06)</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="flexCheckDefault1" />
                                <label className="form-check-label" htmlFor="flexCheckDefault1">
                                  <span className="name">5% - 10%</span>
                                  <span className="number">(08)</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="flexCheckDefault2" />
                                <label className="form-check-label" htmlFor="flexCheckDefault2">
                                  <span className="name">10% - 15%</span>
                                  <span className="number">(10)</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="flexCheckDefault3" />
                                <label className="form-check-label" htmlFor="flexCheckDefault3">
                                  <span className="name">15% - 25%</span>
                                  <span className="number">(14)</span>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="form-check ps-0 m-0 category-list-box">
                                <input className="checkbox_animated" type="checkbox" id="flexCheckDefault4" />
                                <label className="form-check-label" htmlFor="flexCheckDefault4">
                                  <span className="name">More than 25%</span>
                                  <span className="number">(13)</span>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-custome-9 wow fadeInUp">
              <div className="show-button d-none">
                <div className="filter-button-group mt-0">
                  <div className="filter-button d-inline-block d-lg-none">
                    <a><i className="fa-solid fa-filter" /> Filter Menu</a>
                  </div>
                </div>
                <div className="top-filter-menu">
                  <div className="category-dropdown">
                    <h5 className="text-content">Sort By :</h5>
                    <div className="dropdown">
                      <button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
                        <span>Most Popular</span> <i className="fa-solid fa-angle-down" />
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                          <a className="dropdown-item" id="low" href="javascript:void(0)">Low - High
                            Price</a>
                        </li>
                        <li>
                          <a className="dropdown-item" id="high" href="javascript:void(0)">High - Low
                            Price</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section">
                {/* Product Item Begin */}
                {product?.map((products, index) => {
                  const parsedWeightWishPrice = JSON.parse(products?.weightwishprice[0]);
                  const isProductInWishlist = Wishlist.some(item => item.productid === products?._id);
                  let loopExecuted = false;

                  const stars = [];
                  for (let i = 0; i < products.rating; i++) {
                    stars.push(<li>
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </li>);
                  }
                  if (!stars.length) {
                    stars.push(<li>
                      <i class="fa fa-star" aria-hidden="true"></i>
                      <i class="fa fa-star" aria-hidden="true"></i>
                      <i class="fa fa-star" aria-hidden="true"></i>

                    </li>);
                  }


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
                          <Link to={`/ProductDetails/${products?._id}`}>
                            <img
                              src={`${imgUrl}/${products?.images[0]?.image_name}`}
                              className="img-fluid blur-up lazyload" alt />
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

                          {Array.isArray(parsedWeightWishPrice) && parsedWeightWishPrice.map((item, index) => {
                            if (!loopExecuted) {
                              loopExecuted = true; // Set the flag to true after the loop is executed once
                              return (
                                <React.Fragment key={index}>
                                  <h6 className="unit d-none">{item?.weight}</h6>
                                  <h5 className="price"><span>₹  {item?.price}.0</span></h5>
                                </React.Fragment>
                              );
                            }
                            return null; // Return null for subsequent iterations to break the loop
                          })}
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
              {/* <nav className="custome-pagination">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="javascript:void(0)" tabIndex={-1} aria-disabled="true">
                      <i className="fa-solid fa-angles-left" />
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="javascript:void(0)">1</a>
                  </li>
                  <li className="page-item" aria-current="page">
                    <a className="page-link" href="javascript:void(0)">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="javascript:void(0)">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="javascript:void(0)">
                      <i className="fa-solid fa-angles-right" />
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </section>
      {/* Shop Section End */}
    </div>

  )
}
