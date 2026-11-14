// import {getAllInterviewReportById, getAllInterviewReports, generateInterviewReport} from "../services/interview.api"
// import { useContext } from "react"
// import { InterviewContext } from "../interview.context"


// export const useInterview = () => {

//     const context = useContext(InterviewContext);

//     if(!context){
//         throw new Error("useInterview must be used within an InterviewProvider")
//     }

//     const {loading, setLoading, report, setReport , reports, setReports} = context;
//     const generateReport = async ({ resumeFile, selfDescription, jobDescription }) => {
//         setLoading(true);
//         try {
//             const resonse = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
//             setReport(resonse.interviewReport);
//         } catch (error) {
//             console.log(error)
//         }finally{
//             setLoading(false)
//         }
//     }

//     const getReportById = async (interviewId) => {
//         setLoading(true);
//         try {
//             const response = await getAllInterviewReportById(interviewId);
//             setReport(response.interviewReport);
//         } catch (error) {
//             console.log(error)
//         }finally{
//             setLoading(false)
//         }
//     }

//     const getRreport = async () => {
//         setLoading(true);
//         try {
//             const response = await getAllInterviewReports();
//             setReport(response.interviewReport);

//         } catch (error) {
//             console.log(error)
//         }finally{
//             setLoading(false)
//         }
//     }
//     return (loading, report , reports, generateReport, getReportById, getRreport)
// }


// import {
//     getAllInterviewReportById,
//     getAllInterviewReports,
//     generateInterviewReport
// } from "../services/interview.api";

// import { useContext, useEffect} from "react";
// import { InterviewContext } from "../interview.context";
// import { useParams } from "react-router-dom";

// export const useInterview = () => {

//     // const context = useContext(InterviewContext);
//     const {interviewId} = useParams();
//     const context = useContext(InterviewContext);

//     if (!context) {
//         throw new Error(
//             "useInterview must be used within an InterviewProvider"
//         );
//     }

//     const {
//         loading,
//         setLoading,
//         report,
//         setReport,
//         reports,
//         setReports
//     } = context;

//     // Generate interview report
//     const generateReport = async ({
//         resumeFile,
//         selfDescription,
//         jobDescription
//     }) => {
//         setLoading(true);

//         try {
//             const response = await generateInterviewReport({
//                 jobDescription,
//                 selfDescription,
//                 resumeFile
//             });

//             setReport(response.interviewReport);

//             return response.interviewReport;

//         } catch (error) {
//             console.error("Generate Report Error:", error);
//             throw error;

//         } finally {
//             setLoading(false);
//         }
//     };

//     // Get interview report by ID
//     const getReportById = async (interviewId) => {
//         setLoading(true);

//         try {
//             const response = await getAllInterviewReportById(interviewId);

//             setReport(response.interviewReport);

//             return response.interviewReport;

//         } catch (error) {
//             console.error("Get Report By ID Error:", error);
//             throw error;

//         } finally {
//             setLoading(false);
//         }
//     };

//     // Get all interview reports
//     const getRreport = async () => {
//         setLoading(true);

//         try {
//             const response = await getAllInterviewReports();

//             setReports(response.interviewReports);

//             return response.interviewReports;

//         } catch (error) {
//             console.error("Get All Reports Error:", error);
//             throw error;

//         } finally {
//             setLoading(false);
//         }

        

//     };

//     useEffect(()=>{
//             if (interviewId){
//                 getReportById(interviewId)
//             }else{
//                 getRreport()
//             }
//         },[interviewId])

//     // IMPORTANT: Return an object, not a comma-separated expression
//     return {
//         loading,
//         report,
//         reports,
//         generateReport,
//         getReportById,
//         getRreport
//     };
// };



import {
    getAllInterviewReportById,
    getAllInterviewReports,
    generateInterviewReport,
    generateResumePdf
} from "../services/interview.api";

import { useContext, useEffect, useCallback } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router-dom";

export const useInterview = () => {
    const { interviewId } = useParams();
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error(
            "useInterview must be used within an InterviewProvider"
        );
    }

    const {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports
    } = context;

    // Generate interview report
    const generateReport = useCallback(async ({
        resumeFile,
        selfDescription,
        jobDescription
    }) => {
        setLoading(true);

        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            });

            setReport(response.interviewReport);
            return response.interviewReport;

        } catch (error) {
            console.error(
                "Generate Report Error:",
                error.response?.data || error.message
            );
            throw error;

        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    // Get interview report by ID
    const getReportById = useCallback(async (id) => {
        if (!id) {
            console.error("Interview ID is missing");
            return null;
        }

        setLoading(true);

        try {
            const response = await getAllInterviewReportById(id);

            if (!response?.interviewReport) {
                throw new Error(
                    "Interview report not found in API response"
                );
            }

            setReport(response.interviewReport);
            return response.interviewReport;

        } catch (error) {
            console.error(
                "Get Report By ID Error:",
                error.response?.data || error.message
            );
            throw error;

        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    // Get all interview reports
    const getRreport = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getAllInterviewReports();

            setReports(response.interviewReports || []);
            return response.interviewReports || [];

        } catch (error) {
            console.error(
                "Get All Reports Error:",
                error.response?.data || error.message
            );
            throw error;

        } finally {
            setLoading(false);
        }
    }, [setLoading, setReports]);

    // Load report based on URL parameter
    useEffect(() => {
        const loadReports = async () => {
            try {
                if (interviewId) {
                    await getReportById(interviewId);
                } else {
                    await getRreport();
                }
            } catch (error) {
                // Error already logged above.
                // This prevents an unhandled promise rejection.
            }
        };

        loadReports();
    }, [interviewId, getReportById, getRreport]);



const getresumePdf = async (InterviewReportId) => {
    setLoading(true);

    try {
        const response = await generateResumePdf({ InterviewReportId });

        const pdfBlob = new Blob([response], {
            type: "application/pdf"
        });

        const url = window.URL.createObjectURL(pdfBlob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `resume_${InterviewReportId}.pdf`;

        document.body.appendChild(link);
        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Resume PDF Download Error:", error);

        if (error.response?.data instanceof Blob) {
            const errorText = await error.response.data.text();
            console.error("Backend Error:", errorText);
        }
    } finally {
        setLoading(false);
    }
};

    // const getresumePdf = async (InterviewReportId) => {
    //     setLoading(true);
    //     let response = null
    //     try{
    //         response = await generateResumePdf({InterviewReportId});
    //         const url = window.URL.createObjectURL(new Blob([response], {type:"application/pdf"}))
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.setAttribute("download", `resume_${InterviewReportId}.pdf`);
    //         document.body.appendChild(link);
    //         link.click();
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    //     finally{
    //         setLoading(false)
    //     }
    // }

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getRreport,
        getresumePdf
    };
};
