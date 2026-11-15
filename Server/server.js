// // import dns from "node:dns";
// const dns = require("node:dns");

// require("dotenv").config();


// dns.setServers([
//     "8.8.8.8",
//     "8.8.4.4"
// ]);
// const app = require("./src/app");
// const connectDB = require("./src/config/database");



// app.listen(3000, () => {
//   console.log("Server Is Running On PORT: 3000");
// });

// connectDB();



const dns = require("node:dns");

require("dotenv").config();

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
