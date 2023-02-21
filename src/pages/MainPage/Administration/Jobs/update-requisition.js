//createRequisition

import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { pick, product, prop } from "ramda"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, updateJobs  } from "../../../../redux/reducers/updateRequisitionSlice";

import { useParams, useNavigate } from "react-router-dom";

const UpdateRequisition = () => {

  const { id } = useParams();
  // const [data, setData] = useState([]);

  const {isLoading, update} = useSelector((state) => state.updateJobs)
  console.log("update",update)

  useEffect(() => {
    axios.get(`http://localhost:9000/requisition/${id}`)
      .then((product) => {
        // setData(product.data);
        console.log("product",product.data),
        setRequisitionId(prop("requisitionId", product.data))
        setDateOfReq(prop("dateOfReq", product.data))
        setRole(prop("role", product.data))
        setClient(prop("client", product.data))
        setJobType(prop("jobType", product.data))
        setCountry(prop("country", product.data))
        setCity(prop("city", product.data))
        setState(prop("state", product.data))
        setPostalCode(prop("postalCode", product.data))
        setExperience(prop("experience", product.data))
        setVacancy(prop("vacancy", product.data))
        setMin(prop("min", product.data))
        setMax(prop("max", product.data))
      })
  }, []);
 

  const navigate = useNavigate();

  const [requisitionId, setRequisitionId] = useState("");
  const [dateOfReq, setDateOfReq] = useState("");
  const [role, setRole] = useState("");
  const [client, setClient] = useState("");
  const [jobType, setJobType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [experience, setExperience] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [jd, setJd] = useState("");

  // const [apirole, setapiRole] = useState([]);
  // const [apiclient, setapiClient] = useState([]);
  // const [apijobType, setapiJobType] = useState([]);
  // const [apicountry, setapiCountry] = useState([]);
  // const [apicity, setapiCity] = useState([]);
  // const [apistate, setapiState] = useState([]);

  // function create_UUID() {
  //   let value = Math.floor(1000 + Math.random() * 9000);
  //   return value;
  // }

  // useEffect(() => {
  //   const getRole = async () => {
  //     const req = await fetch("http://localhost:9000/jobTitle");
  //     const getres = await req.json();
  //     console.log(getres);
  //     setapiRole(await getres);

  //   }
  //   getRole();

  // }, []);

  // useEffect(() => {
  //   const getClient = async () => {
  //     const req = await fetch("http://localhost:9000/client");
  //     const getres = await req.json();
  //     console.log(getres);
  //     setapiClient(await getres);

  //   }
  //   getClient();

  // }, []);

  // useEffect(() => {
  //   const getJobType = async () => {
  //     const req = await fetch("http://localhost:9000/jobType");
  //     const getres = await req.json();
  //     console.log(getres);
  //     setapiJobType(await getres);

  //   }
  //   getJobType();

  // }, []);


  // useEffect(() => {
  //   const getCountry = async () => {
  //     const req = await fetch("http://localhost:9000/country");
  //     const getres = await req.json();
  //     console.log(getres);
  //     setapiCountry(await getres);

  //   }
  //   getCountry();

  // }, []);

  // useEffect(() => {
  //   const getState = async () => {
  //     const req = await fetch("http://localhost:9000/state");
  //     const getres = await req.json();
  //     console.log(getres);
  //     setapiState(await getres);

  //   }
  //   getState();

  // }, []);

  // useEffect(() => {
  //   const getCity = async () => {
  //     const req = await fetch("http://localhost:9000/city");
  //     const getres = await req.json();
  //     console.log(getres);
  //     setapiCity(await getres);

  //   }
  //   getCity();

  // }, []);

  const url = `http://localhost:9000/requisition/${id}`;

  const RequisitionSubmit = async (e) => {
    e.preventDefault();

    const values = {
      requisitionId: requisitionId,
      dateOfReq: dateOfReq,
      client: client,
      role: role,
      jobType: jobType,
      country: country,
      city: city,
      state: state,
      postalCode: postalCode,
      experience: experience,
      vacancy: vacancy,
      min: min,
      max: max,
      jd: jd,
    }

    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ values })
    }).then((res) => {
      alert('updated successfully.')
      navigate('/app/jobs');
    }).catch((err) => {
      console.log(err.message)
    })

  }

  // console.log(
  //   "role:", role
  // )

  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Edit Requisition - qBotica</title>
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
                  <h3 className="page-title">Requisition</h3>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <form onSubmit={RequisitionSubmit}>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>
                      Requisition ID
                    </label>
                    <input
                      type="text"
                      name="requisitionId"
                      className="form-control"
                      value={requisitionId}
                      // onChange={onFormFieldChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Date of Requisition</label>
                    <input
                      type="date"
                      name="dateOfReq"
                      className="form-control"
                      value={dateOfReq}
                      onChange={(e) => setDateOfReq(e.target.value)}
                    //required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Role / Job Title</label>
                    <select
                      name="role"
                      className="form-control3"
                      value={role}
                      onChange={e => setRole(e.target.value)}

                    //required
                    >
                      {/* <option>Select</option> */}
                      {/* {
                        apirole.map((get) => (
                          <option key={get.Job_Title_id} value={get.Job_Title_id}> {get.Job_Title_Name}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>
                      Client
                    </label>
                    <select
                      name="client"
                      className="form-control3"
                      value={client}
                      // options = {client}
                      onChange={e => setClient(e.target.value)}

                    //required
                    >
                      {/* <option>Select</option> */}
                      {/* {
                        apiclient.map((get) => (
                          <option key={get.company_id} value={get.company_id}> {get.company_name}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Job Type</label>
                    <select
                      name="jobType"
                      className="form-control3"
                      value={jobType}
                      onChange={e => setJobType(e.target.value)}

                    //required
                    >
                      <option>Select</option>
                      {/* {
                        apijobType.map((get) => (
                          <option key={get.job_type_id} value={get.job_type_id}> {get.job_type_name}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Year of Experience</label>
                    <input
                      type="number"
                      name="experience"
                      className="form-control"
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                    //required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Vacancy</label>
                    <input
                      type="number"
                      name="vacancy"
                      className="form-control"
                      value={vacancy}
                      onChange={e => setVacancy(e.target.value)}
                    //required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      className="form-control3"
                      value={country}
                      onChange={e => setCountry(e.target.value)}

                    //required
                    >
                      <option>Select</option>
                      {/* {
                        apicountry.map((get) => (
                          <option key={get.country_id} value={get.country_id}> {get.country_name}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>City</label>
                    <select
                      name="city"
                      className="form-control3"
                      value={city}
                      onChange={e => setCity(e.target.value)}

                    //required
                    >
                      <option>Select</option>
                      {/* {
                        apicity.map((get) => (
                          <option key={get.city_id} value={get.city_id}> {get.city_name}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      name="state"
                      className="form-control3"
                      value={state}
                      onChange={e => setState(e.target.value)}

                    //required
                    >
                      <option>Select</option>
                      {/* {
                        apistate.map((get) => (
                          <option key={get.state_id} value={get.state_id}> {get.state_name}</option>
                        ))
                      } */}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="form-control"
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                    //required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <p>Salary</p>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Minimum</label>
                    <input
                      type="number"
                      name="min"
                      className="form-control"
                      value={min}
                      onChange={e => setMin(e.target.value)}
                    //required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Maximum</label>
                    <input
                      type="number"
                      name="max"
                      className="form-control"
                      value={max}
                      onChange={e => setMax(e.target.value)}
                    //required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Job Description</label>
                    <input
                      type="file"
                      name="jd"
                      className="form-control"
                      accept=".pdf"
                    //required
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
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default UpdateRequisition;