//requisition

import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Popconfirm, Space, Tooltip } from "antd";
import { DeleteTwoTone, EditTwoTone, DownloadOutlined } from "@ant-design/icons";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
// import "../../antdstyle.css";
import { resolveOnChange } from "antd/lib/input/Input";
// import profile from '../../../../data/db.json'

const RequisitionExternal = () => {
  const [values, setValues] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const url = "http://localhost:9000/requisition";

  const loadData = async () => {
    const response = await axios.get(url);
    setValues(response.data);
  };

  const dataWithDetails = values.map((details) => ({
    ...details,
    key: details.id,
    id: details.id,
    role: details.values.role,
    client: details.values.client,
    experience: `${details.values.experience} Years`,
    vacancy: details.values.vacancy,
    location: details.values.city,
    // location: `${details.values.city}, ${details.values.state}`,
    dateOfReq: details.values.dateOfReq,
    jobType: details.values.jobType,
  }));

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9000/requisition/${id}`);
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
      title: "Job Title",
      dataIndex: "role",
      editTable: true,
      render: (_, record) => (
        <Link to={`/app/administrator/job-details-external/${record.id}`} >{record.role}</Link>
      ),
      sorter: (a, b) => a.role.length - b.role.length,
    },

    {
      title: "Client",
      dataIndex: "client",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancy",
    },
    {
      title: "location",
      dataIndex: "location",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
    },
    {
      title: "Start Date",
      dataIndex: "dateOfReq",
    },

    {
      title: 'Add Profile',
      render: (text, record) => (
        <Link to="/app/administrator/add-candidate-external"><button className="btn btn-sm btn-primary">Add Profile</button></Link>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Requisition - qBotica</title>
          <meta name="description" content="Login page" />
        </Helmet>
      </HelmetProvider>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Requisition</h3>
              {/* <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Requisition</li>
              </ul> */}
            </div>
            <div className="col-auto float-end ml-auto">
              {/* <Link
                to="/app/administrator/create-requisition"
                className="btn add-btn"
              >
                <i className="fa fa-plus" />
                Create
              </Link> */}
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: dataWithDetails.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered <Route path={`${match.url}/job-details/:id`} children={<JobDetails />} />
                dataSource={dataWithDetails}

              // rowKey={record => record.id}
              // onChange={this.handleTableChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionExternal;
