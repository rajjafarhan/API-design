import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export const comparePassword=(password,hash)=>{
   return bcrypt.compare(password,hash) 
} //this function will compare the password , the one user is sending to us and the hash one which is stored in the databasae ,return true or false

export const hashPassword=(password)=>{
    return bcrypt.hash(password,5)
} //this function will hash the password and return it 


export const createJWT=(user)=>{
    const token=jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
    return token 
}
//jwt.sign() takes two arguments first is payload and second is secret key 
//payload is the data that u want to encode in the token like here id and username

export const protect=(req,res,next)=>{
    const bearer=req.headers.authorization
    if(!bearer){
        res.status(401)
        res.json({message:'Please login to get access'})
        return
    }
    const [,token]=bearer.split(' ')
    
    if (!token){
        res.status(401)
        res.json({message:'not valid token'})
        return
    }

    try{
        const user=jwt.verify(token,process.env.JWT_SECRET)
        req.user=user
        next()

    }
    catch(e){
        console.error(e)
        res.status(401)
        res.json({message:'not valid token'})
        return

    }

} //this is a middleware that will run before any route

