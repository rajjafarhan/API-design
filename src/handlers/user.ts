import prisma from "../db";
import { createJWT, hashPassword,comparePassword } from "../modules/auth";

export const createNewUser= async(req,res)=>{
    const user =await prisma.user.create({
        data:{
            username:req.body.username, //this is the username that user will send to us
            password:await hashPassword(req.body.password) //this is the password that user will send to us
        }
    })
     const token =createJWT(user)
     res.json({token})
}

export const signin=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
            username:req.body.username
        }//it will find the user with the username in db that user will send to us
    })   
    const isValid=await comparePassword(req.body.password,user.password)
    if(!isValid){
        res.status(401)
        res.json({message:'Invalid password'})
        return
    }
    const token =createJWT(user)
     res.json({token})
}
