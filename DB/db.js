const {MongoClient} = require('mongodb');
const connectionString= "mongodb://srv1:27017";

//const client = new MongoClient(connectionString);

class dataBase{
    constructor(){
    }  
   async connect(){
       const client = new MongoClient(connectionString/*, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         }*/);
   
       let connected = await client.connect();
       this.db = connected.db("324168699");
       console.log("DB Connected!")
     };
   
     getDB(){
        return this.db;
     }
   }
     module.exports = new dataBase();