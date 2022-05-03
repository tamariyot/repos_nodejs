const mongoose=require('mongoose');
const {Conection_string} = require('../config')
class MongooseDb{
    constructor(){}

    async conect(){
        const url=Conection_string;
        await mongoose.connect(url);
        console.log("db connected with mongoose!!!")
    }
}
module.exports=new MongooseDb();