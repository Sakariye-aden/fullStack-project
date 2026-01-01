import transaction from '../model/Transaction.js'
import User from '../model/user.js'




// total Users Transactions , Incomes , expenses
export const AdminInfo = async (req, res, next) => {
    
    try {
      const totalUsers = await User.countDocuments();
      const totalTransactions = await transaction.countDocuments();

      const totals = await transaction.aggregate([
        {
          $group: {
            _id: "$type",
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      const totalIncome =
        totals.find((t) => t._id === "income")?.totalAmount || 0;

      const totalExpense =
        totals.find((t) => t._id === "expense")?.totalAmount || 0;

      res.json({
        totalUsers,
        totalTransactions,
        totalIncome,
        totalExpense,
      });
    } catch (error) {
        next(error)
    }
}

// users information 
export const UserInfoAdmin = async (req, res, next ) => {
   
   try {
       const AllUsers = await User.find().select('-password');

        res.json(AllUsers);

   } catch (error) {
     next(error)
   }
}

// Update Role 
export const UpdateRole = async (req, res, next) => {
   
   const  { id }= req.params;

   try {
        const updateuser = await User.findByIdAndUpdate(
          {_id:id },
          { $set: { "role" : req.body.role } }
        )

         res.status(201).json('user Updated role successfully')
   } catch (error) {
     next(error)
   }

}