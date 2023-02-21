import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import IMAGEROUTER from '../../../routes/ImgRouters';

function Forgotpassword() {
  return (
    <>
      <HelmetProvider>
        <div>
          <Helmet>
            <title>Forgot Password - qBotica</title>
            <meta name="description" content="Forgot Password page" />
          </Helmet>
        </div>
      </HelmetProvider>

      <div className='container'>
        {/* Account Logo */}
        <div className='account-logo'>
          <img src={IMAGEROUTER.AppLogo} alt="qBotioca-logo" />
        </div>
        {/* /Account Logo */}
        <div className="account-box">
          <div className="account-wrapper">
            <h3 className="account-title">Forgot Password?</h3>
            <p className="account-subtitle">Enter your email to get a password reset link</p>
            {/* Account Form */}
            <div>
              <form>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">Reset Password</button>
                </div>
                <div className="account-footer">
                  <p>Remember your password? <Link to="/login">Login</Link></p> 
                </div>
              </form>

            </div>
          </div> {/*account-wrapper */}
        </div> {/*account-box */}
      </div> {/*container */}

    </>
  )
};

export default Forgotpassword
