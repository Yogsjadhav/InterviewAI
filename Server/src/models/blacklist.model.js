const mongoose = require("mongoose");

const BlackListedSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token Is Required"],
        
    }
}, {
    timestamps: true
})

const TokenBlockListModel = mongoose.model("blacklistTokens" , BlackListedSchema)

module.exports = TokenBlockListModel