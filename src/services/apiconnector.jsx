import React from 'react'
import axios from 'axios'

export const axiosInstance = axios.create({});
export const apiConnector = (method, url, bodyData, header, params) => {
    return axiosInstance({
        method: `${method}`,
        url:`${url}`,
        bodyData: bodyData ? bodyData : null,
        header : header ? header : null,
        params : params ? params : null,
    });
}