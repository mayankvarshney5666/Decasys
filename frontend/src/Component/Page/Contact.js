import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Contact() {
  const apiUrl = process.env.REACT_APP_API_URL;
   const [sendData, setSendData]=useState();

   const SendQuery =async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/sendData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
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
                      <a href="index.html">
                        <i className="fa-solid fa-house" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Contact Box Section Start */}
      <section className="contact-box-section">
        <div className="container-fluid-lg">
          <div className="row g-lg-5 g-3">
            <div className="col-lg-6">
              <div className="left-sidebar-box">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="contact-image">
                      <img src="images/inner-page/contact-us.png" className="img-fluid blur-up lazyloaded" alt />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="contact-title">
                      <h3>Get In Touch</h3>
                    </div>
                    <div className="contact-detail">
                      <div className="row g-4">
                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-phone" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Phone</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>(+91) 991 107 0099</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xxl-6 col-lg-12 col-sm-6">
                          <div className="contact-detail-box">
                            <div className="contact-icon">
                              <i className="fa-solid fa-envelope" />
                            </div>
                            <div className="contact-detail-title">
                              <h4>Email</h4>
                            </div>
                            <div className="contact-detail-contain">
                              <p>contact@decasys.in</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="title d-xxl-none d-block">
                <h2>Contact Us</h2>
              </div>
              <div className="right-sidebar-box">
                <form onSubmit={SendQuery}>
                <div className="row">
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label htmlFor="exampleFormControlInput" className="form-label">First Name</label>
                      <div className="custom-input">
                        <input type="text"  
                        name='firstname'
                        onChange={(e) =>
                          setSendData({ ...sendData, firstname: e.target.value })
                        }
                        className="form-control" id="exampleFormControlInput" placeholder="Enter First Name" />
                        <i className="fa-solid fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                      <div className="custom-input">
                        <input type="text" className="form-control"
                         onChange={(e) =>
                          setSendData({ ...sendData, lastname: e.target.value })
                        }
                        id="exampleFormControlInput1" placeholder="Enter Last Name" />
                        <i className="fa-solid fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label htmlFor="exampleFormControlInput2" className="form-label">Email Address</label>
                      <div className="custom-input">
                        <input type="email" 
                        onChange={(e) =>
                          setSendData({ ...sendData, email: e.target.value })
                        }
                        className="form-control" id="exampleFormControlInput2" placeholder="Enter Email Address" />
                        <i className="fa-solid fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-lg-12 col-sm-6">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label htmlFor="exampleFormControlInput3" className="form-label">Phone Number</label>
                      <div className="custom-input">
                        <input type="tel" className="form-control"
                         onChange={(e) =>
                          setSendData({ ...sendData, phone: e.target.value })
                        }
                        id="exampleFormControlInput3" placeholder="Enter Your Phone Number" maxLength={10} oninput="javascript: if (this.value.length > this.maxLength) this.value =
                                     this.value.slice(0, this.maxLength);" />
                        <i className="fa-solid fa-mobile-screen-button" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-md-4 mb-3 custom-form">
                      <label htmlFor="exampleFormControlTextarea" className="form-label">Message</label>
                      <div className="custom-textarea">
                        <textarea className="form-control" id="exampleFormControlTextarea" 
                         onChange={(e) =>
                          setSendData({ ...sendData, message: e.target.value })
                        }
                        placeholder="Enter Your Message" rows={6} defaultValue={""} />
                        <i className="fa-solid fa-message" />
                      </div>
                    </div>
                  </div>
                </div>
                <button type='submit' className="btn btn-animation btn-md fw-bold ms-auto">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Box Section End */}

      <section classname="map-section">
        <div classname="container-fluid p-0">
          <div classname="map-box">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.9814796455544!2d77.30922048098394!3d28.69020061280541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbbcb19f35a3%3A0xedd7d4c81ebe7e71!2sGTB%20Enclave%2C%20Pocket%20A%2C%20Block%20A%2C%20Nand%20Nagri%2C%20Mandoli%2C%20Delhi%2C%20110093!5e0!3m2!1sen!2sin!4v1710747016223!5m2!1sen!2sin" width="100%" height={350} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>



    </div>

  )
}
