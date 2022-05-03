const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
// const db=require('../DB/db');
const MongooseDb = require('../DB/mongoose');
const categoryModel = require('../Models/category');

module.exports.get = async function (req, res,next) {
    try {
        const toget = await categoryModel.find();
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}

module.exports.getById = async function (req, res,next) {
    try {
        const id = req.params.id;
        const togetbyid = await categoryModel.findById(ObjectId(id));
        await res.send(togetbyid);
    }
    catch (error) {
        next(error)
    }
}

module.exports.post = async function (req, res,next) {
    try {
        const addCategory = new categoryModel(req.body);
        const newCategory = await addCategory.save();
        res.send(newCategory);
    }
    catch (error) {
        next(error)
    }
}

module.exports.deleteC = async function (req, res,next) {
    try {
        const myCategory = req.body.id;
        const toDelete = await categoryModel.deleteOne({ "id": myCategory });
        await res.send(toDelete);
    }
    catch (error) {
        next(error)
    }
}

module.exports.put = async function (req, res,next) {
    const id= req.params.id;
    try {
        const name=req.body.name;
        
        const data={ name: name}

        let toUpdate = await categoryModel.findOneAndUpdate(id,data,{
                new:true
            });
        res.send(toUpdate);
    }
    
    catch(error) {
        next(error)
    }
}