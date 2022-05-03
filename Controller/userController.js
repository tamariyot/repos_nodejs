const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
// const db=require('../DB/db');
const MongooseDb = require('../DB/mongoose');
const userModel = require('../Models/user');

module.exports.get = async function (req, res,next) {
    try {
        const toget = await userModel.find();
        await res.send(toget);
    }
    catch (error) {
        next(error)
    }
}

module.exports.getById = async function (req, res,next) {//get by password and email
    const password = req.params.password;
    const email=req.params.email;
    try {
       
        const togetbyid = await userModel.findOne({email,password});
        if(togetbyid)
            await res.send(togetbyid);
        else
            await res.status(204).send(togetbyid);

    }
    catch(error) {
        next(error)
       // res.send(`eror!!`)
    }
}

module.exports.getAllOrderByUserId= async function (req, res,next){
    try{
        // const password = req.params.password;
        // const email=req.params.email;
        const idUser=req.params.id;
        const id=await userModel.findOne({_id:ObjectId(idUser)}).populate({path:'allOrdersByUserId',select:'userId date amount products'});
        await res.send(id);
    }
    catch(error) {
        next(error)
    }
}

module.exports.post = async function (req, res,next) {
    try {
        const addUser = new userModel(req.body);
        const newUser = await addUser.save();
        await res.send(newUser);
    }
    catch(error) {
        next(error)
    }
}

module.exports.deleteU = async function (req, res,next) {
    try {
        const myUser = req.body.id;
        const toDelete = await userModel.findByIdAndRemove(ObjectId(myUser));
        await res.send(toDelete);
    }
    catch(error) {
        next(error)
    }
}

module.exports.put = async function (req, res,next) {
    const id= req.params.id;
    try {
        const {email,fName,lName,password}=req.body;
        const data={
            email: email , 
            fName: fName,
            lName: lName ,
            password: password
        }
        let toUpdate = await userModel.findByIdAndUpdate(ObjectId(id),data,{
                new:true
            });
        res.send(toUpdate);
    }
    catch (error) {
        next(error)
    }
}