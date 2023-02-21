import axios from "axios";
import { apiUrl } from "./api";

const getRequisitionApi = async () => {
    const response = await axios.get(apiUrl);
    console.log("get",response.data)
    return response.data;
}

const deleteRequisitionData = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`);
    console.log("responsedelete", response)
    return response.data.message;
};

const requisitionApi = {
    getRequisitionApi,
    deleteRequisitionData
}


export default requisitionApi;