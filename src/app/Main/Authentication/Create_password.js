/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { clearTempEmailId, getTempEmailId } from '../../../utils/storageConstants';
import IMAGEROUTER from '../../../routes/ImgRouters';

const CreatePassword = (props) => {
  /**
   * On User Login
   */
  const [eye1, seteye1] = useState(true);
  const [eye2, seteye2] = useState(true);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
  })

  useEffect(() => {
    const tempEmailId = getTempEmailId();
    setEmailId(tempEmailId)
  }, [])


  async function regsiterApi() {
    const url = "http://localhost:3000/changePassword";
    const inputs = JSON.stringify({ emailId, password })
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: inputs,
    }
    try {
      const req = await fetch(url, options);
      const res = await req.json();
      return res;

    } catch (err) { console.log(err) }

  }


  const RegisterSubmit = async (e) => {
    e.preventDefault();

    if (emailId === "" || password === "" || confirmPassword === "") {
      return setError('error', {
        message: "The required field is empty"
      })
    }
    const registerRequest = await regsiterApi();

    if (password != confirmPassword || registerRequest.times === 6) {
      setError('confirmPassword', {
        message: "Password doesn't Match"
      })
      return props.history.push('/createpassword')
    }
    else if (registerRequest.times === 5 && password === confirmPassword) {
      clearErrors(['email', 'password'])
      setTimeout(() => {
        props.history.push('/login')
      }, 500)
    }
    clearTempEmailId();
  }


  const onEyeClick1 = () => {
    seteye1(!eye1)
  }

  const onEyeClick2 = () => {
    seteye2(!eye2)
  }

  return (

    <>
      <HelmetProvider>
        <div>
          <Helmet>
            <title>Create Password - qBotica</title>
            <meta name="description" content="Login page" />
          </Helmet>
        </div>
      </HelmetProvider>

      <div className="account-content">
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/login"><img src={IMAGEROUTER.AppLogo} alt="Qbotica" /></Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Create Password</h3>
              <p className="account-subtitle"></p>
              {/* Account Form */}
              <div>
                <form onSubmit={RegisterSubmit}>
                  <small>{errors?.error?.message}</small>
                  <div className="form-group">
                    <label>Email ID</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input className={`form-control-disabled  ${errors?.email ? "error-input" : ""}`} type="text" value={emailId || value} readOnly onChange={(e) => setEmailId(e.target.value)} autoComplete="false" />

                      )}
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className="form-group">
                    <label>Create Password</label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input type={eye1 ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={(e) => setPassword(e.target.value)} autoComplete="false" />
                          <span onClick={onEyeClick1} className={`fa toggle-password" ${eye1 ? "fa-eye-slash" : "fa-eye"}`} />
                        </div>
                      )}
                    />
                    <small>{errors?.Password?.message}</small>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">
                          <input type={eye2 ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`} value={value} onChange={(e) => setPassword(e.target.value)} autoComplete="false" />
                          <span onClick={onEyeClick2} className={`fa toggle-password" ${eye2 ? "fa-eye-slash" : "fa-eye"}`} />
                        </div>
                      )}
                    />
                    <small>{errors?.confirmPassword?.message}</small>
                  </div>

                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" type="submit" >Register </button>
                  </div>
                </form>
              </div>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default CreatePassword;
