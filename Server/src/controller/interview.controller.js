// const pdfParse = require("pdf-parse");
// const generateInterviewReport = require("../services/ai.service")
// const interviewReportModel = require("../models/interviewReport.model")

// async function generateInterviewReportController (res,req){
//     const resumeFile = req.file

//     const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
//     const { selfDescription, jobDescription } = req.body
//     const InterviewReportByAI = await generateInterviewReport({
//         resume: resumeContent.text, 
//         selfDescription, 
//         jobDescription
//     })

//     const interviewReport = await interviewReportModel.create({
//         user: req.user.id,
//         resume:resumeContent.text,
//         selfDescription,
//         jobDescription,
//         ...InterviewReportByAI
//     })

//     res.status(201).json({
//         message:"interview Report Generated SuccessFully",
//         interviewReport
//       })
// }

// module.exports ={
//     generateInterviewReportController
// }


// const pdfParse = require("pdf-parse");
// const generateInterviewReport = require("../services/ai.service");
// const interviewReportModel = require("../models/interviewReport.model");

// async function generateInterviewReportController(req, res) {
//     try {
//         const resumeFile = req.file;

//         // Check whether resume file is uploaded
//         if (!resumeFile) {
//             return res.status(400).json({
//                 message: "Resume file is required"
//             });
//         }

//         // Extract text from uploaded PDF
//         const parser = new pdfParse.PDFParse({
//             data: Uint8Array.from(resumeFile.buffer)
//         });

//         const resumeContent = await parser.getText();

//         const { selfDescription, jobDescription } = req.body;

//         // Generate interview report using AI
//         const InterviewReportByAI = await generateInterviewReport({
//             resume: resumeContent.text,
//             selfDescription,
//             jobDescription
//         });

//         // Save interview report in MongoDB
//         const interviewReport = await interviewReportModel.create({
//             user: req.user.id,
//             resume: resumeContent.text,
//             selfDescription,
//             jobDescription,
//             ...InterviewReportByAI
//         });

//         return res.status(201).json({
//             message: "Interview Report Generated Successfully",
//             interviewReport
//         });

//     } catch (error) {
//         console.error("Interview Report Error:", error);

//         return res.status(500).json({
//             message: "Failed to generate interview report",
//             error: error.message
//         });
//     }
// }

// module.exports = {
//     generateInterviewReportController
// };



const pdfParse = require("pdf-parse");
// const mongoose = require("mongoose");
// import mongoose from "mongoose";
const {generateInterviewReport , generateResumePdf} = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");





async function generateInterviewReportController(req, res) {
    let parser;

    try {
        const resumeFile = req.file;

        // Check whether resume file is uploaded
        if (!resumeFile) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        // Extract text from uploaded PDF
        // parser = new pdfParse.PDFParse({
        //     data: new Uint8Array(resumeFile.buffer)
        // });
        parser = new pdfParse.PDFParse({
            data: resumeFile.buffer
        });
        const resumeContent = await parser.getText();

        const { selfDescription, jobDescription } = req.body;

        // Validate extracted resume content
        if (!resumeContent.text || !resumeContent.text.trim()) {
            return res.status(400).json({
                message: "Could not extract text from the uploaded PDF"
            });
        }

        // Generate interview report using AI
        const InterviewReportByAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        // Save interview report in MongoDB
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...InterviewReportByAI
        });

        return res.status(201).json({
            message: "Interview Report Generated Successfully",
            interviewReport
        });

    } catch (error) {
        console.error("Interview Report Error:", error);

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });

    } finally {
        if (parser) {
            await parser.destroy();
        }
    }
}


const mongoose = require("mongoose");
const { getAllInterviewReportById } = require("../../../Client/src/features/interview/services/interview.api");

// async function getInterviewReportController(req, res) {
//     try {
//         const { interviewId } = req.params;

//         // Validate MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(interviewId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid Interview ID"
//             });
//         }

//         // Find report belonging to logged-in user
//         const interviewReport = await interviewReportModel.findOne({
//             _id: interviewId,
//             user: req.user.id
//         });

//         // Check if report exists
//         if (!interviewReport) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Interview Report Not Found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Interview Report Fetched Successfully",
//             interviewReport
//         });

//     } catch (error) {
//         console.error("Get Interview Report Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch interview report",
//             error: error.message
//         });
//     }
// }


/** 
 * @description controller to get interview report by ID
 * 
*/

// async function getInterviewReportController(req, res) {
//    const { interviewId } = req.params;
   

//    const interviewReport = await interviewReportModel.findByOne({ _id: interviewId, user: req.user.id });

//    if (!interviewReport){
//     return res.status(404).json({
//         message:"interview report not found"
//     })

//    }

//    res.status(200).json({
//     message:"interview report generated successfully",
//     interviewReport
//    })
// }


// const mongoose = require("mongoose");

async function getInterviewReportController(req, res) {
    try {
        const { interviewId } = req.params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Interview ID"
            });
        }

        // Find report belonging to logged-in user
        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        // Check if report exists
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview Report Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Interview Report Fetched Successfully",
            interviewReport
        });

    } catch (error) {
        console.error("Get Interview Report Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview report",
            error: error.message
        });
    }
}


/**
 * @description controller to get all interview reports of logged in user
 * @access private
 * @route GET /api/interview/
 */

// async function getAllInterviewReportsController(req,res){

//     const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"); 

//     res.status(200).json({
//         message:"interview reports fetched successfully",
//         interviewReports
//     })

// }


async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select(
                "-resume -selfDescription -jobDescription -__v"
            );

        return res.status(200).json({
            success: true,
            message: "Interview Reports Fetched Successfully",
            interviewReports
        });

    } catch (error) {
        console.error("Get All Interview Reports Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview reports",
            error: error.message
        });
    }
}

/**
 * controller to generate a resume PDF based on user self description and job description
 */



async function generateResumePdfController(req, res) {
    try {
        const { InterviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(
            InterviewReportId
        );

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview Report Not Found"
            });
        }

        const {
            resume,
            jobDescription,
            selfDescription
        } = interviewReport;

        // Generate PDF
        const pdfBuffer = await generateResumePdf({
            resume,
            jobDescription,
            selfDescription
        });

        // Validate PDF buffer
        if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
            throw new Error("Invalid PDF buffer generated");
        }

        // Send PDF response
        res.setHeader("Content-Type", "application/pdf");

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="Yogesh-Jadhav-Resume.pdf"'
        );

        res.setHeader("Content-Length", pdfBuffer.length);

        return res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error("Generate Resume PDF Controller Error:", error);

        return res.status(500).json({
            message: "Failed to generate resume PDF",
            error: error.message
        });
    }
}

// async function generateResumePdfController(req, res) {
//     const {InterviewReportId} = req.params

//     const interviewReport = await interviewReportModel.findById(InterviewReportId)

//     if(!interviewReport){
//         return res.status(400).json({
//             message:"Interview Reporn Not Found"
//         })
//     }

//     const {resume , jobDescription , selfDescription} = interviewReport

//     const pdfBuffer = await generateResumePdf({resume, jobDescription, selfDescription})

//     res.send(pdfBuffer)

// }


module.exports = {
    // generateInterviewReportController ,
    generateInterviewReportController,
    getInterviewReportController,
    getAllInterviewReportsController,
    generateResumePdfController
};
