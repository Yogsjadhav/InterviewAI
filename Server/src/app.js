const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
/**
 * require the auth router and use it for the /api/auth route
 */
const AuthRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://interviewai-3-ghvr.onrender.com/",
    credentials:true
}));

app.use("/api/auth", AuthRouter);
app.use("/api/interview", interviewRouter)


module.exports = app;
