import React from "react";
import AxiosContext from "./axiosContext";
import axiosInstance from "../../AxiosInstance";



const AxiosProvider = (props) => {
    const axiosRequest = async ({ method, url, data = {}, headers = {} }) => {
        try {
            const response = await axiosInstance(

                {
                    method,
                    url,
                    data,
                    headers,
                }

            );
            return response.data;
        } catch (error) {
            console.error("Axios Error:" + error);
            throw error;
        }
    }

    return (
        <AxiosContext.Provider value={axiosRequest} >
            {props.children}
        </AxiosContext.Provider>
    )
}
export default AxiosProvider;