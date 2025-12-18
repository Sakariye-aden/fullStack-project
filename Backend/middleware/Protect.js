import jwt from 'jsonwebtoken';
import User from '../model/user.js'

export const protect = async (req,res, next) => {
    
   try {

       const Token = req.headers.authorization?.split(" ")[1];

    if(!Token){
        return res.status(400).json({
            message : 'no token provided ..'
        })
    }

    const decode = jwt.verify(Token, process.env.JSON_WEBTOKEN)
    

    const user = await User.findById(decode.id).select('-password')

      req.user=user
      next()
   } catch (error) {
      next(error)
   }
    
}