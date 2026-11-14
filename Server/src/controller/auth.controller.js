// const userModel = require("../models/user.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const tokenBlockListModel = require("../models/blacklist.model");

// /**
//  * @name registerUserController
//  * @description register a new user
//  * @route POST /api/auth/register
//  * @access Public
//  */

// // async function registerUserController(req, res) {

// //     console.log("REQ BODY:", req.body);

// //     const { username, email, password } = req.body;

// //     if (!username || !email || !password) {
// //         return res.status(400).json({
// //             message: "Please Provide Email ID And Password"
// //         })
// //     }

// //     const isUserAlreadyExists = await userModel.findOne({
// //         $or: [{ email }, { username }]
// //     });

// //     if (isUserAlreadyExists) {
// //         // to check user is already exits or not
// //         return res.status(400).json({
// //             message: "User Already Exists"
// //         })
// //     }

// //     const hash = await bcrypt.hash(password, 10);

// //     const user = await userModel.create({
// //         username,
// //         email,
// //         password: hash
// //     })

// //     const token = jwt.sign(
// //         { id: user._id, username: user.username, email: user.email },
// //         process.env.JWT_SECRET,
// //         { expiresIn: "1d" }
// //     )

// //     res.cookies("token", token)

// //     res.status(201).json({
// //         message: "User registered successfully",
// //         user:{
// //             id: user._id,
// //             username: user.username,
// //             email : user.email
// //         }
// //     })

// // }

// async function registerUserController(req, res) {
//     try {
//         console.log("REQ BODY:", req.body);

//         const { username, email, password } = req.body;

//         if (!username || !email || !password) {
//             return res.status(400).json({
//                 message: "Please provide username, email and password"
//             });
//         }

//         const isUserAlreadyExists = await userModel.findOne({
//             $or: [{ email }, { username }]
//         });

//         if (isUserAlreadyExists) {
//             return res.status(400).json({
//                 message: "User Already Exists"
//             });
//         }

//         const hash = await bcrypt.hash(password, 10);

//         const user = await userModel.create({
//             username,
//             email,
//             password: hash
//         });

//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "1d"
//             }
//         );

//         res.cookie("token", token);

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });

//     } catch (error) {
//         console.error("Register Error:", error);

//         return res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// }

// async function LoginUserController(req, res) {

//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//         return res.status(400).json({
//             message: "Invalid Email ID or Password"
//         })
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//         res.status(400).json({
//             message: "Invalid Email ID or Password"
//         })
//     }

//     const token = jwt.sign(
//         { id: user._id, email: user.email, username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//     )

//     res.cookie("token", token);

//     res.status(200).json({
//         message: "User Logged In Successfully",
//         user: {
//             id: user._id,
//             username: user.username,
//             email: user.email
//         }
//     })


// }

// async function LogoutUserController(req, res) {

//     const token = req.cookies.token;
//     if (token) {
//         await tokenBlockListModel.create({ token });
//     }

//     res.clearCookie("token");
//     return res.status(200).json({
//         message: "User Logged Out Successfully"
//     });
// }

// async function getMeController(req, res) {
//     const user = await userModel.findById(req.user.id);
//    res.status(200).json({
//     message: "User Fetched Successfully",
//     user:{
//         id: user._id,
//         username: user.username,
//         email: user.email
//     }
//    })
// }

// module.exports = { registerUserController, LoginUserController, LogoutUserController , getMeController };


const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlockListModel = require("../models/blacklist.model");

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

// Set authentication cookie
const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Local HTTP development
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
    });
};

// REGISTER
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = generateToken(user);

        setTokenCookie(res, token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            message: "Registration failed"
        });
    }
}

// LOGIN
async function LoginUserController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        setTokenCookie(res, token);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
}

// LOGOUT
async function LogoutUserController(req, res) {
    try {
        const token = req.cookies?.token;

        if (token) {
            await tokenBlockListModel.create({ token });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        console.error("Logout Error:", error);

        return res.status(500).json({
            message: "Logout failed"
        });
    }
}

// GET CURRENT USER
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Get Me Error:", error);

        return res.status(500).json({
            message: "Unable to fetch user"
        });
    }
}

module.exports = {
    registerUserController,
    LoginUserController,
    LogoutUserController,
    getMeController
};
