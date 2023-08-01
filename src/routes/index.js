import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserModel from "../models/database.js";
import passport from "passport";
import faker from "faker";

const Routes = Router();

// For Signup

Routes.post("/register", async (req, res) => {
  console.log("request body data :::", req.body);
  try {
    let user = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
      phone_number: faker.phone.phoneNumber(),
      age: req.body.age,
    });

    await user.save().then((user) => console.log("USER :::", user));
    res.send(user);
  } catch (error) {
    console.log("Error :::", error);
  }
});

// For Login

Routes.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info);
    } else {
      return res.status(200).send(user);
    }
  })(req, res, next);
});

Routes.get("/dashboard", async (req, res) => {
  try {
    console.log("Query Req :::", req.query);
    let { role, userId } = req.query;
    let allUsers;
    if (role == 2) {
      allUsers = await UserModel.find({ _id: userId });
    } else {
      allUsers = await UserModel.find();
    }
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

Routes.put("/update", async (req, res) => {
  const { _id, username, phone_number, role, email, age, state } = req.body;
  console.log("request body data :::", req.body);
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { $set: { username, phone_number, role, email, age, state } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

Routes.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("userId :::", userId);
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// For faker

// Routes.post('/',(req,res)=>{
//     try {
//         const seed_count = 50;
//         let timeSeriesData = [];
//         // create 5000 fake data
//         for (let i = 0; i < seed_count; i++) {
//             const name = faker.name.firstName();
//             const price = faker.commerce.price();
//             // const date_of_birth = faker.date_of_birth(minimum_age=18, maximum_age=80)
//             const phone_number = faker.phone.phoneNumber();
//             timeSeriesData.push({ name, price,phone_number });
//         }

//         console.log('timeSeriesData ::',typeof timeSeriesData,timeSeriesData)
//         res.send(timeSeriesData)
// } catch (error) {
//  console.log('Error :::',error)
// }
// })

export default Routes;
