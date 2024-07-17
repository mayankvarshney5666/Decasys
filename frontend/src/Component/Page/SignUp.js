import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addagent } from '../../features/agentSlice';
import { toast } from 'react-toastify';

export default function SignUp() {

  const agent = useSelector(state => state.agent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const SignUp = async (e) => {
    e.preventDefault();
    const aaaa = await dispatch(addagent(data));
    if (aaaa?.payload?.success === true) {
      toast.success(aaaa.payload.message);
      await navigate('/signin')
    } else {
      if (aaaa.payload?.message?.includes('duplicate key error')) {
        toast.warn('Dublicate Mobile Or Email Can Not Be Save');
      }

    }
  };


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
                    <li className="breadcrumb-item active">Create an account</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="log-in-section section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img src="images/inner-page/sign-up.png" className="img-fluid" alt />
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Create an account</h3>
                  <p>Sign up with your email address to get started</p>
                </div>
                <div className="input-box">
                  <form className="row g-4" onSubmit={SignUp}>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input type="text" required onChange={(e) => setData({ ...data, agent_name: e.target.value })} className="form-control" id="fullname" placeholder="Full Name*" />
                        <label htmlFor="fullname">Full Name*</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="email" required onChange={(e) => setData({ ...data, agent_email: e.target.value })} className="form-control" id="email" placeholder="Email Address*" />
                        <label htmlFor="email">Email Address*</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="password" required onChange={(e) => setData({ ...data, agent_password: e.target.value })} className="form-control" id="password" placeholder="Password*" />
                        <label htmlFor="password">Password*</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="number" required onChange={(e) => setData({ ...data, agent_mobile: e.target.value })} className="form-control" id="mobile" placeholder="mobile*" />
                        <label htmlFor="mobile">Mobile*</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="forgot-box">
                        <div className="form-check ps-0 m-0 remember-box">
                          <label className="form-check-label" htmlFor="flexCheckDefault">Company Detail (Optional)</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input type="text" onChange={(e) => setData({ ...data, company_name: e.target.value })} className="form-control" id="fullname" placeholder="Company Name" />
                        <label htmlFor="fullname">Company Name</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-floating theme-form-floating">
                        <input type="text" onChange={(e) => setData({ ...data, gstno: e.target.value })} className="form-control" id="fullname" placeholder="GST No." />
                        <label htmlFor="fullname">GST No.</label>
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <div className="forgot-box">
                        <div className="form-check ps-0 m-0 remember-box">
                          <input className="checkbox_animated check-box" type="checkbox" id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-12">
                      <button className="btn btn-animation w-100 justify-content-center" type="submit">Submit</button>
                    </div>
                  </form>
                </div>

                <div className="other-log-in">
                  <h6 />
                </div>
                <div className="sign-up-box">
                  <Link to="/signin">Existing User? Log in</Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6" />
          </div>
        </div>
      </section>

      <div className="theme-option">
        <div className="setting-box">
          <button className="btn setting-button">
            <i className="fa-solid fa-gear" />
          </button>
          <div className="theme-setting-2">
            <div className="theme-box">
              <ul>
                <li>
                  <div className="setting-name">
                    <h4>Color</h4>
                  </div>
                  <div className="theme-setting-button color-picker">
                    <form className="form-control">
                      <label htmlFor="colorPick" className="form-label mb-0">Theme Color</label>
                      <input type="color" className="form-control form-control-color" id="colorPick" defaultValue="#0da487" title="Choose your color" />
                    </form>
                  </div>
                </li>
                <li>
                  <div className="setting-name">
                    <h4>Dark</h4>
                  </div>
                  <div className="theme-setting-button">
                    <button className="btn btn-2 outline" id="darkButton">Dark</button>
                    <button className="btn btn-2 unline" id="lightButton">Light</button>
                  </div>
                </li>
                <li>
                  <div className="setting-name">
                    <h4>RTL</h4>
                  </div>
                  <div className="theme-setting-button rtl">
                    <button className="btn btn-2 rtl-unline">LTR</button>
                    <button className="btn btn-2 rtl-outline">RTL</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="back-to-top">
          <a id="back-to-top" href="#">
            <i className="fas fa-chevron-up" />
          </a>
        </div>
      </div>
      {/* Tap to top end */}
    </div>

  )
}
