const env= require('dotenv').config();

const port= process.env.PORT;
const Conection_string= process.env.CONECTION_STRING;
const environment=process.env.ENVIRONMENT;
module.exports={port,Conection_string,environment}

