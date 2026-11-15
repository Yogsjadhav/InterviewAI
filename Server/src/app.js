// // const express = require("express");
// // const cookieParser = require("cookie-parser");
// // const cors = require("cors")
// // /**
// //  * require the auth router and use it for the /api/auth route
// //  */
// // const AuthRouter = require("./routes/auth.routes");
// // const interviewRouter = require("./routes/interview.routes")

// // const app = express();

// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(cors({
// //     origin:"http://localhost:5173",
// //     credentials:true
// // }));

// // app.use("/api/auth", AuthRouter);
// // app.use("/api/interview", interviewRouter)


// // module.exports = app;


// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const AuthRouter = require("./routes/auth.routes");
// const interviewRouter = require("./routes/interview.routes");

// const app = express();

// const allowedOrigins = [
//     "http://localhost:5173",
//     "https://interviewai-3-ghvr.onrender.com"
// ];

// app.use(cors({
// <<<<<<< HEAD
//     origin:"https://interviewai-3-ghvr.onrender.com/",
//     credentials:true
// =======
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS: " + origin));
//         }
//     },
//     credentials: true
// >>>>>>> a5e7ee9 (Fix production CORS configuration)
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", AuthRouter);
// app.use("/api/interview", interviewRouter);

// <<<<<<< HEAD

// =======
// >>>>>>> a5e7ee9 (Fix production CORS configuration)
// module.exports = app;



// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const AuthRouter = require("./routes/auth.routes");
// const interviewRouter = require("./routes/interview.routes");

// const app = express();

// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "InterviewAI Backend Server is Running 🚀"
//     });
// });

// const allowedOrigins = [
//     "http://localhost:5173",
//     "https://interviewai-0-1.onrender.com"
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS: " + origin));
//         }
//     },
//     credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", AuthRouter);
// app.use("/api/interview", interviewRouter);

// module.exports = app;


const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = new Set([
    "http://localhost:5173",
    "https://interviewai-14.onrender.com",
    ...(process.env.CLIENT_URL || "")
        .split(",")
        .map((origin) => origin.trim().replace(/\/+$/, ""))
        .filter(Boolean),
]);

app.use(cors({
    origin: (origin, callback) => {
        callback(null, !origin || allowedOrigins.has(origin));
    },
    credentials: true
}));

// Backend health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "InterviewAI Backend Server is Running 🚀"
    });
});

// API routes
app.use("/api/auth", AuthRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;