import {Router} from 'express'
import { body, oneOf } from "express-validator";
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { create } from 'domain';


const router=Router()   

//***************************************these are all product specific routes also these all requires auth
router.get('/product',getProducts)
router.get('/product/:id',getOneProduct)


router.put('/product/:id',body('name').isString(),handleInputErrors,updateProduct)


router.post('/product',body('name').isString(),handleInputErrors,createProduct) //create new product


router.delete('/product/:id',deleteProduct)

//**************************************************updates
router.get('/update',getUpdates)
router.get('/update/:id',getOneUpdate)
router.put('/update/:id',
body('title').optional(),
body('body').optional(),
body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(),
body('version').optional(),updateUpdate )
router.post('/update',
body('title').exists().isString(),
body('body').exists().isString(),
body('productId').exists().isString(),createUpdate)
router.delete('/update/:id',deleteUpdate)

//updatepoints
router.get('/updatepoint',()=>{})
router.get('/updatepoint/:id',()=>{})
router.put('/updatepoint/:id',
body('name').optional().isString(),
body('description').optional().isString(),

()=>{})
router.post('/updatepoint',
body('name').exists().isString(),
body('description').exists().isString(),
body('updateId').exists().isString(),
()=>{})
router.delete('/updatepoint/:id',()=>{}) 

router.use((err,req,res,next)=>{
    console.log(err)
    res.json({messsage:"something went wrong in router handler"})

})

export default router


 