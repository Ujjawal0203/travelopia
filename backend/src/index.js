require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('../config/db');
const formModel = require('../model/form.model');

const app = express();

app.use(cors());

app.use(express.json());



app.get('/', (req , res)=>{
    res.send('Welcome in Travelopia Api')
})

app.post('/form' , async(req , res)=>{
    try {
         let form = await formModel.create({...req.body});
         res.send({status:true , message : 'form submitted'})
    } catch (error) {
        res.send({status:false , message : error.message})
    }
})

app.get('/form' , async(req , res)=>{
    try {
         let forms = await formModel.find();
         res.send({status:true , data : forms});
    } catch (error) {
        res.send({status:false , message : error.message})
    }
})



app.listen(8080 , async()=>{
    try {
        await connection();
        console.log('listening on http://localhost:8080')
    } catch (error) {
        console.log(error)
    }
})

module.exports = app;