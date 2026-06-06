import mongoose from "mongoose";

const dbconnect = async() =>{
    try{
        const dbconnection = await mongoose.connect(process.env.Mongo_URI);
        console.log("Mongodb connected successfully");
    }
    catch(error){
        console.error("Mongodb Connection Error",error);
        process.exit(1);
    }
}

export default dbconnect;