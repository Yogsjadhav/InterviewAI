import axios from "axios";

const configuredApiUrl =
    import.meta.env.VITE_API_URL || "https://interviewai-7.onrender.com/api";
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");

const API = axios.create({
    baseURL: normalizedApiUrl.endsWith("/api")
        ? normalizedApiUrl
        : `${normalizedApiUrl}/api`,
    withCredentials: true,
});

export default API;
