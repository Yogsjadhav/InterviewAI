// // import axios from 'axios'


// // export async function register ({username, email, pasword}){
// //     try{
// //         const response = await axios.post("http://localhost:3000/api/auth/register",{
// //             username,
// //             email,
// //             password: pasword
// //         },{
// //             withCredentials: true
// //         })
// //         return response.data
// //     }catch(error){
// //         console.log(error)
// //     }
// // }

// // export async function login({email, password}){
// //     try{
// //         const response = await axios.post("http://localhost:3000/api/auth/login",{
// //             email, password
// //         },{
// //             withCredentials: true
// //         })
// //         return response.data
// //     }catch(error){
// //         console.log(error)
// //     }

// // }

// // export async function logout (){
// //     try{
// //         const response = await axios.get("http://localhost:3000/api/auth/logout",{
// //             withCredentials:true
// //         })
// //         return response.data
// //     }catch(error){
// //         console.log(error)
// //     }
// // }

// // export async function getMe(){
// //    try{
// //      const response = await axios.get("http://localhost:3000/api/auth/get-me",{
// //         withCredentials:true
// //     })
// //     return response.data
// //    }catch(error){
// //     console.log(error)
// //    }
// // }


// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true,
// });

// // REGISTER
// export const register = async ({ username, email, password }) => {
//     try {
//         const response = await API.post("/auth/register", {
//             username,
//             email,
//             password,
//         });

//         return response.data;
//     } catch (error) {
//         console.error(
//             "Register Error:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

// // LOGIN
// export const login = async ({ email, password }) => {
//     try {
//         const response = await API.post("/auth/login", {
//             email,
//             password,
//         });

//         return response.data;
//     } catch (error) {
//         console.error(
//             "Login Error:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

// // LOGOUT
// export const logout = async () => {
//     try {
//         const response = await API.get("/auth/logout");
//         return response.data;
//     } catch (error) {
//         console.error(
//             "Logout Error:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

// // GET CURRENT USER
// export const getMe = async () => {
//     try {
//         const response = await API.get("/auth/get-me");
//         return response.data;
//     } catch (error) {
//         console.error(
//             "Get Me Error:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };



// import axios from "axios";

// const API = axios.create({
//     baseURL: "https://interviewai-3-ghvr.onrender.com/api",
//     withCredentials: true,
// });

// // REGISTER
// export const register = async ({ username, email, password }) => {
//     const response = await API.post("/auth/register", {
//         username,
//         email,
//         password,
//     });
//     return response.data;
// };

// // LOGIN
// export const login = async ({ email, password }) => {
//     const response = await API.post("/auth/login", {
//         email,
//         password,
//     });
//     return response.data;
// };

// // LOGOUT
// export const logout = async () => {
//     const response = await API.get("/auth/logout");
//     return response.data;
// };

// // GET CURRENT USER
// export const getMe = async () => {
//     const response = await API.get("/auth/get-me");
//     return response.data;
// };

import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// REGISTER
export const register = async ({ username, email, password }) => {
    const response = await API.post("/auth/register", {
        username,
        email,
        password,
    });
    return response.data;
};

// LOGIN
export const login = async ({ email, password }) => {
    const response = await API.post("/auth/login", {
        email,
        password,
    });
    return response.data;
};

// LOGOUT
export const logout = async () => {
    const response = await API.get("/auth/logout");
    return response.data;
};

// GET CURRENT USER
export const getMe = async () => {
    const response = await API.get("/auth/get-me");
    return response.data;
};

export default API;
