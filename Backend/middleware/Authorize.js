
export const verifyAdmin = (...roles)=>{

    return (req,res,next)=>{

         if(!roles.includes(req.user.role)){
            return res.status(401).json({
                message : "you don't have any permission.."
            })
         }

         next()
    }

}