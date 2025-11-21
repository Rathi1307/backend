import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
const app = express()

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
 
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieparser())

app.use(express.static("public"))

// routes
import userRouter from './routes/user.routes.js'

// router decleration
app.use("/api/v1/users",userRouter)
export default app 
