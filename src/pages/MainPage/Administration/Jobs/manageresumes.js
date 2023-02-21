/**
 * Signin Firebase
 */

import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { Table, Popconfirm, Space } from 'antd';
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import 'antd/dist/antd';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
// import "../../antdstyle.css"
import axios from 'axios';

const ManagedResumes = () => {

  const [values, setValues] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const url = "http://localhost:9000/candidatelist";

  const loadData = async () => {
    const response = await axios.get(url);
    setValues(response.data);
  };

  const dataWithDetails = values.map((details) => ({
    ...details,
    key: details.id,
    id: details.id,
    name: `${details.values.firstName} ${details.values.lastName}`,
    role: details.values.role,
    experience: `${details.values.experience} Years`,
  }));

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9000/candidatelist/${id}`);
    // const filteredData = values.filter(item => item.id !== id);
    // setValues(filteredData);
    // console.log(filteredData)
    loadData();
  };
  const columns = [
    {
      title: "Id",
      key: "serial",
      dataIndex: "id",
      render: ((item, text, serial) => (page - 1) * 10 + serial + 1),
    },
    {
      title: "Name",
      dataIndex: "name",
      editTable: true,
      render: (_, record) => (
        <Link to={`/app/administrator/candidate-profile/${record.id}`} >{record.name}</Link>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Job Title",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },

    // {
    //   title: 'Start Date',
    //   dataIndex: 'startdate',           
    //   sorter: (a, b) => a.startdate.length - b.startdate.length,
    // },

    // {
    //   title: 'Expiry Date',
    //   dataIndex: 'expirydate',
    //   sorter: (a, b) => a.expirydate.length - b.expirydate.length,
    // },
    {
      title: 'Experience',
      dataIndex: 'experience',
      sorter: (a, b) => a.experience.length - b.experience.length,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',

    //   render: (text, record) => (
    //     <div className="dropdown action-label text-center">
    //     <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
    //       <i className={text==="Open" ? "fa fa-dot-circle-o text-info" : text==="Closed" ?
    //          "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger" } /> {text}
    //     </a>
    //     <div className="dropdown-menu dropdown-menu-right">
    //       <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-info" /> Open</a>
    //       <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-success" /> Closed</a>
    //       <a className="dropdown-item" href="#"><i className="fa fa-dot-circle-o text-danger" /> Cancelled</a>
    //     </div>
    //   </div>
    //     ),
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    {
      title: 'Resume',
      dataIndex: 'applicants',

      render: (text, record) => (
        <a className="btn btn-sm btn-primary"><i className="fa fa-download mr-1" /> Download</a>
      ),
      sorter: (a, b) => a.applicants.length - b.applicants.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure want to delete ?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
          <Link to={`/app/administrator/update-candidate/${record.id}`}>
            <EditTwoTone />
          </Link>
        </Space>
      ),
    },
  ]
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <HelmetProvider>
          <Helmet>
            <title>Manage Resumes - qBotica</title>
            <meta name="description" content="Login page" />
          </Helmet>
        </HelmetProvider>

        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-12">
                <h3 className="page-title">Manage Resumes</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="dashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item">Jobs</li>
                  <li className="breadcrumb-item active">Manage Resumes</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table className="table-striped"
                  pagination={{
                    total: dataWithDetails.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: 'auto' }}
                  columns={columns}
                  // bordered
                  dataSource={dataWithDetails}
                  rowKey={record => record.id}
                // onChange={this.handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Edit Job Modal */}
        <div id="edit_job" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Job</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Job Title</label>
                        <input className="form-control" type="text" defaultValue="Web Developer" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Department</label>
                        <select className="select" defaultValue='Web'>
                          <option>-</option>
                          <option value="Web">Web Development</option>
                          <option>Application Development</option>
                          <option>IT Management</option>
                          <option>Accounts Management</option>
                          <option>Support Management</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Job Location</label>
                        <input className="form-control" type="text" defaultValue="California" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>No of Vacancies</label>
                        <input className="form-control" type="text" defaultValue={5} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Experience</label>
                        <input className="form-control" type="text" defaultValue="2 Years" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Age</label>
                        <input className="form-control" type="text" defaultValue="-" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Salary From</label>
                        <input type="text" className="form-control" defaultValue="32k" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Salary To</label>
                        <input type="text" className="form-control" defaultValue="38k" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Job Type</label>
                        <select className="select" defaultValue="Full">
                          <option value="Full">Full Time</option>
                          <option>Part Time</option>
                          <option>Internship</option>
                          <option>Temporary</option>
                          <option>Remote</option>
                          <option>Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Status</label>
                        <select className="select" defaultValue="Open">
                          <option value="Open">Open</option>
                          <option>Closed</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input type="text" className="form-control datetimepicker" defaultValue="3 Mar 2019" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Expired Date</label>
                        <input type="text" className="form-control datetimepicker" defaultValue="31 May 2019" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" defaultValue={""} />
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
        </div>
        {/* /Edit Job Modal */}
        {/* Delete Job Modal */}
        {/* /Delete Job Modal */}
      </div>
      {/* /Page Wrapper */}
    </>
  );
}

export default ManagedResumes;
