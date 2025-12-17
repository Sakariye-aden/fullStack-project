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
import TransactionAdmin from './Routes/Transaction.js'

app.use(express.json())


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// user Routes 
app.use('/auth', userRoutes)
// Admin Route 

// Transaction Route 




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