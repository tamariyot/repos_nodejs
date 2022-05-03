const { param } = require("express/lib/request");
const { ObjectId } = require('mongodb')
const db = require('../DB/db');

async function get(req, res) {
    const toget = await db.getDB().collection("user").find().toArray();
    await res.send(toget);
}

async function getById(req, res) {
    const id = req.params.id;
    const togetbyid = await db.getDB().collection("user").findOne(ObjectId(id));
    await res.send(togetbyid);
}

async function post(req, res) {
    if (req.body) {
        const myUser = req.body;
        const { name, password, email } = myUser;
        const document = { name: name, password: password, email: email };
        const toInsert = await db.getDB().collection("user").insertOne(document);
        await res.send(toInsert);
    }
}

async function deleteU(req, res) {
    const myUser = req.body.id;
    const toDelete = await db.getDB().collection("user").deleteOne({ "id": myUser });
    await res.send(toDelete);
}

async function put(req, res) {
    const myUser = req.body.id;
    const myUserp = req.body.password;
    const myUsern = req.body.name;
    const myUsere = req.body.email;

    const toUpdate = await db.getDB().collection("user").findOneAndUpdate({ id: myUser }, { $set: { password: myUserp } }, { $set: { name: myUsern } }, { $set: { email: myUsere } });
    await res.send(toUpdate);
}

module.exports = { get, getById, post, deleteU, put };