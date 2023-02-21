import axios from "axios";
import { postUrl, jobTypeUrl, countryUrl, stateUrl, cityUrl, jobTitle, clientUrl } from "./api";

const createRequisition = async(createData) => {
    const response = await axios.post(postUrl, createData);
    return response.data
}

const getCity = async () => {
    const response = await axios.get(cityUrl);
    return response.data;
}

const getJobType = async() => {
    const response = await axios.get(jobTypeUrl );
    return response.data;
}

const getCountry = async() => {
    const response = await axios.get(countryUrl);
    return response.data;
}

const getState = async() => {
    const response = await axios.get(stateUrl);
    return response.data;
}
const getJobTitle = async() => {
    const response = await axios.get(jobTitle);
    return response.data;
}

const getClient = async() => {
    const response = await axios.get(clientUrl);
    return response.data;
}


const createRequisitionApi = {
    createRequisition,
    getCity,
    getClient,
    getState,
    getJobTitle,
    getCountry,
    getJobType
}

export default createRequisitionApi;
