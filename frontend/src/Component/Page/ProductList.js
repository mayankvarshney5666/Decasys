import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rating from './Rating';

export default function ProductList() {

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
  const getAllProductByCategory = async () => {
    const resource = await fetch(
      `${apiUrl}/getAllProductByCategory/${_id.id}`
    );
    const result = await resource.json();
    setproduct(result?.products);
  }
  useEffect(() => {
    getcategory();
    getsubcategory();
    getbrand();
    // getProduct()
    getAllProductByCategory(_id?.id)


  }, [_id])



  return (
    <div>
      <section className="breadscrumb-section pt-0">
        <div className="container-fluid-lg">
          <div className="row">
            <div className="col-12">
              <div className="breadscrumb-contain">
                <h2>Category Page</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href>
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Category Page</li>
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
                                  <input className="checkbox_animated" type="checkbox" id="fruit" />
                                  <label className="form-check-label" htmlFor="fruit">
                                    <span className="name">{categorye?.category_name}</span>
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
                                  <input className="checkbox_animated" type="checkbox" id="fruit" />
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
                                  <input className="checkbox_animated" type="checkbox" id="fruit" />
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
                  let loopExecuted = false;

                

                  return (<div>
                    <div className="product-box-3 h-100 wow fadeInUp">
                      <div className="product-header">
                        <div className="product-image">
                          <Link to={`/ProductDetails/${products?._id}`}>
                            <img
                              src={`${imgUrl}/${products?.images[0]?.image_name}`}
                              className="img-fluid blur-up lazyload" alt />
                          </Link>
                          <ul className="product-option d-none">
                            <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                              <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#view">
                                <i data-feather="eye" />
                              </a>
                            </li>
                            <li data-bs-toggle="tooltip" data-bs-placement="top" title="Wishlist">
                              <a href="#" className="notifi-wishlist">
                                <i data-feather="heart" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-footer">
                        <div className="product-detail">
                          <a href="#">
                            <h5 className="name">{products?.name}</h5>
                          </a>
                          <p className="text-content mt-1 mb-2 product-content">Cheesy feet cheesy grin brie.
                            Mascarpone cheese and wine hard cheese the big cheese everyone loves smelly
                            cheese macaroni cheese croque monsieur.</p>


                            <div className="product-rating mt-2">
                            <ul className="rating">
                              <Rating rating={products?.averageRating} />

                            </ul>
                            { 
    Number.isInteger(products?.averageRating) ? (
        <span>({products?.averageRating}.0)</span>
    ) : (
        <span>({products?.averageRating})</span>
    )
}

                          </div>

                          {Array.isArray(parsedWeightWishPrice) && parsedWeightWishPrice.map((item, index) => {
                            if (!loopExecuted) {
                              loopExecuted = true; // Set the flag to true after the loop is executed once
                              return (
                                <React.Fragment key={index}>
                                  <h6 className="unit">{item?.weight}</h6>
                                  <h5 className="price"><span className="theme-color">Rs {item?.price}.0</span></h5>
                                </React.Fragment>
                              );
                            }
                            return null; // Return null for subsequent iterations to break the loop
                          })}


                          <div className="add-to-cart-box bg-white d-none">
                            <button className="btn btn-add-cart addcart-button">Add
                              <span className="add-icon bg-light-gray">
                                <i className="fa-solid fa-plus" />
                              </span>
                            </button>
                            <div className="cart_qty qty-box">
                              <div className="input-group bg-white">
                                <button type="button" className="qty-left-minus bg-gray" data-type="minus" data-field>
                                  <i className="fa fa-minus" aria-hidden="true" />
                                </button>
                                <input className="form-control input-number qty-input" type="text" name="quantity" defaultValue={0} />
                                <button type="button" className="qty-right-plus bg-gray" data-type="plus" data-field>
                                  <i className="fa fa-plus" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
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
