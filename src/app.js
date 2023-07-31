import express from 'express'
import CONFIG from './config/index.js';
import protectedRoute from './routes/protected/index.js'
import { createServer } from "node:http";
import mongoose from "mongoose";

function startServer() {
    const app = express();
    const httpServer = createServer(app);
    app.use(express.json());
    app.use('/api',protectedRoute);
  
    const server = httpServer
      .listen(CONFIG.PORT, () => {
        console.log(`
      **************************************
      Server listing on PORT : ${CONFIG.PORT}
      **************************************
      `);
      })
      .on("error", (error) => {
        console.log(`Error ::::: ${error}`);
        throw error;
      });

      mongoose.connect(`${CONFIG.MONGODB}`).then(() => {
        console.log("Database Connected Successfully ::");
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
  
    server.setTimeout(10000);
  }
  
  startServer();