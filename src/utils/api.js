import Axios from 'axios';

const axios = Axios.create({});

export const getConfig = (params = {}, data = {}) => {
    return {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            ...params,
        },
        data: {
            ...data,
        },
    };
};

export const get = async (url, query = {}) => {
    const res = await axios.get(getUrl(url), getConfig(query));
    return res.data;
};

export const getUrl = (path) => {
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    return `${BASE_URL}${path}`;
};
