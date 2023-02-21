/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const Error500 = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Error 500 - qBotica</title>
          <meta name="description" content="Login page" />
        </Helmet>
      </HelmetProvider>

      <div className="error-box">
        <h1>500</h1>
        <h3><i className="fa fa-warning" /> Oops! Something went wrong</h3>
        <p>The page you requested was not found.</p>
        <Link onClick={() => localStorage.setItem("firstload", "true")} to="/app/main/dashboard" className="btn btn-custom">Back to Home</Link >
      </div>
    </>


  );
}


export default Error500;
