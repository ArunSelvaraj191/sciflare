import passport from 'passport'
import PassportLocal from 'passport-local'
import UserModel from '../models/database.js'
import bcryptjs from 'bcryptjs'

const passportConfig = () => {

    const LocalStrategy = PassportLocal.Strategy

    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                const user = await UserModel.findOne({ username: username });
            if (!user) {
              return done(null, false, { message: "User Doesn't Exist" });
            }
            if (!bcryptjs.compareSync(password, user.password)) {
              return done(null, false, { message: 'Incorrect Password' });
            }
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      ));
      

// For Persists user data inside of session
passport.serializeUser(function(user, done) {
    console.log('user :::',user.id)
    done(null, user.id);
  });
  // For Fetches session details using session id
  passport.deserializeUser(async function (id, done) {
    try {
      let user = await UserModel.findById(id);
      console.log('user data ::',user)
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  

}

export default passportConfig;
