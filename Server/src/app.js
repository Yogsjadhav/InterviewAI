// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors")
// /**
//  * require the auth router and use it for the /api/auth route
//  */
// const AuthRouter = require("./routes/auth.routes");
// const interviewRouter = require("./routes/interview.routes")

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));

// app.use("/api/auth", AuthRouter);
// app.use("/api/interview", interviewRouter)


// module.exports = app;


const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://interviewai-3-ghvr.onrender.com"
];

app.use(cors({
<<<<<<< HEAD
    origin:"https://interviewai-3-ghvr.onrender.com/",
    credentials:true
=======
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS: " + origin));
        }
    },
    credentials: true
>>>>>>> a5e7ee9 (Fix production CORS configuration)
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/interview", interviewRouter);

<<<<<<< HEAD

=======
>>>>>>> a5e7ee9 (Fix production CORS configuration)
module.exports = app;
