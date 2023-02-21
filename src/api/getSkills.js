

import axios from './getAxios';
// import { encode } from 'js-base64';

export default async () => {
    const { data } = await axios({
        method: 'GET',
        url: 'CandidateDetails/GetSkills',
    });
    return data;
};
