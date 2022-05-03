const express = require('express');
const app = express();
const user = require('./Router/userRoute');
const product = require('./Router/productRoute');
const category = require('./Router/categoryRoute');
const orders = require('./Router/ordersRoute');
const winston =require('winston');
const logger=require('./log/logger');
const db = require('./DB/mongoose');
const{port}= require('./config');
const{environment}= require('./config');
const path=require('path')

app.use(express.static('static'));
db.conect();

app.use(express.json());

app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/category', category);
app.use('/api/orders', orders);

app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname, "./static/404.html"));
})

// app.listen(port, () => {
//     console.log(`server is running ${port}`)
// })

if(environment=="development")
{   
    app.listen(port, () => {
        logger.error('ERROR');
        logger.info(`this is an error ${port}`);
})

}
