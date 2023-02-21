import React, { useState } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from 'react-router-dom';
import IMAGEROUTER from '../../../routes/ImgRouters';
import { useForm, Controller } from 'react-hook-form'
import { emailrgx } from '../../../constant/index'
import { Modal } from 'antd';


const Registrationpage = (props) => {

  const [emailId, setEmailId] = useState("")
  const [role, setRole] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState();
  const [copied, setCopied] = useState(false);

  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  async function regsiterApi() {
    const url = "http://localhost:3000/register";
    const inputs = JSON.stringify({ emailId, role })
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
  const RegsiterSubmit = async (e) => {
    e.preventDefault();
    if (emailId === "") {
      return setError('error', {
        message: "The required field is empty"
      })
    }

    if (!role) {
      return setError('error', {
        message: "The role is empty"
      })
    }

    const { times, msg } = await regsiterApi();
    if (!emailrgx.test(emailId)) {
      setError('email', {
        message: "Invalid email"
      })
    }
    else if (times === 4) {
      clearErrors(['email'])
      setError('error', {
        message: msg
      })
    }
    else {
      clearErrors(['email', 'error'])
      setOpen(true)
      setModalText(msg)
      setCopied(navigator.clipboard.writeText(msg))
    }
  }


  const showModal = () => {
    setOpen(false);
  };


  const handleOk = () => {
    setModalText("Copied!")
    setLoading(true);
    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 1000);
  };



  // const handleCancel = () => {
  //   setOpen(false)
  // };


  return (


    //format: shift+Alt+F
    <>
      <HelmetProvider>
        <Helmet>
          <title>Regsiter - qBotica</title>
          <meta name="description" content="Regsiter page" />
        </Helmet>
      </HelmetProvider>
      <div className="account-content">
        {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link> */}
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <Link to="/login"><img src={IMAGEROUTER.AppLogo} alt="qBotica Logo" /></Link>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Register</h3>
              <p className="account-subtitle"></p>
              {/* Account Form */}
              <div>
                <form onSubmit={RegsiterSubmit}>
                  {successMsg && <div className='task-success'>{successMsg}</div>}
                  <small>{errors?.error?.message}</small>
                  <div className="form-group">
                    <label>Email Address</label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input className={`form-control  ${errors?.email ? "error-input" : ""}`} type="text" value={value} onChange={(e) => setEmailId(e.target.value)} />

                      )}
                    />
                    <small>{errors?.email?.message}</small>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Role</label>
                      </div>
                    </div>
                    <Controller
                      name="role"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="pass-group">

                          <select className={`form-control2  ${errors?.email ? "error-input" : ""}`} type="text" value={value} onChange={(e) => setRole(e.target.value)} defaultValue={'DEFAULT'} >
                            <option value="DEFAULT" disabled >Select</option>
                            <option value="HR qBotica">Admin</option>
                            <option value="Interviewer">Interviewer</option>
                            <option value="External">External</option>
                            <option value="External">Internal Panel</option>
                          </select>
                        </div>
                      )}

                    />
                    <small>{errors?.password?.message}</small>
                  </div>

                  <div className="form-group text-center">
                    <button className="btn btn-primary account-btn" onClick={showModal}>
                      Generate Password
                    </button>
                    <Modal
                      title="Password"
                      open={open}
                      onOk={handleOk}
                      // onCancel={handleCancel}
                      footer={[
                        <button key="submit" id='copy' type="button" className='btn btn-info me-1' loading={loading} onClick={handleOk} copy={copied} >
                          Copy
                        </button>
                        //   <button key="back" type="button" className='btn btn-dark me-1'  onClick={handleCancel} >
                        //   Cancel
                        // </button>
                      ]}
                    >
                      <p><strong>{modalText}</strong></p>
                    </Modal>
                  </div>
                </form>
                <div className="account-footer">
                  <p>Click on <Link to="/auth/login">Login</Link></p>
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


export default Registrationpage;