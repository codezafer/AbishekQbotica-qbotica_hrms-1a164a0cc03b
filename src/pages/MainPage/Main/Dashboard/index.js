/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Requisition from '../../Administration/Jobs/requisition';
import Employeedashboard from './employeedashboard';
import JobsDashboard from './jobs_dashboard';

const DashboardRoute = ({ match }) => (
  <Routes>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} /> */}
      <Route path={`${match.url}/dashboard`} component={JobsDashboard} />
      {/* <Route path={`${match.url}/dashboard`} component={Employeedashboard} /> */}
      {/* <Route path={`${match.url}/dashboard`} component={Requisition} /> */}
   </Routes>

);

export default DashboardRoute;
