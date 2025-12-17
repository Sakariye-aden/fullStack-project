import jwt from 'jsonwebtoken'

export const generateToken = (userId)=>{
    return jwt.sign({id: userId},process.env.JSON_WEBTOKEN,{
        expiresIn: '5d'
    })
}