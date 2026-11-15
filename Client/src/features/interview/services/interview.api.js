// import axios from "axios";

// const api = axios.create({
//     baseURL:"http://localhost:3000",
//     withCredentials:true,
// })

// export const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
//     const formData = new FormData();
//     formData.append("resume", resumeFile);
//     formData.append("selfDescription", selfDescription);
//     formData.append("jobDescription", jobDescription);

//     const response = await api.post("/api/interview/", formData,{
//         headers:{
//             "Content-Type": "multipart/form-data"
//         }
//     })

//     return response.data

// }

// export const getAllInterviewReportById = async (interviewId) => {
//     const response = await api.get(`/api/interview/report/${interviewId}`)

//     return response.data
// }

// export const getAllInterviewReports = async () => {
//     const response = await api.get("/api/interview/")

//     return response.data
// }
// /**
//  * @descrption Generates a PDF of the interview report based on the provided interview report ID.
//  * 
//  */
// export const generateResumePdf = async ({InterviewReportId})=>{
//     const response = await api.post(`/api/interview/resume/pdf/${InterviewReportId}`,null,{
//         responseType:"blob"
//     })
//     return response.data
// }


import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://interviewai-3-ghvr.onrender.com/",
    withCredentials: true,
});

export const generateInterviewReport = async ({
    resumeFile,
    selfDescription,
    jobDescription
}) => {
    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post("/api/interview/", formData);

    return response.data;
};

export const getAllInterviewReportById = async (interviewId) => {
    const response = await api.get(
        `/api/interview/report/${interviewId}`
    );

    return response.data;
};

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/");

    return response.data;
};

/**
 * Generates a PDF of the interview report.
 */
export const generateResumePdf = async ({ InterviewReportId }) => {
    const response = await api.post(
        `/api/interview/resume/pdf/${InterviewReportId}`,
        null,
        {
            responseType: "blob"
        }
    );

    return response.data;
};
