import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    try{
    //   const connectionIntance=  await mongoose.connect(`${process.env.MONGODB-URL}/${DB_NAME}`)
                                                    // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8wqho3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        const contedIntance =await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8wqho3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
      console.log("DataBase Is Connected")
    }catch(error){
        console.log("Mongo DB connection erro", error)
        process.exit(1)
    }
}

export default connectDB