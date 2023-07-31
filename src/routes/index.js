import { Router } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import UserModel from '../models/database.js';
import Product from '../models/index.js';
import passport from 'passport';

import faker from 'faker';
// import * as faker from 'faker';


// // require the necessary libraries
// const faker = require("faker");
// const mongoose = require("mongoose")
// const Product = require("./model")

const Routes = Router();

Routes.post('/login', passport.authenticate('local',{successRedirect:'protected',failureRedirect:'/login'}))

Routes.get('/logout',(req,res,next)=>{
    req.logOut(function(err){
        if(err){ return next(err)}
        res.redirect('/login')
    });
})

Routes.post('/register', async (req, res) => {
    console.log('>>>>>>')
    try {
        let user = new UserModel({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password,10),
            phone_number : faker.phone.phoneNumber(),
        })

        await user.save().then(user => console.log("USER :::", user))
        res.send(user)
    } catch (error) {
        console.log('Error :::',error)
    }
})

Routes.get('/protected',(req,res)=>{
    if(req.isAuthenticated()){
        res.send('Protected ::')
    }else{
        res.status(401).send({message : 'Unauthorized'})
    }
})


// For faker

Routes.post('/',(req,res)=>{
    try {
        const seed_count = 50;
        let timeSeriesData = [];
        // create 5000 fake data
        for (let i = 0; i < seed_count; i++) {
            const name = faker.name.firstName();
            const price = faker.commerce.price();
            // const date_of_birth = faker.date_of_birth(minimum_age=18, maximum_age=80)
            const phone_number = faker.phone.phoneNumber();
            timeSeriesData.push({ name, price,phone_number });
        }

        console.log('timeSeriesData ::',typeof timeSeriesData,timeSeriesData)
        res.send(timeSeriesData)
} catch (error) {
 console.log('Error :::',error)       
}
})

export default Routes;