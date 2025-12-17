import User from '../model/users.js'
import transaction from '../model/transaction.js'


export const AdminInfo = async (req, res, next) => {
    
    try {
      // users
         const usersinfo = await transaction.aggregate([
            {$group : {
                _id:"$createdBy"
              } 
            },
            {
              $project :{
                "_id":0,
                "users":"$_id"
              }
            }

         ])

        //  categories
      const  categoryInfo = await transaction.aggregate([
         
           {$match: {type: 'expense'}},
          {$group: {
             _id : "$category",
             totalSpent :{$sum : "$amount"}
           }
         },
         { $project: {
             "_id":0,
             "category":"$_id",
             "totalSpend":"$totalSpent"
           }
         },
         {$sort: { totalSpend : 1}},
         {$limit: 7}
      ])

      res.json({
         totalUsers: usersinfo,
         totalSpent: categoryInfo
    })
    } catch (error) {
        next(error)
    }
}
