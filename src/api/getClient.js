import axios from './getAxios';

export default async () => {
    const { data } = await axios({
        method: 'GET',
        url: 'JobPost/GetClient',
    });
    return data;
};
