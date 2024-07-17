import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../features/agentSlice';
import { toast } from 'react-toastify';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';


export default function SignIn() {
  const agent = useSelector(state => state.agent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SignIn = async (e) => {
    e.preventDefault();
    const aaaa = await dispatch(login(data));
    localStorage.removeItem('cookies');
    if (aaaa.payload.success == true) {
      toast.success(aaaa.payload.message);
      await navigate('/MyAccount');
    } else {
      toast.warn(aaaa.payload?.message);
    }
    // setTimeout(() => {
    //   window.location.reload(false);
    // }, 500);
    // toast.success('Login Successfully');
  }
  const [forgotPass, setForgotPass] = useState({});



  const handleChange = (e) => {
    setForgotPass({ ...forgotPass, [e.target.name]: e.target.value });
  };


  const forgotpassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/forgotPasswordOtp`, forgotPass, {
        // const response = await axios.post(`http://localhost:4000/api/v1/forgotPasswordOtp`, forgotPass, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('otp', response.data.otp);
        localStorage.setItem('otpemail', forgotPass?.agent_email);
        navigate('/Otp');
        setTimeout(() => {
          window.location.reload(false);
        }, 100);
      } else {
        toast.error('OTP request failed');
      }
    } catch (error) {
      toast.error('Error requesting OTP');
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
                    <li className="breadcrumb-item active">Login</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="log-in-section background-image-2 section-b-space">
        <div className="container-fluid-lg w-100">
          <div className="row">
            <div className="col-xxl-5 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
              <div className="image-contain">
                <img src="images/inner-page/log-in.png" className="img-fluid" alt />
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-6 col-sm-8 mx-auto">
              <div className="log-in-box">
                <div className="log-in-title">
                  <h3>Login</h3>
                  <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <div className="input-box">
                  <form className="row g-4" onSubmit={SignIn}>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="email" name='email' required onChange={(e) => setData({ ...data, email: e.target.value })} className="form-control" id="email" placeholder="Email Address" />
                        <label htmlFor="email">Email Address</label>
                      </div>
                    </div>
                    {/* <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="password" name='password' required onChange={(e) => setData({ ...data, password: e.target.value })} className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div> */}
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          required
                          onChange={(e) => setData({ ...data, password: e.target.value })}
                          className="form-control"
                          id="password"
                          placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="password-toggle-icon"
                          onClick={togglePasswordVisibility}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="forgot-box">
                        <div className="form-check ps-0 m-0 remember-box">
                          <input className="checkbox_animated check-box" type="checkbox" id="flexCheckDefault" />
                          <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                        </div>
                        <a href="" data-bs-toggle="modal" data-bs-target="#forgot-password" className="forgot-password">Forgot Password?</a>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-animation w-100 justify-content-center" type="submit">Log
                        In</button>
                    </div>
                  </form>
                </div>
                {/* <div className="sign-up-box" style={{ fontSize: 12, textAlign: 'center', width: '100%' }}>
                  <span style={{ display: 'inline-flex', fontSize: 12, textAlign: 'center', }}>
                    By continuing, you agree to Decasys&nbsp;
                    <Link to="/TermsOfUse" style={{ fontSize: 12, }}>Terms of Use</Link>
                    &nbsp;and&nbsp;
                    <Link to="/PrivacyPolicy" style={{ fontSize: 12, }}>Privacy Policy</Link>.
                  </span>
                </div> */}
                <div className="sign-up-box">
                  <Link to="/SignUp">New to Decasys? Create an account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* log in section end */}

      {/* <!-- Forgot Password modal box start --> */}
      <div className="modal fade theme-modal" id="forgot-password" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Reset Password</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <form onSubmit={forgotpassword}>
              <div className="modal-body">
                <div className="form-floating mb-4 theme-form-floating">
                  <input
                    type="email"
                    name="agent_email"
                    value={forgotPass.agent_email}
                    onChange={handleChange}
                    className="form-control"
                    id="fname"
                    placeholder="Enter Registered Email"
                    required
                  />
                  <label htmlFor="fname">Enter Registered Email</label>
                </div>

                {/* <div className={`form-floating mb-4 theme-form-floating ${otpnone === 'none' ? 'd-none' : ''} `} >
          <input
            type="text"
            name="otp"
            value={forgotPass.otp}
            onChange={handleChange}
            className="form-control"
            id="otp"
            placeholder="Enter OTP"
          />
          <label htmlFor="otp">Enter OTP</label>
        </div>

        <div className={`form-floating mb-4 theme-form-floating ${newPassNone === 'none' ? 'd-none' : ''} `} >
          <input
            type="password"
            name="newpassword"
            onChange={handleChange}
            value={forgotPass.newpassword}
            className="form-control"
            id="newpassword"
            placeholder="Enter New Password"
          />
          <label htmlFor="newpassword">Enter New Password</label>
        </div>

        <div className={`form-floating mb-4 theme-form-floating ${confPassNone === 'none' ? 'd-none' : ''} `} >
          <input
            type="password"
            name="confirmdpassword"
            onChange={handleChange}
            value={forgotPass.confirmdpassword}
            className="form-control"
            id="confirmdpassword"
            placeholder="Confirm Password"
          />
          <label htmlFor="confirmdpassword">Confirm Password</label>
        </div> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-md" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn theme-bg-color btn-md text-white" data-bs-dismiss="modal">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- Forgot Password modal box end --> */}

    </div>


  )
}
