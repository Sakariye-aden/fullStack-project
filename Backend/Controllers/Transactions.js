import { success } from "zod";
import transaction from "../model/Transaction.js";

export const createTransaction = async (req, res, next) => {

    try {
        
     const newOne = await transaction.create({...req.body, createdBy:req.user._id})
       res.status(201).json({
         success : true ,
         message : "Transaction Created successFully"
       })

    } catch (error) {
        next(error)
    }
}

// get All transcation
export const getAlltrans = async (req,res, next) => {
     
    try {
        const Alltrans = await transaction.aggregate([
            { $match : { createdBy: req.user._id } },
            { 
             $sort: { createdBy: -1 } 
            },
             { $limit: 10 }
             
        ])
        // const Alltransg = await transaction.find({createdBy: req.user._id})
        
        res.json(Alltrans)
    } catch (error) {
        next(error)
    }
}

// get summary Transaction 
export const summartTrans = async (req, res, next) => {
    
    try {
        
      const summary = await transaction.aggregate([
         {$match : {createdBy : req.user._id }},
         { $group: {
             _id:"$type",
             avg:{$sum: "$amount" }
           }
         },
         {$project: {
              "_id":0,
              "type":"$_id",
              "total":"$avg"
           }
         }
      ])

      res.json({summary})

    } catch (error) {
        next(error)
    }
}

// put transaction
export const updateTransaction = async (req, res, next) => {
    
    const { id } = req.params

    try {
        
        const update = await transaction.findOneAndUpdate(
            { _id: id, createdBy: req.user._id},
            req.body,
            {new : true}
        )

        if(!update) return res.status(400).json({
            message:"no transaction to update.."
        })

        res.status(201).json({
            success : true ,
            message : "Transaction Updated successfully"
        })
    } catch (error) {
       next(error) 
    }
}

// delete transaction
export const deleteTransaction = async (req, res, next) => {
    
      const { id } = req.params

    try {
        
        const Delete = await transaction.findByIdAndDelete(id)

        if(!Delete) return res.status(400).json({
            message:"no transaction to delete.."
        })

        res.json(`  Transaction deleted successfully...`)

    } catch (error) {
       next(error) 
    }
}