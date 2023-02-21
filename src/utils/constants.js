export const url = "http://localhost:3000/login";
export const apiUrl = "http://localhost:9000/requisition";
export const titleUrl = "http://localhost:9000/jobTitle";
export const clientUrl = "http://localhost:9000/client";
export const jobUrl = "http://localhost:9000/jobType";
export const countryUrl = "http://localhost:9000/country";
export const stateUrl = "http://localhost:9000/state";
export const cityUrl = "http://localhost:9000/city";


const nodeEnv = process.env.NODE_ENV;
const isDev = nodeEnv === 'development';

export const BASE_URL = isDev ? "https://qbothrportal.azurewebsites.net/api/" : 'https://qbothrportal.azurewebsites.net/'
export const ROLES = {
    ADMIN: 'ADMIN',
    INTERNAL: 'Internal',
    EXTERNAL: 'External',
    PANEL: 'Panel'
}