/**
  App ID: 697185
  Client ID: Iv1.cbef2e47bf15f010
  Client Secret: 3431a3cb77c1e4e5d4e2fffd1c4f737b6c6dd7b7
*/
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from 'passport'

import UserDaoMongoDB from '../../factory/dao/mongoDB/users/user.dao.js'

const userDaoMongoDB = new UserDaoMongoDB()

 const strategyOptions = {
   clientID: 'Iv1.cbef2e47bf15f010',
   clientSecret: 'a3fa57f78df6d8725c3f8135d8da7671da293211',
   callbackURL: 'http://localhost:8080/githubcallback'
 }

 const registerOrLogin = async (accesToken, _, profile, done) => {
  try {
    const user = await userDaoMongoDB.findByEmail( profile._json.email )
    if (!user) {
      const newUser = {
        email: profile._json.email,
        firstname: profile._json.name || profile._json.login || 'noname',
        lastname: 'nolast',
        password: 'nopass',
      };
      const userCreated = await userDaoMongoDB.registerUser(newUser)
      console.log('User Registration succesful')
      return done(null, userCreated)
    } else {
      console.log('User already exists')
      return done(null, user)
    }
  } catch (e) {
    console.log('Error en auth github')
    console.log(e)
    return done(e)
  }
}


 export function iniPassport() {
  passport.use('github', new GitHubStrategy(strategyOptions, registerOrLogin))
 }