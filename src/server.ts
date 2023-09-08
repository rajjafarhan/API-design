import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import {protect} from './modules/auth'
import { createNewUser, signin } from './handlers/user'
const app=express()


app.use(cors()) //cors is configusration that u can put on your server which will tell to the 
//browser that who can access the server and by default cors() means everyone can acess it (its a middleware)
app.use(morgan('dev')) //for logging purpose ,also remember that order matters so always put middleware before router
app.use(express.json()) //this allow client to send us json
app.use(express.urlencoded({extended:'true'})) //allows a client to add things like a query string,
// parameters and it decodes and encode that properly 


app.get('/', (req,res)=>{
    console.log('hello from the server')
    res.status(200)
    res.json({message:'hello'})
})

app.use('/api',protect,router)
//now if u want to run get product 
//route it will have url like /api/product
app.post('/user',createNewUser)
app.post('/signin',signin)

app.use((err,req,res,next)=>{
    if(err.type === 'auth'){
        res.status(401).json({message:'unauthorized'})
    }
    else if(err.type ==='input'){
        res.status(400).json({message:'invalid input'})
    }
    else{
        res.status(500).json({message:'Oops,Its on us'})
    }
})
export default app


