//UpdateCandidateExternal

import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import { useForm, Controller, set } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCandidateExternal = () => {
  const { id } = useParams();
  const [candidateId, setCandidateId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [emailId, setEmailId] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const [experience, setExperience] = useState();
  const [mainSkill, setMainSkill] = useState();
  const [secondarySkill, setSecondarySkill] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [file, setFile] = useState(null);


  // const {
  //   control,
  //   setErrors,
  //   clearErrors,
  //   formState: { errors },
  // } = useForm()

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios.get(`http://localhost:9000/candidatelist/${id}`)
    setCandidateId(response.data.values.candidateId);
    setFirstName(response.data.values.firstName);
    setLastName(response.data.values.lastName);
    setGender(response.data.values.gender);
    setEmailId(response.data.values.emailId);
    setPhone(response.data.values.phone);
    setRole(response.data.values.role);
    setExperience(response.data.values.experience);
    setMainSkill(response.data.values.mainSkill);
    setSecondarySkill(response.data.values.secondarySkill);
    setState(response.data.values.state);
    setCity(response.data.values.city);
    setFile(response.data.values.file);
  };

  const navigate = useNavigate();

  const CandidateSubmit = (e) => {
    e.preventDefault();
    const values = {
      candidateId: candidateId,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      emailId: emailId,
      phone: phone,
      role: role,
      experience: experience,
      mainSkill: mainSkill,
      secondarySkill: secondarySkill,
      state: state,
      city: city,
      file: file
    }
    try {
      const updatedata = axios.put(`http://localhost:9000/candidatelist/${id}`, { values })
      console.log(updatedata)
      navigate("/app/administrator/candidates");
    } catch (errors) {
      console.log("error")
    }
  };


  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Update Candidate - qBotica</title>
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
            <form onSubmit={CandidateSubmit} >
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
                      value={candidateId}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
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
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      name="lastName"
                      value={lastName}
                      className="form-control "
                      type="text"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={gender}
                      className="form-control3"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="emailId"
                      value={emailId}
                      className="form-control "
                      type="email"
                      onChange={(e) => {
                        setEmailId(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-group">
                    <label>
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={phone}
                      className="form-control"
                      type="number"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      name="role"
                      value={role}
                      className="form-control "
                      type="text"
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      Experience
                    </label>
                    <input
                      name="experience"
                      value={experience}
                      className="form-control"
                      type="number"
                      onChange={(e) => {
                        setExperience(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Main Skill</label>
                    <input
                      name="mainSkill"
                      value={mainSkill}
                      className="form-control "
                      type="text"
                      onChange={(e) => {
                        setMainSkill(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      Secondary Skill
                    </label>
                    <input
                      name="secondarySkill"
                      value={secondarySkill}
                      className="form-control"
                      type="text"
                      onChange={(e) => {
                        setSecondarySkill(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      State
                    </label>
                    <input
                      name="state"
                      value={state}
                      className="form-control"
                      type="text"
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      City
                    </label>
                    <input
                      name="city"
                      value={city}
                      className="form-control"
                      type="text"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Resume</label>
                    <input
                      name="file"
                      value={file}
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* /Page Content */}
    </div>
  );
};
export default UpdateCandidateExternal;