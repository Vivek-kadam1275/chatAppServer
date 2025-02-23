
import mongoose from "mongoose";
import env from "dotenv";
env.config();

const dbConnect = () => {
    mongoose.connect(process.env.mongodbUrl).then(
        () => {
            console.log("DB connected successfully...");
        }
    ).catch((error) => {
        console.log("Error occurred in db connection", error);
    })
}

export default dbConnect;