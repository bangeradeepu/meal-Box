const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user_feedback: {
        type: String
    }
})
//create collection
const feedback_con = new mongoose.model("feedback", feedbackSchema);

module.exports = feedback_con;