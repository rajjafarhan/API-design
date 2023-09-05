import {validationResult} from 'express-validator'

export const handleInputErrors=(req,res,next)=>{ 
    const errors=validationResult(req)//this will check if there is any error in the body 

    if(!errors.isEmpty()){
        res.status(400)
        res.json({errors:errors.array()})
    }//if there is any error it will return the error
    else{
        next()

    }
   }