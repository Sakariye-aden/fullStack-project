import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import notFound from './middleware/notFound.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';
const app = express()

 dotenv.config()
const PORT = process.env.PORT
import morgan from 'morgan';
import cors from 'cors'

// routes 
import userRoutes from './Routes/user.js'
import AdminRoute from './Routes/Admin.js'
import TransactionRoute from './Routes/Transaction.js'
import helmet from 'helmet';
import { Limiter } from './middleware/LimitReq.js';

app.use(helmet())
app.use(Limiter)
app.use(express.json())

app.use(cors(
       {
        origin:['http://localhost:5173']
       }
    ))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// user Routes 
app.use('/api/auth', userRoutes)
// Admin Route 
app.use('/api/Admin', AdminRoute)
// Transaction Route 
app.use('/api/transactions', TransactionRoute)

app.use('/api/health', (req,res)=>{
    res.send('heay welcome to healthy route ')
})

// errors route 
app.use(notFound)
app.use(ErrorHandler)





//  connect mongodb localy 
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('✅ connected mongodb'))
    .catch((err)=>console.log(`❌ disconnected ${err}`)) 


app.listen(PORT , ()=>{
    console.log(`server is running PORT http://localhost:${PORT}`)
})