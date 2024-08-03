import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { CloseButton } from 'react-toastify';


export default function Footer() {
  const [none, setNone] = useState('block')
  const CloseButton = async () => {

    localStorage.setItem('cookies', 'none');
    setNone('none')
  }

  useEffect(() => {
    if (localStorage.getItem('cookies')) {
      setNone('none')
    } else {
      setNone('block')
    }
  })


  return (
    <>
      <footer className="section-t-space">
        <div className="container">
          <div className="service-section">
            <div className="row g-3">
              <div className="col-12">
                <div className="service-contain">
                  <div className="service-box">
                    <div className="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/product.svg"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </div>
                    <div className="service-detail">
                      <h5>Every Fresh Products</h5>
                    </div>
                  </div>
                  <div className="service-box">
                    <div className="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/delivery.svg"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </div>
                    <div className="service-detail">
                      <h5>Free Shipping on All Orders</h5>
                    </div>
                  </div>
                  <div className="service-box">
                    <div className="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/discount.svg"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </div>
                    <div className="service-detail">
                      <h5>All deliveries will be done in 4 - 6 business days</h5>
                    </div>
                  </div>
                  <div className="service-box">
                    <div className="service-image">
                      <img
                        src="https://themes.pixelstrap.com/fastkart/assets/svg/market.svg"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </div>
                    <div className="service-detail">
                      <h5>Best Price In The Market</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-footer section-b-space section-t-space sm-none">
            <div className="row g-md-4 g-3">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-logo">
                  <div className="theme-logo">
                    <a href="">
                      <img
                        src="https://www.decasys.in/images/logo/1.png"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="footer-logo-contain">
                    <p>Imported and distributed by:</p>
                    <p><strong>DECASYS ENTERPRISES</strong></p>
                    <ul className="address">
                      <p><strong>Office Address:</strong></p>
                      <li>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <a href="javascript:void(0)">
                          151-A, Pocket-E, LIG Flats, GTB Enclave, Nand Nagri, Delhi-110093, INDIA
                        </a>
                      </li>
                      <li>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <a href="javascript:void(0)">contact@decasys.in</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-2 col-sm-3">
                <div className="footer-title">
                  <h4>Useful Links</h4>
                </div>
                <div className="footer-contain">
                  <ul>

                    <li>
                      <Link to="/about" className="text-content">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/Contact" className="text-content">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/ReturnAndRefund" className="text-content">
                        Return And Refund
                      </Link>
                    </li>

                    <li>
                      <Link to="/Shippingpolicy" className="text-content">
                        Shipping Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/PrivacyPolicy" className="text-content">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/TermsAndConditions" className="text-content">
                        Terms And Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/TermsOfUse" className="text-content">
                        Terms Of Use
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-sm-3">
                <div className="footer-title">
                  <h4>Products</h4>
                </div>
                <div className="footer-contain">
                  <ul>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Sea salt
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Pink Himalayan salt
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Organic honey
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Raw honey
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Manuka honey
                      </Link>
                    </li>
                    <li>
                      <a href="/FAQ" className="text-content">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-title">
                  <h4>Contact Us</h4>
                </div>
                <div className="footer-contact">
                  <ul>
                    <li>
                      <div className="footer-number">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <div className="contact-number">
                          <h6 className="text-content">Hotline 24/7 :</h6>
                          <h5>+91 991 107 0099</h5>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="footer-number">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <div className="contact-number">
                          <h6 className="text-content">Email Address :</h6>
                          <h5>contact@decasys.in</h5>
                        </div>
                      </div>
                    </li>
                    <li className="social-app d-none">
                      <h5 className="mb-2 text-content">FSSAI IMPORTER AND RETAILER</h5>
                      <p><strong>LICENCE NUMBER- 10017011004701</strong></p>
                      <ul>
                        <li className="mb-0">
                          <a href="">
                            <img
                              style={{ width: '110px' }}
                              src="https://www.decasys.in/images/logo/fssai.png"
                              className="blur-up lazyload"
                              alt="FSSAI"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div
                  className="social-app fssai mt-4"
                  style={{
                    width: '100%',
                  }}
                >
                  <div className="row g-md-4 g-3">
                    <div className="col-3 col-xl-3 col-lg-3">
                      <img
                        src="https://www.decasys.in/images/logo/fssai.png"
                        className="img-fluid blur-up lazyload"
                        alt="FSSAI"
                      />
                    </div>
                    <div className="col-9 col-xl-9 col-lg-9">
                      <h5 className="mb-2 text-content">FSSAI IMPORTER AND RETAILER</h5>
                      <p><strong>LICENCE NUMBER- 10017011004701</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="main-footer section-b-space section-t-space d-lg-none d-xs-block">
            <div className="row g-md-4 g-3">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-logo">
                  <div className="theme-logo">
                    <a href="index.html">
                      <img
                        src="https://www.decasys.in/images/logo/1.png"
                        className="blur-up lazyload"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="footer-logo-contain">
                    <p>Imported and distributed by:</p>
                    <p><strong>DECASYS ENTERPRISES</strong></p>
                    <ul className="address">
                      <p><strong>Office Address:</strong></p>
                      <li>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <a href="javascript:void(0)">
                          151-A, Pocket-E, LIG Flats, GTB Enclave, Nand Nagri, Delhi-110093, INDIA
                        </a>
                      </li>
                      <li>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <a href="javascript:void(0)">contact@decasys.in</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-md-4 g-3">
              <div className="col-6 col-xl-6">
                <div className="footer-title" style={{ textAlign: 'left', }}>
                  <h4>Useful Links</h4>
                </div>
                <div className="footer-contain">
                  <ul>
                    <li>
                      <Link to="/about" className="text-content">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/Contact" className="text-content">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/ReturnAndRefund" className="text-content">
                        Return And Refund
                      </Link>
                    </li>

                    <li>
                      <Link to="/Shippingpolicy" className="text-content">
                        Shipping Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/PrivacyPolicy" className="text-content">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/TermsAndConditions" className="text-content">
                        Terms And Conditions
                      </Link>
                    </li>
                    <li>
                      <Link to="/TermsOfUse" className="text-content">
                        Terms Of Use
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-6 col-xl-6">
                <div className="footer-title" style={{ textAlign: 'left', }}>
                  <h4>Products</h4>
                </div>
                <div className="footer-contain">
                  <ul>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Sea salt
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Pink Himalayan salt
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Organic honey
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Raw honey
                      </Link>
                    </li>
                    <li>
                      <Link to="/categorylist" className="text-content">
                        Manuka honey
                      </Link>
                    </li>
                    <li>
                      <a href="" className="text-content">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row g-md-4 g-3">
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6">
                <div className="footer-title">
                  <h4>Contact Us</h4>
                </div>
                <div className="footer-contact">
                  <ul>
                    <li style={{ width: '50%' }}>
                      <div className="footer-number">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <div className="contact-number">
                          <h6 className="text-content">Hotline 24/7 :</h6>
                          <h5>+91 991 107 0099</h5>
                        </div>
                      </div>
                    </li>
                    <li style={{ width: '50%' }}>
                      <div className="footer-number">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <div className="contact-number">
                          <h6 className="text-content">Email Address :</h6>
                          <h5>contact@decasys.in</h5>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="mt-4 d-none">
                    <li className="social-app fssai"
                      style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        padding: '15px 15px',
                        borderRadius: '5px',
                      }}
                    >
                      <h5 className="mb-2 text-content">FSSAI IMPORTER AND RETAILER</h5>
                      <p><strong>LICENCE NUMBER- 10017011004701</strong></p>
                      <ul>
                        <li className="mb-0 text-center" style={{ width: '100%', }}>
                          <a href="">
                            <img
                              src="https://www.decasys.in/images/logo/fssai.png"
                              className="blur-up lazyload"
                              alt="FSSAI"
                            />

                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div
                    className="social-app fssai-m mt-4"
                    style={{
                      width: '100%',
                      backgroundColor: '#fff',
                      padding: '15px 15px',
                      borderRadius: '5px',
                    }}
                  >
                    <div className="row g-md-4 g-3">
                      <div className="col-3 col-xl-3 col-lg-3">
                        <img
                          src="https://www.decasys.in/images/logo/fssai.png"
                          className="img-fluid blur-up lazyload"
                          alt="FSSAI"
                        />
                      </div>
                      <div className="col-9 col-xl-9 col-lg-9">
                        <h5 className="mb-2 text-content">FSSAI IMPORTER AND RETAILER</h5>
                        <p><strong>LICENCE NUMBER- 10017011004701</strong></p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>


          <div className="sub-footer section-small-space sm-none">
            <div className="row g-md-4 g-3">
              <div className="col-xl-12 col-lg-12 col-sm-12">
                <p className="center_desl"><strong>*Disclaimer:</strong>  Products sold through this page are not intended to
                  diagnose, treat, cure or prevent any disease. Product packaging and materials may contain more and different information
                  than that shown on our website. We recommend that you do not solely rely on the information presented here
                  and that you always read labels, warnings and instructions before using or consuming a product.</p>
              </div>
            </div>
          </div>

          <div className="sub-footer sub-footer-m section-small-space d-lg-none d-xs-block">
            <div className="row g-md-4 g-3">
              <div className="col-xl-12 col-lg-12 col-sm-12">
                <p className="center_desl"><strong>*Disclaimer:</strong>  Products sold through this page are not intended to
                  diagnose, treat, cure or prevent any disease. Product packaging and materials may contain more and different information
                  than that shown on our website. We recommend that you do not solely rely on the information presented here
                  and that you always read labels, warnings and instructions before using or consuming a product.</p>
              </div>
            </div>
          </div>


          <div className="sub-footer section-small-space">
            <div className="reserve">
              <h6 className="text-content">
                ©2024 DECASYS ENTERPRISES All rights reserved.
              </h6>
            </div>
            <div className="payment">
              <img
                src="https://www.decasys.in/images/payment/1.png"
                className="blur-up lazyload"
                alt=""
              />
            </div>
            <div className="social-link">
              <h6 className="text-content">Stay connected :</h6>
              <ul>
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fa-brands fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <i className="fa-brands fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="fa-brands fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://in.pinterest.com/" target="_blank">
                    <i className="fa-brands fa-pinterest-p" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer >

      <div
        className="modal fade theme-modal view-modal"
        id="view"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header p-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <div className="row g-sm-4 g-2">
                <div className="col-lg-6">
                  <div className="slider-image">
                    <img
                      src="../assets/images/product/category/1.jpg"
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-sidebar-modal">
                    <h4 className="title-name">
                      Peanut Butter Bite Premium Butter Cookies 600 g
                    </h4>
                    <h4 className="price">$36.99</h4>
                    <div className="product-rating">
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
                      <span className="ms-2">8 Reviews</span>
                      <span className="ms-2 text-danger">
                        6 sold in last 16 hours
                      </span>
                    </div>
                    <div className="product-detail">
                      <h4>Product Details :</h4>
                      <p>
                        Candy canes sugar plum tart cotton candy chupa chups sugar
                        plum chocolate I love. Caramels marshmallow icing dessert
                        candy canes I love soufflé I love toffee. Marshmallow pie
                        sweet sweet roll sesame snaps tiramisu jelly bear claw.
                        Bonbon muffin I love carrot cake sugar plum dessert bonbon.
                      </p>
                    </div>
                    <ul className="brand-list">
                      <li>
                        <div className="brand-box">
                          <h5>Brand Name:</h5>
                          <h6>Black Forest</h6>
                        </div>
                      </li>
                      <li>
                        <div className="brand-box">
                          <h5>Product Code:</h5>
                          <h6>W0690034</h6>
                        </div>
                      </li>
                      <li>
                        <div className="brand-box">
                          <h5>Product Type:</h5>
                          <h6>White Cream Cake</h6>
                        </div>
                      </li>
                    </ul>
                    <div className="select-size">
                      <h4>Cake Size :</h4>
                      <select className="form-select select-form-size">
                        <option selected="">Select Size</option>
                        <option value="1.2">1/2 KG</option>
                        <option value={0}>1 KG</option>
                        <option value="1.5">1/5 KG</option>
                        <option value="red">Red Roses</option>
                        <option value="pink">With Pink Roses</option>
                      </select>
                    </div>
                    <div className="modal-button">
                      <button className="btn btn-md add-cart-button icon">
                        Add To Cart
                      </button>
                      <button className="btn theme-bg-color view-button icon text-white fw-bold btn-md">
                        View More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="theme-option">
        <div className="back-to-top">
          <a id="back-to-top" href="#">
            <i className="fas fa-chevron-up" />
          </a>
        </div>
      </div> */}
      <div className="ifrmCookieBanner" style={{ display: none }}>
        <div className="frame-content" style={{ maxHeight: 731 }}>
          <div className="frame-content__inner">
            {/* <div className="frame-content__logo logo">
            <svg className="logo__bg" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M43.9273 0.705413L77.3278 11.9332C78.4825 12.2878 79.2728 13.3761 79.2728 14.6105V55.7788C79.2728 61.1336 77.1564 66.615 72.982 72.0707C69.7937 76.2375 65.383 80.4217 59.8724 84.5071C50.6148 91.3701 41.499 95.5802 41.1156 95.7559C40.761 95.9188 40.3807 96 40.0004 96C39.6201 96 39.2398 95.9186 38.8852 95.7559C38.5016 95.5802 29.3856 91.3701 20.128 84.5071C14.6174 80.4217 10.2065 76.2375 7.01837 72.0707C2.84403 66.6148 0.727295 61.1334 0.727295 55.7788V14.6105C0.727295 13.3761 1.51791 12.2878 2.67226 11.9332L36.0728 0.705427C38.4291 -0.235142 41.5709 -0.235138 43.9273 0.705413ZM43.8382 1.78029L76.4796 12.7529C77.6081 13.0994 78.3804 14.163 78.3804 15.3693V55.602C78.3804 60.8351 76.3121 66.1919 72.2327 71.5236C69.1168 75.5957 64.8064 79.6848 59.4209 83.6774C50.3738 90.3844 41.4651 94.4988 41.0905 94.6705C40.7439 94.8297 40.3722 94.9091 40.0006 94.9091C39.6289 94.9091 39.2573 94.8295 38.9107 94.6705C38.5358 94.4988 29.627 90.3844 20.5799 83.6774C15.1944 79.6848 10.8838 75.5957 7.76815 71.5236C3.68868 66.1917 1.62005 60.8349 1.62005 55.602V15.3693C1.62005 14.163 2.3927 13.0994 3.52081 12.7529L36.1622 1.7803C38.465 0.861111 41.5354 0.861115 43.8382 1.78029Z" fill="white" />
              <path d="M73.1801 15.2116L43.4908 5.00456C41.3963 4.14951 38.6035 4.14951 36.509 5.00457L6.81968 15.2116C5.79359 15.534 5.09082 16.5234 5.09082 17.6455V55.0712C5.09082 59.9391 6.97236 64.9222 10.6829 69.882C13.5168 73.6701 17.4376 77.4739 22.3359 81.1879C30.5649 87.427 38.668 91.2543 39.0089 91.4141C39.3242 91.562 39.6622 91.636 40.0002 91.636C40.3383 91.636 40.6763 91.5621 40.9916 91.4141C41.3323 91.2543 49.4353 87.427 57.6642 81.1879C62.5626 77.4739 66.4832 73.6701 69.3173 69.882C73.0278 64.9223 74.909 59.9393 74.909 55.0712V17.6455C74.909 16.5234 74.2066 15.534 73.1801 15.2116Z" fill="#F3F5FA" />
            </svg>
            <span className="logo__custom" style={{ backgroundImage: 'url("https://secureprivacystoragetest.blob.core.windows.net/img-files/933332f3-e5a5-475e-a583-b290b7d4173e.svg")' }} />
          </div> */}
            <div className="frame-content__content">
              <div className="frame-content__text"><p>We respect your privacy and aim for the best website experience in compliance with India<a href="https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf" rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'underline', backgroundColor: 'transparent', color: '#fff' }}> DPDPA</a>. Allowing cookies enables a tailored experience, while disabling them may reduce personalization. Feel free to update your preferences anytime. Your consent remains valid for 12 months. For more information, please read our <a className="spCustomLink" href="javascript:void(0);" style={{ textDecoration: 'underline', color: '#fff' }}>Privacy Policy</a> and <a className="spCustomLink" href="javascript:void(0);" style={{ textDecoration: 'underline', color: '#fff' }}>Cookie Policy</a>. Happy browsing!</p></div>
              <div className="frame-content__controls frame-controls">
                <button id="sp-accept" className="btn--bg--half-transparent" onClick={CloseButton}>Accept</button>
                <button id="sp-decline" className="btn--bg--half-transparent" onClick={CloseButton}>Decline</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-overlay" />
    </>
  )
}
