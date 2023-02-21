/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Routes, Route } from 'react-router-dom';

import EmployeeProfile from "./employeeprofile"
import ClientProfile from "./clientprofile"


const subscriptionroute = ({ match }) => (
    <Routes>
        {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/employee-profile`} /> */}
        <Route path={`${match.url}/employee-profile`} component={EmployeeProfile} />
        <Route path={`${match.url}/client-profile`} component={ClientProfile} />
    </Routes>
);

export default subscriptionroute;
