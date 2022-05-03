const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
// const db=require('../DB/db');
const MongooseDb = require('../DB/mongoose');
const productModel = require('../Models/product');

module.exports.get = async function (req, res,next) {
    try {
        const toget = await productModel.find();//.populate('categoryId');
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}

module.exports.getById = async function (req, res,next) {
    try {
        const id = req.params.id;
        const togetbyid = await productModel.where({'categoryId':ObjectId(id)});
        await res.send(togetbyid);
    }
    catch (error) {
        next(error)
    }
}

module.exports.post = async function (req, res,next) {
    try {
        // const { categoryId, name, price, description, imgUrl } = req.body;
        // const addProduct = new productModel({ categoryId: categoryId, name: name, price: price, description: description, imgUrl: imgUrl });
        const addProduct = new productModel(req.body);
        const newProduct = await addProduct.save();
        res.send(newProduct);
    }
    catch(error) {
        next(error)
    }
}

module.exports.deleteP = async function (req, res,next) {
    try {
        const myProduct = req.params.id;
        const toDelete = await productModel.findByIdAndRemove(ObjectId(myProduct));
        await res.send(toDelete);
    }
    catch (error) {
        next(error)
    }
}

module.exports.put = async function (req, res,next) {
    const id= req.params.id;
    try {
        const {categoryId,name,price,description,imgUrl}=req.body;
        
        const data={
            categoryId: categoryId,
            name: name ,
            price: price , 
            description: description,
            imgUrl: imgUrl 
        }

        let toUpdate = await productModel.findByIdAndUpdate(id,data,{
                new:true
            });
        res.send(toUpdate);
    }
    catch (error) {
        next(error)
    }
}