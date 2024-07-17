import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../features/agentSlice';
import { toast } from 'react-toastify';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';


export default function OtpForgotPassword() {
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
  const [newPassNone, setNewPassNone] = useState('none');
  const [confPassNone, setConfPassNone] = useState('none');

  const handleChange = (e) => {
    if (e.target.value.length == 6) {
      if (localStorage.getItem('otp') == e.target.value) {
        setNewPassNone('block');
        setConfPassNone('block');
        toast.success('Correct Otp Varify');
      } else {
        toast.warn('plz Enter Correct Otp');
      }
    }
  };


  const forgotpassword = async (e) => {
    e.preventDefault();

    const forgotPass1 = await { ...forgotPass, agent_email: localStorage.getItem('otpemail') }
    if (forgotPass.newpassword == forgotPass.confirmdpassword) {
      try {
        const response = await axios.post(`${apiUrl}/forgotPassword`, forgotPass1, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.removeItem('otpemail');
          localStorage.removeItem('otp');
          navigate('/signin')
        } else {
          toast.error('Password update failed');
        }
      } catch (error) {
        toast.error('Error updating password');
      }
    } else {
      toast.warn('Please enter matching new password and confirmed password');
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
                    <li className="breadcrumb-item active">Forgot Password</li>
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
                  <h3>Forgot Password</h3>
                </div>
                <div className="input-box">
                  <form className="row g-4" onSubmit={forgotpassword}>
                    <div className="col-12">
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="number" name='otp' required onChange={handleChange} className="form-control" placeholder="enter  otp" />
                        <label htmlFor="email">Enter Otp</label>
                      </div>
                    </div>
                    <div className="col-12" style={{ display: newPassNone }}>
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="text" name='otp' required onChange={(e) => setForgotPass({ ...forgotPass, newpassword: e.target.value })} className="form-control" id="email" placeholder="Email Address" />
                        <label htmlFor="email">Enter New Password</label>
                      </div>
                    </div>
                    <div className="col-12" style={{ display: confPassNone }}>
                      <div className="form-floating theme-form-floating log-in-form">
                        <input type="text" name='otp' required onChange={(e) => setForgotPass({ ...forgotPass, confirmdpassword: e.target.value })} className="form-control" id="email" placeholder="Email Address" />
                        <label htmlFor="email"> Confirm Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-animation w-100 justify-content-center" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* log in section end */}



    </div>


  )
}
