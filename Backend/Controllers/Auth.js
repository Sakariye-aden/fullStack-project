import User from '../model/user.js'
import { generateToken } from '../utility/generateToken.js'


export const register = async (req, res, next) => {
    
    let {name, email, password } = req.body;
    try {
         email = email.toLowerCase();

         const Exist = await User.findOne({email});
         if(Exist) return res.status(400).json({
            message: 'email is already in Use..'
         })

       const user = await User.create({name, email, password})  

       const Token = generateToken(user._id)
         
       res.status(201).json({Token})

    } catch (error) {
         next(error)
    }
}


export const LoggIn = async (req, res, next) => {
   
    let { email, password } = req.body;
   try {
        email = email.toLowerCase();

        const user = await User.findOne({email})
      
         if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({
               message:"inValid Email or password."
            })
         }

       const Token = generateToken(user._id)
         
       res.status(201).json({Token})
   } catch (error) {
      next(error)
   }
}