import mongoose from "mongoose";


const transactionSchame = new mongoose.Schema(
    {
        title : { type:String, required:true},
        amount : Number,
        type: String,
        category: String,
        date:Date,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
   },{timestamps : true }
)

const transaction = mongoose.model('transaction', transactionSchame);

export default transaction