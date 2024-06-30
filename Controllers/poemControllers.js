const Poem = require('../Models/Poem');
const poemUser = require('../Models/User');

exports.getWordForm = (req, res) => {
    res.render('wordForm');
};

exports.generatePoem = async (req, res) => {
    const { username, noun, noun2, verb, verb2, adjective } = req.body;

    console.log("Getting username #1:", username);


    try {
        if (!username) {
            console.log('User not authenticated');
            throw new Error('User not authenticated');
        }

        const user = await poemUser.findOne ({ username });

        if(!user) {
            console.log('User not found');
            throw new Error('User not found');
        }
        
        console.log('User authenticated for generating poem:', username);

    console.log("Getting username #2:", username);
    // try {
    //     if (!req.user) {
    //         console.log('User not authenticated');
    //         throw new Error('User not authenticated');
    //     }

    //     console.log('User authenticated for generating poem:', req.user);


        const poemContent = `High above the ${noun} so high, 
        there lived a ${noun2} so sweet and nigh. 
        She loved to ${verb} and flit about. 
        She liked to ${verb2} and pluck and shout. 
        But there lived a ${adjective} bear who'd scare you out your underwear. 
        So out she flew so far away to never see the light of day.`;

        const createdPoem = await Poem.create({
            title: 'Your Custom Poem',
            content: poemContent,
            createdBy: user._id
            // createdBy: req.user
        });

        console.log('user:', req.user, 'poem')

        res.render('viewPoem', { poem: createdPoem });
    } catch (err) {
        console.error('Error generating poem', err);
        res.status(500).send('Generator Server Error');
    }
};

exports.viewPoem = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);
        if (!poem) {
            return res.status(404).send('Poem not found');
        }
        res.render('viewpoem', { poem });
    } catch (err) {
        console.error('View Server Error', err);
        res.status(500).send('View Server Error');
    }
};



// const Poem = require('../Models/Poem');

// exports.getWordForm = (req, res) => {
//     res.render('wordForm');
// };

// exports.generatePoem = async (req, res) => {
//     try {
//         // if (!req.user || !req.user._id) {
//         //     throw new Error('User not authenticated');
//         // }
//         console.log('User authenticated for generating poem:', req.user);

//         const { noun, verb, adverb, adjective } = req.body;

//         const poemContent = `High above the ${noun} so high, 
//         there lived a bird so sweet and nigh. 
//         She loved to ${verb} and ${adverb} about. 
//         She liked to nit and pluck and shout. 
//         But there lived a ${adjective} bear who'd scare you out your underwear. 
//         So out she flew so far away to never see the light of day.`;

//         console.log('User:', req.user);

//         if (!req.user || !req.user._id) {
//             console.log('User not authenticated');
//             throw new Error('User not authenticated');
//         } else {
//             console.log('User is authenticated:', req.user._id);
//         }

//         const createdPoem = await Poem.create({
//             title: 'Your Custom Poem',
//             content: poemContent,
//             createdBy: req.user._id
//         });

//         res.render('viewPoem', { poem: createdPoem });
//     } catch (err) {
//         console.error('Error generating poem', err);
//         res.status(500).send('Generator Server Error');
//     }
// };

// exports.viewPoem = async (req, res) => {
//     try {
//         const poem = await Poem.findById(req.params.id);
//         if (!poem) {
//             return res.status(404).send('Poem not found');
//         }
//         res.render('viewpoem', { poem });
//     } catch (err) {
//         console.error('View Server Error', err);
//         res.status(500).send('View Server Error');
//     }
// };