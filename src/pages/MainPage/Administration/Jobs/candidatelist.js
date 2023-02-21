//candidatelist

import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Popconfirm, Space } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "antd/dist/antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
// import "../../antdstyle.css";
import { resolveOnChange } from "antd/lib/input/Input";

const CandidateList = () => {
  const [values, setValues] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadData();
    setStatus(status);
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
    location: `${details.values.city}, ${details.values.state}`,
    emailId: details.values.emailId,
    phone: details.values.phone,
  }));

  const handleStatus = async (status) => {
    await axios.patch(`http://localhost:9000/candidatelist`, status);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9000/candidatelist/${id}`);
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
        <Link to={`candidate-profile/${record.id}`} >{record.name}</Link>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Job Title",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      sorter: (a, b) => a.experience.length - b.experience.length,
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Email",
      dataIndex: "emailId",
      sorter: (a, b) => a.emailId.length - b.emailId.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',

      render: (text, record) => (
        <select
          name="status"
          className="btn btn-white btn-sm btn-rounded dropdown-toggle"
          defaultValue={"DEFAULT"}
          onChange={handleStatus}
        >
          <option value="DEFAULT" disabled>
            No Status
          </option>
          <option>In Progress</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
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
            <DeleteTwoTone style={{ color: "red" }} />
          </Popconfirm>
          <Link to={`edit-candidate/${record.id}`}>
            <EditTwoTone />
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Candidate List - qBotica</title>
          <meta name="description" content="Login page" />
        </Helmet>
      </HelmetProvider>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Candidate List</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item">Candidates</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <Link
                to="add-candidate"
                className="btn add-btn"
              >
                <i className="fa fa-plus" />
                Add Candidate
              </Link>
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
                // bordered
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

export default CandidateList;