//CreateCandidateExternal

import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios, { Axios } from "axios";
import { useForm, Controller, set } from "react-hook-form";

const CreateCandidateExternal = (props) => {
  const [values, setValues] = useState({
    candidateId: "",
    firstName: "",
    lastName: "",
    gender: "",
    emailId: "",
    phone: "",
    role: "",
    experience: "",
    mainSkill: "",
    secondarySkill: "",
    state: "",
    city: "",
    status: "open",
  });

  // const formData = new FormData();
  // formData.append('file', fileInput.files[0]);

  const url = "http://localhost:9000/candidatelist";
  const CandidateSubmit = async (e) => {
    e.preventDefault();
    await axios.post(url, { values });
    props.history.push("/app/administrator/candidates");

  };

  useEffect(() => {
    CandidateSubmit();
  }, []);

  const onFormFieldChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Create Candidate - qBotica</title>
          <meta name="description" content="Login page" />
        </Helmet>
      </HelmetProvider>

      {/* Page Content */}
      <div className="content container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Candidate</h3>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <form onSubmit={CandidateSubmit}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>
                      Candidate Id
                    </label>
                    <input
                      name="candidateId"
                      className="form-control"
                      type="text"
                      value={values.candidateId}
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>
                      First Name
                    </label>
                    <input
                      name="firstName"
                      className="form-control"
                      type="text"
                      value={values.firstName}
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="lastName"
                      value={values.lastName}
                      className="form-control "
                      type="text"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>
                      Gender
                    </label>
                    <select
                      name="gender"
                      className="form-control3"
                      onChange={onFormFieldChange}
                      defaultValue={"DEFAULT"}
                      required
                    >
                      <option value="DEFAULT" disabled>
                        Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      {/* <option>Other</option> */}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="emailId"
                      value={values.emailId}
                      className="form-control "
                      type="email"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone"
                      value={values.phone}
                      className="form-control"
                      type="number"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Job Role</label>
                    <input
                      name="role"
                      value={values.role}
                      className="form-control "
                      type="text"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Year of Experience</label>
                    <input
                      name="experience"
                      value={values.experience}
                      className="form-control"
                      type="number"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Main Skill</label>
                    <input
                      name="mainSkill"
                      value={values.mainSkill}
                      className="form-control"
                      type="text"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Secondary Skill</label>
                    <input
                      name="secondarySkill"
                      value={values.secondarySkill}
                      className="form-control"
                      type="text"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      name="state"
                      value={values.state}
                      className="form-control"
                      type="text"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      name="city"
                      value={values.city}
                      className="form-control"
                      type="text"
                      onChange={onFormFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Resume</label>
                    <input
                      className="form-control"
                      type="file"
                      id="fileInput"
                      accept=".pdf"
                    />
                  </div>
                </div>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div >
      {/* /Page Content */}
    </div >
  );
};


export default CreateCandidateExternal;