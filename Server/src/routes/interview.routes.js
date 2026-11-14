// const express = require("express")
// const authMiddleware = require("../middleware/auth.middleware")
// const interviewController = require("../controller/interview.controller")
// const upload = require ("../middleware/file.middleware")
// // const authMiddleware = require("../middleware/auth.middleware");
// const { authUser } = require("../middleware/auth.middleware");

// const interviewRouter = express.Router()

// // create api for interview details for ai 
// console.log("authMiddleware:", typeof authMiddleware);
// console.log("upload:", typeof upload);
// console.log("upload.single:", typeof upload.single);
// console.log(
//   "generateInterviewReportController:",
//   typeof interviewController.generateInterviewReportController
// );
// interviewRouter.post("/",authMiddleware, upload.single("resume") ,interviewController.generateInterviewReportController)


// module.exports = interviewRouter

const express = require("express");
const { authUser } = require("../middleware/auth.middleware");
const interviewController = require("../controller/interview.controller");
const upload = require("../middleware/file.middleware");

const interviewRouter = express.Router();

// Debugging
console.log("authUser:", typeof authUser);
console.log("upload:", typeof upload);
console.log("upload.single:", typeof upload.single);
console.log(
    "Controller:",
    typeof interviewController.generateInterviewReportController
);

// Create interview report API
interviewRouter.post(
    "/",
    authUser,
    upload.single("resume"),
    interviewController.generateInterviewReportController
);

interviewRouter.get(
    "/report/:interviewId",
     authUser, 
     interviewController.getInterviewReportController
);

/**
 * @route get /api/interview/
 * @description get all interview reports of logged in users
 * @access private
 */

interviewRouter.get("/", authUser, interviewController.getAllInterviewReportsController);

/**
 * @route get/api/interview/resume/pdf
 * @description generate a resume pdf 
 * @access private
 */

interviewRouter.post("/resume/pdf/:InterviewReportId", authUser,interviewController.generateResumePdfController)

module.exports = interviewRouter;