/**
 * Signin Firebase
 */

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import IMAGEROUTER from '../../../routes/ImgRouters';

const OTPscreen = () => {
  return (
    <>
      <HelmetProvider>
        <div>
          <Helmet>
            <title>OTP - qBotica</title>
            <meta name="description" content="Login page" />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className="account-content">
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/login">
              <img src={IMAGEROUTER.AppLogo} alt="qBotica Logo" />
              </Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">OTP</h3>
              <p className="account-subtitle">Verification your account</p>
              {/* Account Form */}
              <div>
                <div className="otp-wrap">
                  <input type="text" placeholder={0} maxLength={1} className="otp-input" />
                  <input type="text" placeholder={0} maxLength={1} className="otp-input" />
                  <input type="text" placeholder={0} maxLength={1} className="otp-input" />
                  <input type="text" placeholder={0} maxLength={1} className="otp-input" />
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">Enter</button>
                </div>
                <div className="account-footer">
                  <p>Not yet received? <Link to="">Resend OTP</Link></p>
                </div>
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>

  );
}


export default OTPscreen;
