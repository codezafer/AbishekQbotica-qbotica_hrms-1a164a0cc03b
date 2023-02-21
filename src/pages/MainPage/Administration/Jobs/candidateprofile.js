/**
 * TermsCondition Page
 */
import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import IMAGEROUTER from '../../../../routes/ImgRouters';

const CandidateProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    axios.get(`http://localhost:9000/candidatelist/${id}`)
      .then((product) => {
        // const newData =  product.data.find((item) => item.id=== parseInt(id));
        setData(product.data);
        console.log(product.data);
      })
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Candidate Profile - qBotica</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
      </HelmetProvider>

      {/* Page Content */}
      <div key={data.id} className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="card mb-0">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#"><img alt="" src={IMAGEROUTER.Avatar} /></a>
                    </div>
                  </div>
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 mb-0" style={{ textTransform: "capitalize" }}>{`${data.values.firstName} ${data.values.lastName}`}</h3>
                          <h5 className="text-muted">{data.values.role}</h5>
                          {/* <small className="text-muted">...</small> */}
                          <div className="staff-id">Skills : </div>
                          <div className="small doj text-muted">
                            <ul className="skillUl">
                              <li>{data.values.mainSkill}</li>
                              <li>{data.values.secondarySkill}</li>
                            </ul>
                          </div>
                          {/* <div className="staff-msg"><Link onClick={() => localStorage.setItem("minheight", "true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <div className="title">Phone:</div>
                            <div className="text"><a href="">{data.values.phone}</a></div>
                          </li>
                          <li>
                            <div className="title">Email:</div>
                            <div className="text"><a href="">{data.values.emailId}</a></div>
                          </li>
                          {/* <li>
                            <div className="title">Birthday:</div>
                            <div className="text">24th July</div>
                          </li> */}
                          <li>
                            <div className="title">Address:</div>
                            <div className="text">{`${data.values.city}, ${data.values.state}.`}</div>
                          </li>
                          <li>
                            <div className="title">Gender:</div>
                            <div className="text">Male</div>
                          </li>
                          {/* <li>
                            <div className="title">Reports to:</div>
                            <div className="text">
                              <div className="avatar-box">
                                <div className="avatar avatar-xs">
                                  <img src={Avatar_16} alt="" />
                                </div>
                              </div>
                              <Link to="/app/profile/employee-profile">
                                Jeffery Lalor
                              </Link>
                            </div>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <div className="pro-edit"><a data-bs-target="#profile_info" data-bs-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card tab-box">
          <div className="row user-tabs">
            <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul className="nav nav-tabs nav-tabs-bottom">
                <li className="nav-item"><a href="#" data-bs-toggle="tab" className="nav-link active">Resume</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CandidateProfile;
