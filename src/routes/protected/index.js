import { Router } from 'express'
// import faker from 'faker'
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import UserModel from '../../models/database.js';
import Product from '../../models/index.js'

// // require the necessary libraries
// const faker = require("faker");
// const mongoose = require("mongoose")
// const Product = require("./model")

const protectedRoute = Router();

protectedRoute.get('/', (req, res) => {
    console.log('Called :::::')
    res.send('Called')
})

protectedRoute.post('/register', async (req, res) => {
    console.log('>>>>>>')
    try {
        let user = new UserModel({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password,10)
        })

        await user.save().then(user => console.log("USER :::", user))
        res.send(user)
    } catch (error) {
        console.log('Error :::',error)
    }
})


// For faker

// protectedRoute.post('/',(req,res)=>{
//     try {
//         const seed_count = 5000;
//         let timeSeriesData = [];
//         // create 5000 fake data
//         for (let i = 0; i < seed_count; i++) {
//             const name = faker.name.firstName();
//             const price = faker.commerce.price()
//             timeSeriesData.push({ name, price });
//         }

//         console.log('timeSeriesData ::',timeSeriesData)


// // async function seedData() {
// //     // Connection URL
// //     const uri = "mongodb://localhost:27017/database_name";
// //     const seed_count = 5000;
// //     mongoose.set("strictQuery", false);
// //     mongoose.connect(uri, {
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true,
// //     }).then(() => {
// //         console.log("Connected to db")
// //     }).catch((err) => {
// //         console.log("error", err)
// //     })

// //     let timeSeriesData = [];
// //     // create 5000 fake data
// //     for (let i = 0; i < seed_count; i++) {
// //         const name = faker.name.firstName();
// //         const price = faker.commerce.price()
// //         timeSeriesData.push({ name, price });
// //     }

// //     const seedDB = async () => {
// //         await Product.insertMany(timeSeriesData)
// //     }

// //     seedDB().then(() => {
// //         mongoose.connection.close()
// //         console.log("seed success")
// //     })
// // }

// // seedData();
//  res.send('dufydfy`')
// } catch (error) {
//  console.log('Error :::',error)       
// }
// })

export default protectedRoute;