// import axios from "axios";

// export const API = axios.create({
//     baseURL: "http://localhost:5000/api/v1/",
// });


// export const setAuthToken = (token) => {
//     if (token) {
//         API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     } else {
//         delete API.defaults.headers.common["Authorization"];
//     }
// };
export const API = () => {
    const baseUrl =
        process.env.REACT_APP_SERVER_URL ||
        'https://dumbmerch34project.herokuapp.com//api/v1' ||
        'https://localhost:5000/api/v1';

    const executeAPI = async (endpoint, config) => {
        const response = await fetch(baseUrl + endpoint, config);
        const data = await response.json();
        return data;
    };

    return {
        get: executeAPI,
        post: executeAPI,
        patch: executeAPI,
        delete: executeAPI,
    };
};
// export const API = () => {
//     const baseUrl = "http://localhost:5000/api/v1";

//     const executeAPI = async (endpoint, config) => {
//         const response = await fetch(baseUrl + endpoint, config);
//         const data = await response.json();
//         return data;
//     };

//     return {
//         get: executeAPI,
//         post: executeAPI,
//         patch: executeAPI,
//         delete: executeAPI,
//     };
// };