const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
// const poemRoutes = require('./Routes/poemRoutes');
// app.use('/poems', poemRoutes);

module.exports = function () {
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log("Successful Authentication");
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        console.log("Serializing User");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing User");
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};