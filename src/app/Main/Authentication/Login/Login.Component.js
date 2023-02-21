import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from 'react-router-dom';
import IMAGEROUTER from '../../../routes/ImgRouters'
import { useForm, } from 'react-hook-form'

const LoginComponent = ({ loginRedux }) => {

    const [eye, seteye] = useState(true);
    const [successMsg, setSuccessMsg] = useState("")
    const [formData, setFormData] = useState(initialState);
    const { emailId, password } = formData;

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const loginUser = (e) => {
        console.log('loging')
        e.preventDefault();
        loginRedux(emailId, password, navigate);
    };

    const {
        setError,
        clearErrors,
        formState: { errors },
    } = useForm()

    const onEyeClick = () => {
        seteye(!eye)
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Login - qBotica</title>
                    <meta name="description" content="Login page" />
                </Helmet>
            </HelmetProvider>

            <div className="account-content">
                {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link> */}
                <div className="container">
                    {/* Account Logo */}
                    <div className="account-logo">
                        <Link to="/login"><img src={IMAGEROUTER.AppLogo} alt="Qbotica" /></Link>
                    </div>
                    {/* /Account Logo */}
                    <div className="account-box">
                        <div className="account-wrapper">
                            <h3 className="account-title">Login</h3>
                            <p className="account-subtitle"></p>
                            {/* Account Form */}
                            <div>
                                <form onSubmit={loginUser}>
                                    {successMsg && <div className='task-success'>{successMsg}</div>}
                                    <small>{errors?.error?.message}</small>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input className={`form-control  ${errors?.emailId ? "error-input" : ""}`}
                                            name="emailId"
                                            type="emailId"
                                            value={emailId}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                        <small>{errors?.email?.message}</small>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <label>Password</label>
                                            </div>
                                            <div className="col-auto">
                                                <Link className="text-muted" to="/forgotpassword">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="pass-group">
                                            <input type={eye ? "password" : "text"} className={`form-control  ${errors?.password ? "error-input" : ""}`}
                                                name="password"
                                                value={password}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                            <span onClick={onEyeClick} className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"}`} />
                                        </div>
                                        <small>{errors?.password?.message}</small>
                                    </div>
                                    <div className="form-group text-center">
                                        <button
                                            className="btn btn-primary account-btn"
                                            type="submit"
                                        >
                                            Login
                                        </button>

                                    </div>
                                </form>
                                <div className="account-footer">
                                    <p>Don't have an account yet? <Link to="/auth/register">Register</Link></p>
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

export default LoginComponent