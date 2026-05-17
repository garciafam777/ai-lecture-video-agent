// backend/src/db.js
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose;
