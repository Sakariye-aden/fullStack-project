import transaction from '../model/Transaction.js'
import User from '../model/user.js'

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
