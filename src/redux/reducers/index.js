import { combineReducers } from "@reduxjs/toolkit"
import loginReducer from './loginSlice'
import requisitionReducer from "./requisitionSlice"
import createRequisitionReducer from "./createRequisitionSlice"
import updateRequisitonReducer from "./createRequisitionSlice"
import userReducer from "./userReducer"
import masterdataReducer from "./masterdataReducer"


export default () => combineReducers({
    login: loginReducer,
    user: userReducer,
    masterData: masterdataReducer,
    requisition: requisitionReducer,
    createJobs: createRequisitionReducer,
    updateJobs: updateRequisitonReducer
})