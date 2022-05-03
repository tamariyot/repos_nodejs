const express=require('express');
const router=express.Router();
const controller=require('../Controller/productController')


router.get('/',controller.get)

router.get('/:id',controller.getById)

router.post('/',controller.post)

router.delete('/:id',controller.deleteP)

router.put('/:id',controller.put)

module.exports=router;