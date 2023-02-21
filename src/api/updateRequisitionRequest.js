import axios from "axios";
import { apiUrl } from "./api";

const getRequisitionApi = async () =>{
    const response = await axios.get(`${apiUrl}/${id}`);
    console.log(response.data)
    return response.data
}

const updateRequisitionApi = async (values) =>{
    const response = await axios.put(`${apiUrl}/${id}`,values);
    return response.data
}

const updateRequisition = {
    getRequisitionApi,
    updateRequisitionApi
}

export default updateRequisition