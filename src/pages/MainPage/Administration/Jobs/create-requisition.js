//createRequisition

import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { createJobs, RESET, getCityDetails, getClientDetails, getCountryDetails, getJobDetails, getStateDetails, getTitleDetails } from "../../../../redux/reducers/createRequisitionSlice"
import { useNavigate, Link } from "react-router-dom";

const CreateRequisition = () => {

  const navigate = useNavigate();

  const [requisition_id, setRequisition_Id] = useState(create_UUID());
  // const [created_on, setcreated_on] = useState("");
  const [job_title, setjob_title] = useState("");
  const [client, setclient] = useState("");
  const [job_type, setjob_type] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pin_code, setpin_code] = useState("");
  const [experience, setexperience] = useState("");
  const [vacancy_count, setvacancy_count] = useState("");
  const [min_salary, setmin_salary] = useState("");
  const [max_salary, setmax_salary] = useState("");
  const [job_description, setjob_description] = useState("");
  const [job_description_type, setjob_description_type] = useState("PDF")
  const [date_of_requisition,setdate_of_requisition] = useState("")



  function create_UUID() {
    let value = Math.floor(1000 + Math.random() * 9000);
    return value;
  }

  const { isLoading, isSuccess, cityData, clientData, jobData, countryData, stateData, titleData, } =
    useSelector((state) => state.createJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCityDetails())
    dispatch(getClientDetails())
    dispatch(getCountryDetails())
    dispatch(getJobDetails())
    dispatch(getStateDetails())
    dispatch(getTitleDetails())
  }, [dispatch]);

  const RequisitionSubmit = async (e) => {
    e.preventDefault();

    const values = {
      requisition_id: requisition_id,
      company_id: client,
      Job_Title_id: job_title,
      job_type_id: job_type,
      country_id: country,
      city_id: city,
      state_id: state,
      pin_code: pin_code,
      experience: experience,
      vacancy_count: vacancy_count,
      min_salary: min_salary,
      max_salary: max_salary,
      job_description: job_description,
      job_description_type: job_description_type,
      date_of_requisition: date_of_requisition
    }

    console.log(values);

    const createData = {
      requisition_id, client, job_title, job_type, country, city, state, pin_code, experience, vacancy_count, min_salary, max_salary, job_description, job_description_type, date_of_requisition
    };

    dispatch(createJobs(createData));
  }

  useEffect(() => {
    if (isSuccess) {
      alert('Saved successfully.')
      navigate('/jobs');
    }
    dispatch(RESET())
  }, [isSuccess, navigate, dispatch]);



  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Create Requisition - qBotica</title>
          <meta name="description" content="Login page" />
        </Helmet>
      </HelmetProvider>
      {/* Page Content */}
      <div className="content container-fluid">
        {isLoading}
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Create Jobs</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/jobs">Jobs</Link></li>
                    <li className="breadcrumb-item">Create Jobs</li>
                  </ul>
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
                      name="requisition_id"
                      className="form-control"
                      value={requisition_id}
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
                      value={date_of_requisition}
                      onChange={e => setdate_of_requisition(e.target.value)}
                      // required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Role / Job Title</label>
                    <select
                      name="role"
                      className="form-control3"
                      value={job_title}
                      onChange={e => setjob_title(e.target.value)}
                      required
                    >
                      <option>Select</option>
                      {
                        titleData.map((get) => (
                          <option key={get.Job_Title_id} value={get.Job_Title_id}> {get.Job_Title_Name}</option>
                        ))
                      }
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
                      onChange={e => setclient(e.target.value)}
                      required
                    >
                      <option>Select</option>
                      {
                        clientData.map((get) => (
                          <option key={get.company_id} value={get.company_id}> {get.company_name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Job Type</label>
                    <select
                      name="jobType"
                      className="form-control3"
                      value={job_type}
                      onChange={e => setjob_type(e.target.value)}
                      required
                    >
                      <option>Select</option>
                      {
                        jobData.map((get) => (
                          <option key={get.job_type_id} value={get.job_type_id}> {get.job_type_name}</option>
                        ))
                      }
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
                      onChange={e => setexperience(e.target.value)}
                      required
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
                      value={vacancy_count}
                      onChange={e => setvacancy_count(e.target.value)}
                      required
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
                      onChange={e => setcountry(e.target.value)}
                      required
                    >
                      <option>Select</option>
                      {
                        countryData.map((get) => (
                          <option key={get.country_id} value={get.country_id}> {get.country_name}</option>
                        ))
                      }
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
                      onChange={e => setcity(e.target.value)}
                      required
                    >
                      <option>Select</option>
                      {
                        cityData.map((get) => (
                          <option key={get.city_id} value={get.city_id}> {get.city_name}</option>
                        ))
                      }
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
                      onChange={e => setstate(e.target.value)}
                      required
                    >
                      <option>Select</option>
                      {
                        stateData.map((get) => (
                          <option key={get.state_id} value={get.state_id}> {get.state_name}</option>
                        ))
                      }
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
                      value={pin_code}
                      onChange={e => setpin_code(e.target.value)}
                      required
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
                      value={min_salary}
                      onChange={e => setmin_salary(e.target.value)}
                      required
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
                      value={max_salary}
                      onChange={e => setmax_salary(e.target.value)}
                      required
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
                      value={job_description}
                      onChange={e => setjob_description(e.target.value)}
                      required
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

export default CreateRequisition;
// const CreateRequisition = () => {

//   const [values, setValues] = useState({
//     requisitionId: create_UUID(),
//     dateOfReq: "",
//     client: "",
//     role: "",
//     jobType: "",
//     country: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     experience: "",
//     vacancy: "",
//     min: "",
//     max: "",
//     jd: false,
//   });
//   const { requisitionId, dateOfReq, client, role, jobType, country, city, state, postalCode, experience, vacancy, min, max, jd, } = values;
//   const dispatch = useDispatch();
//   const navigate = useNavigate()


//   const { isLoading, isSuccess, message, isError, } =
//     useSelector((state) => state.createJobs);

//   const RequisitionSubmit = async (e) => {
//     e.preventDefault();

//     const createData = {
//       requisitionId, dateOfReq, client, role, jobType, country, city, state, postalCode, experience, vacancy, min, max, jd,
//     };


//     dispatch(createJobs(createData));
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       navigate('/jobs');
//     }
//   }, [isSuccess, navigate]);


//   function create_UUID() {
//     let value = Math.floor(1000 + Math.random() * 9000);
//     return value;
//   }


//   // const {
//   //   control,
//   //   setErrors,
//   //   clearErrors,
//   //   formState: { errors },
//   // } = useForm()

//   const onFormFieldChange = (e) => {
//     setValues({
//       ...values,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="page-wrapper">
//       <HelmetProvider>
//         <Helmet>
//           <title>Create Requisition - qBotica</title>
//           <meta name="description" content="Login page" />
//         </Helmet>
//       </HelmetProvider>
//       {/* Page Content */}
//       <div className="content container-fluid">
//         {isLoading}
//         <div className="row">
//           <div className="col-md-8 offset-md-2">
//             {/* Page Header */}
//             <div className="page-header">
//               <div className="row">
//                 <div className="col-sm-12">
//                   <h3 className="page-title">Requisition</h3>
//                 </div>
//               </div>
//             </div>
//             {/* /Page Header */}
//             <form onSubmit={RequisitionSubmit}>
//               <div className="row">
//                 <div className="col-sm-4">
//                   <div className="form-group">
//                     <label>
//                       Requisition ID
//                     </label>
//                     <input
//                       name="requisitionId"
//                       className="form-control"
//                       type="text"
//                       value={values.requisitionId}
//                       readOnly
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-4">
//                   <div className="form-group">
//                     <label>Date of Requisition</label>
//                     <input
//                       name="dateOfReq"
//                       value={values.dateOfReq}
//                       className="form-control "
//                       type="date"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-4">
//                   <div className="form-group">
//                     <label>Role / Job Title</label>
//                     <input
//                       name="role"
//                       value={values.role}
//                       className="form-control "
//                       type="text"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label>
//                       Client
//                     </label>
//                     <input
//                       name="client"
//                       value={values.client}
//                       className="form-control"
//                       type="text"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label>Job Type</label>
//                     <select
//                       name="jobType"
//                       className="form-control3"
//                       onChange={onFormFieldChange}
//                       defaultValue={"DEFAULT"}
//                     >
//                       <option value="DEFAULT" disabled>
//                         Select
//                       </option>
//                       <option>Full-time</option>
//                       <option>Part-time</option>
//                       <option>Intership</option>
//                       {/* <option>Other</option> */}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label>Year of Experience</label>
//                     <input
//                       name="experience"
//                       value={values.experience}
//                       className="form-control"
//                       type="number"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label>Vacancy</label>
//                     <input
//                       name="vacancy"
//                       value={values.vacancy}
//                       className="form-control"
//                       type="number"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6 col-md-6 col-lg-3">
//                   <div className="form-group">
//                     <label>Country</label>
//                     <select
//                       name="country"
//                       className="form-control3"
//                       onChange={onFormFieldChange}
//                       defaultValue={"DEFAULT"}
//                       required
//                     >
//                       <option value="DEFAULT" disabled>
//                         Select
//                       </option>
//                       <option>India</option>
//                       <option>USA</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-sm-6 col-md-6 col-lg-3">
//                   <div className="form-group">
//                     <label>City</label>
//                     <select
//                       name="city"
//                       className="form-control3"
//                       onChange={onFormFieldChange}
//                       defaultValue={"DEFAULT"}
//                       required
//                     >
//                       <option value="DEFAULT" disabled>
//                         Select
//                       </option>
//                       <option>Chennai</option>
//                       <option>Bangalore</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-sm-6 col-md-6 col-lg-3">
//                   <div className="form-group">
//                     <label>State/Province</label>
//                     <select
//                       name="state"
//                       className="form-control3"
//                       onChange={onFormFieldChange}
//                       defaultValue={"DEFAULT"}
//                       required
//                     >
//                       <option value="DEFAULT" disabled>
//                         Select
//                       </option>
//                       <option>Tamil Nadu</option>
//                       <option>Karnataka</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-sm-6 col-md-6 col-lg-3">
//                   <div className="form-group">
//                     <label>Postal Code</label>
//                     <input
//                       name="postalCode"
//                       value={values.postalCode}
//                       className="form-control"
//                       type="text"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <p>Salary</p>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label>Minimum</label>
//                     <input
//                       name="min"
//                       value={values.min}
//                       className="form-control"
//                       type="number"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label>Maximum</label>
//                     <input
//                       name="max"
//                       value={values.max}
//                       className="form-control"
//                       type="number"
//                       onChange={onFormFieldChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-12">
//                   <div className="form-group">
//                     <label>Job Description</label>
//                     <input
//                       name="jd"
//                       className="form-control"
//                       type="file"
//                       id="fileInput"
//                       accept=".pdf"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="submit-section">
//                 <button className="btn btn-primary submit-btn">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {/* /Page Content */}
//     </div>
//   );
// };

// export default CreateRequisition;
