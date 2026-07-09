import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { generateInterViewReportController, getAllInterviewReportsController, getInterviewReportByIdController, generateResumePdfController } from "../controllers/interview.controller.js"
import { upload } from "../middleware/file.middleware.js"

const interviewRouter = express.Router()


interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterViewReportController)


interviewRouter.get("/", authMiddleware, getAllInterviewReportsController)

interviewRouter.get("/report/:interviewId", authMiddleware, getInterviewReportByIdController)


interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware, generateResumePdfController)


export default interviewRouter