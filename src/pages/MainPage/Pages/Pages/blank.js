/**
 * Blank Page
 */
import React, { Component } from 'react';
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const Blank = () => {
  return (

    <div className="page-wrapper">
      <HelmetProvider>
        <Helmet>
          <title>Blank - qBotica</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
      </HelmetProvider>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Blank Page</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                <li className="breadcrumb-item active">Blank Page</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Content Starts */}
        Content Starts Here
        {/* /Content End */}
      </div>
      {/* /Page Content */}
    </div>

  );
}
export default Blank;