import jwt from 'jsonwebtoken';
import User from '../model/users.js'

export const protect = async (req,res, next) => {
    
    const Token = req.headers.authorization?.split(" ")[1];

    if(!Token){
        return res.status(400).json({
            message : 'no token provided ..'
        })
    }

    const decode = jwt.verify(Token, process.env.JSON_WEB_SEC)
    

    const user = await User.findById(decode.id).select('-password')

   req.user=user
    next()
}