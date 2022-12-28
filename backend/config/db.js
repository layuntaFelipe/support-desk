const mongoose = require("mongoose");

const connectDB = async () => {
 try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@pilotcluster.aexcw.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
 } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1)
 }
}

module.exports = {
    connectDB
}