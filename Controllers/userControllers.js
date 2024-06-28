const poemUser = require('../Models/User');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res, next) => {
    const { username, password, password1 } = req.body;

    console.log("Attempting to register user:", username);

    // Check if passwords match
    if (password !== password1) {
        console.log("Passwords do not match");
        req.flash('error', 'Passwords do not match');
        return res.render('register', { errors: req.flash('error') });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new poemUser({ username, password });
        await newUser.save();

        console.log("User registered successfully:", newUser);

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/users/logon');
    } catch (err) {
        console.error('Error creating user', err);
        req.flash('error', 'Error creating user');
        res.render('register', { errors: req.flash('error') });
    }
};

exports.getLogon = (req, res) => {
    console.log("got logon");
    res.render('logon', {
        errors: req.flash("error"),
        info: req.flash("info"),
    });
};

exports.postLogon = async (req, res) => {
    console.log("Attempting to log in with username:", req.body.username);

    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await poemUser.findOne({ username });

        if (!user) {
            console.log("User not found:", username);
            req.flash('error', 'Incorrect username or password.');
            return res.redirect('/users/logon');
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        console.log("Password from form:", password);
        console.log("Hashed password from DB:", user.password);
        console.log("Is match:", isMatch);

        if (!isMatch) {
            console.log('Password does not match for user:', username);
            req.flash('error', 'Incorrect username or password.');
            return res.redirect('/users/logon');
        } else {
            console.log('Login successful for user:', username);
            return res.redirect('/poems/wordForm');
            // return res.render('Views/wordForm');
        }

    } catch (error) {
        console.error("Error logging in:", error);
        req.flash('error', 'Error logging in');
        return res.redirect('/users/logon');
    }
};

// exports.getWordForm = (req, res) => {
//     res.render('wordForm');
// };

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/logon');
};
