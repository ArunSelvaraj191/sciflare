import express from 'express'
import CONFIG from './config/index.js';
import Routes from './routes/index.js'
import { createServer } from "node:http";
import mongoose from "mongoose";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import passportConfig from './config/passport.js';

function startServer() {
    const app = express();
    const httpServer = createServer(app);
    // For Body parse - JSON Data
    app.use(express.json());
    // For Session
    app.use(session({
      secret : CONFIG.SECRET_KEY,
      resave : false,
      saveUninitialized : true,
      cookie : {
        maxAge : 1000 * 60 * 60 * 21 // Number of Milliseconds * Seconds * Minutes * Hours
      },
      // store : mongoose.createConnection({mongoUrl : CONFIG.MONGODB, collectionName : 'sessions'})
      store : MongoStore.create({mongoUrl:CONFIG.MONGODB,collectionName:"sessions"})
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    // Call passport file

    passportConfig();

    // require('./config/passport.js')

    // Routes
    app.use('/api',Routes);
  
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