import mongoose from "mongoose";
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("There is a Error while fetching data from DB",error);
        process.exit(1)  //ye use hua hai taki jo current kaam chal raha hai waha se hum bahar aa jaye
    }
}

export default connectDB