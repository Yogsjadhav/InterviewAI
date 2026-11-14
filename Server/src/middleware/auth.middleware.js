// const jwt = require("jsonwebtoken");
// const tokenBlockListModel = require("../models/blacklist.model");

// async function authUser(req, res, next)  {


//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Token Is Not Provided"
//         })
//     }

//     const isTokenBlocked = await tokenBlockListModel.findOne({ token });

//     if (isTokenBlocked) {
//         return res.status(401).json({
//             message:"Token Is Invalid"
//         })
//     }


//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch(error){
//         return res.status(401).json({
//             message:"Invalid Token"
//         })
//     }

// }

// module.exports = {authUser};


const jwt = require("jsonwebtoken");
const tokenBlockListModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    try {
        // Get token from cookie
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token is not provided"
            });
        }

        // Check whether token is blacklisted
        const isTokenBlocked = await tokenBlockListModel.findOne({
            token
        });

        if (isTokenBlocked) {
            return res.status(401).json({
                message: "Token is invalid"
            });
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired"
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }

        return res.status(500).json({
            message: "Authentication server error"
        });
    }
}

module.exports = { authUser };
