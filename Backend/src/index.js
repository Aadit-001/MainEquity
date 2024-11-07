import connectDB from "./db/indexdb.js";
import dotenv from "dotenv"
import app from './app.js'

//this is done to specify the server to take dotenv things from this file address
dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Listining on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(`Error in connecting to database!`);
})