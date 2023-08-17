const axios = require("axios");

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;

        return res;
    },
    error => {
        console.log("err" + error);
        return Promise.reject(error);
    }
);

module.exports = service;
