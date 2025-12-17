import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import notFound from './middleware/notFound.js';
import { ErrorHandler } from './middleware/ErrorHandler.js';
const app = express()

 dotenv.config()
const PORT = process.env.PORT

// routes 
import userRoutes from '../Backend/Routes/user.js'
import morgan from 'morgan';

app.use(express.json())


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// user Routes 
app.use('/auth', userRoutes)




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