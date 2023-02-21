import axios from './getAxios';
// import { encode } from 'js-base64';
import { storeSession } from "../utils/sessionUtils";

export default async (email, password) => {
    console.log('emailId, pass', email, password)
    const { data } = await axios({
        method: 'POST',
        url: 'Login/ValidateUser',
        data: { "Username": email, "Password": password }
    });
    storeSession(data);
    return data;
};
