

//Simulates Authentication this lets everything work

// module.exports.isAuthenticated = (req, res, next) => {
    // Simulate user authentication for testing purposes
    // req.user = { username: 'testuser', _id: 'fakeUserId' };

    // console.log('User authenticated for testing purposes:', req.user);
    // return next();
// };


//First try

// module.exports.isAuthenticated = (req, res, next) => {
//     console.log('Checking authentication:', req.isAuthenticated());
//     console.log("Checking User:", req.user);
//     if (req.isAuthenticated()) {
//         console.log('User authenticated:', req.user);
//         return next();
//     } else {
//         console.log('User not authenticated');
//         req.flash('error', 'You need to be logged in to view this page');
//         res.redirect('/users/logon');
//     }
// };

//Second try

module.exports.isAuthenticated = (req, res, next) => {
    console.log('Checking authentication:', req.isAuthenticated());
    console.log(req.user);
    if(!req.user) {
        req.flash("error", "You can't access that page before logon,");
        console.log('User not authenticated');
        res.redirect("/");
    } else {
        console.log('User authenticated:', username);
        next();
    }
    if (req.isAuthenticated()) {
        console.log('User authenticated:', req.user);
        return next();
    } else {
        console.log('User not authenticated');
        req.flash('error', 'You need to be logged in to view this page');
        res.redirect('/users/logon');
    }
};