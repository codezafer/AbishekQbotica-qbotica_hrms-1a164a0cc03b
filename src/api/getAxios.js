import axios from 'axios';
import {
    isNil, prop, toLower, propOr, lensPath, set,
} from 'ramda';
import { debugLog } from '../utils/commonUtils';
import { BASE_URL } from '../utils/constants';

const WAF_SUPPORT_ID_HEADER = toLower('WAF-Support-ID'); // Axios converts all headers to lowercase

const instance = axios.create({
    baseURL: BASE_URL,
});

const requestHandler = (config) => {
    debugLog('API request', config);
    return config;
};

const responseHandler = (response) => {
    debugLog('API response', response);
    const responseData = propOr('', 'data', response);
    const { responseCode, message } = responseData;
    if (responseCode) {
        return set(lensPath(['data', 'message']), message || 'Success', response);
    }
    return response;
};

const errorHandler = (error) => {
    const {
        code, message, request, response, config,
    } = error;
    debugLog('API error', {
        code,
        message,
        response,
        request,
        config,
    });
    return Promise.reject(error);
};



instance.interceptors.response.use((response) => {
    try {
        return responseHandler(response);
    } catch (error) {
        return errorHandler({
            message: error.message,
            ...response,
        });
    }
});


instance.interceptors.request.use(requestHandler, errorHandler);
instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;
