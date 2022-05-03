// const { param } = require("express/lib/request");
const { ObjectId}=require('mongodb')
const db=require('../DB/db');


async function get(req,res){ 
    const toget=await db.getDB().collection("product").find().toArray();
    await res.send(toget);
}

async function getById(req,res){
    const id=req.params.id;
    const togetbyid=await db.getDB().collection("product").findOne(ObjectId(id));
    await res.send(togetbyid);
}

async function post(req,res){
    if(req.body)
    {
        const myproduct =req.body;
        const {name,description,price}= myproduct;
        const document={name:name,description:description,price:price};
        const toInsert=await db.getDB().collection("product").insertOne(document);
        await res.send(toInsert);
     //await res.send(` ${req.body.name} with id: ${req.body.id} added!!!`);
    }
}

async function deleteP(req,res){
    const myproduct =req.body.id;
    const toDelete=await db.getDB().collection("product").deleteOne({"id":myproduct});
    await res.send(toDelete);
}

async function put(req,res){
    const myproduct =req.body.id;
    const myproductd=req.body.description;
    const myproductn=req.body.name;
    const myproductp=req.body.price;

    const toUpdate=await db.getDB().collection("product").findOneAndUpdate({id:myproduct},{$set:{description:myproductd}},{$set:{name:myproductn}},{$set:{price:myproductp}});
    await res.send(toUpdate);
}

module.exports={get,getById,post,deleteP,put};