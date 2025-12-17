import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import notFound from './middleware/notFound.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';
const app = express()

 dotenv.config()
const PORT = process.env.PORT
import morgan from 'morgan';


// routes 
import userRoutes from './Routes/user.js'
import AdminRoute from './Routes/Admin.js'
import TransactionRoute from './Routes/Transaction.js'

app.use(express.json())


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// user Routes 
app.use('/auth', userRoutes)
// Admin Route 
app.use('/Admin', AdminRoute)
// Transaction Route 
app.use('/transactions', TransactionRoute)

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