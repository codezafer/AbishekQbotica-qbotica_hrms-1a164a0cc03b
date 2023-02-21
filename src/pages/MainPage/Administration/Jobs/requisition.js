//requisition

import React, { useState, useEffect, useLayoutEffect } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Table, Popconfirm, Space } from "antd";
import { DeleteTwoTone, EditTwoTone, DownloadOutlined } from "@ant-design/icons";
// import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction";
// import "../../antdstyle.css";
// import '../../../../assets/css/font-awesome.min.css';
import { useDispatch, useSelector } from "react-redux";
import { getRequisition, deleteRequisition } from "../../../../redux/reducers/requisitionSlice";


const Requisition = () => {

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, jobs } = useSelector((state) => state.requisition);
  // console.log("jobs", jobs)

  useEffect(() => {
    dispatch(getRequisition())
  }, [dispatch])

  const removeData = async (id) => {
    dispatch(deleteRequisition(id));
    dispatch(getRequisition());
  };



  const dataWithDetails = jobs.map((details) => ({
    ...details,
    key: details.id,
    id: details.id,
    role: details.role,
    client: details.client,
    experience: `${details.experience}`,
    vacancy: details.vacancy,
    location: details.city,
    // location: `${details.city}, ${details.state}`,
    dateOfReq: details.dateOfReq,
    jobType: details.jobType,
  }));


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
        <Link to={`jobDetails/${record.id}`} >{record.role}</Link>
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
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure want to delete ?"
            onConfirm={() => removeData(record.id)}
          >
            <DeleteTwoTone />
          </Popconfirm>
          <Link to={`editJob/${record.id}`}>
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
          <title>Requisition - qBotica</title>
          <meta name="description" content="Login page" />
        </Helmet>
      </HelmetProvider>

      {/* Page Content */}

      <div className="content container-fluid">
        {/* Page Header */}
        {isLoading}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Jobs</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item">Jobs</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <button className="btn add-btn" onClick={() => navigate('addJob')}>
                <i className="fa fa-plus" />
                Create
              </button>
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
      <Outlet />
    </div>
  );
};

export default Requisition;
