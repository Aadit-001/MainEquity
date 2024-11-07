import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

//cors use karte hai taki pata rahe konse frontend ke url se backend reply dega
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//now these are the middle wares
app.use(cookieParser()) //server se user ki cookies access and set karne ke liye
app.use(express.json({limit:"20kb"})) //this will be used to tell the proram to accepta nd give json
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public")) //to make somthing for the public to see


//ham ye use kar rahe hai taki jo cors ka issue ho rha hai frontend mai wo nhi ho , hwne api req jo hai wo agar backend se kiya jaye toh cors ka part nhi aata hai 
//this is called as setting up a proxy server ,matlab direct frontend se call nhi backend ke troing
// app.get('/news', async (req, res) => {
//     try {
//       const response = await axios.get(
//         "https://finnhub.io/api/v1/news?category=general&token=crvqbdhr01qkji45o89gcrvqbdhr01qkji45o8a0"
//       );
//       res.json(response.data); // Send the news data back to the frontend
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching news" });
//     }
//   });

//routes import
import userRouter from './routes/user.routes.js'

//routes 
app.use("", userRouter)  //ye bass initail route hai , matlab ye ki jab iss route pe aa jayenge tab pura cotrol "userRouter ke file ke pass aa jayega kyu ki wo user ke related sara kaam hai waha, jaise login , register etc"


export default app
