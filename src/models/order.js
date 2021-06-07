const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    user_mobile: {
        type: String
    },
    user_meal: {
        type: String
    },
    user_hub: {
        type: String
    },
})

//create collection
const orders_con = new mongoose.model("orders", ordersSchema);

module.exports = orders_con;