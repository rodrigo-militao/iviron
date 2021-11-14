const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
 
const users = [{ 
    _id: 1, 
    username: "adm", 
    password: "$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW",
}];
 
module.exports = function(passport){
    function findUser(username){
        return users.find(user => user.username === username);
    }
    
    function findUserById(id){
        return users.find(user => user._id === id);
    }

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
 
    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
      (username, password, done) => {
          try {
              const user = findUser(username);
                console.log(user)
              if (!user) { return done(null, false) }

              const isValid = bcrypt.compareSync(password, user.password);
              if (!isValid) return done(null, false)
              
              return done(null, user)
          } catch (err) {
              done(err, false);
          }
      }
    ));
}