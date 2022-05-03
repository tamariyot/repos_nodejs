const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
// const db=require('../DB/db');
const MongooseDb = require('../DB/mongoose');
const ordersModel = require('../Models/orders');

module.exports.get = async function (req, res,next) {
    try {
        const toget = await ordersModel.find().populate('userId');
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}

module.exports.getById = async function (req, res,next) {
    try {
        const id = req.params.id;
        const togetbyid = await ordersModel.findById(ObjectId(id)).populate('products');
        
        await res.send(togetbyid);
    }
    catch (error) {
        next(error)
    }
}

module.exports.post = async function (req, res,next) {
    try {
        const addOrders = new ordersModel(req.body);
        const newOrders = await addOrders.save();
        res.send(newOrders);
    }
    catch (error) {
        next(error)
    }
}

module.exports.deleteO = async function (req, res,next) {
    try {
        const myOrders = req.params.id;
        const toDelete = await ordersModel.findByIdAndRemove(ObjectId(myOrders));
        await res.send(toDelete);
    }
    catch (error) {
        next(error)
    }
}

module.exports.put = async function (req, res,next) {
    const id= req.params.id;
    try {
        const {userId,date,amount,products}=req.body;
        
        const data={
            userId: userId,
            date: date,
            amount: amount ,
            products: products 
        }

        let toUpdate = await ordersModel.findOneAndUpdate(id,data,{
                new:true
            });
        res.send(toUpdate);
    }
    catch (error) {
        next(error)
    }
}