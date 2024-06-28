const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'poemUser',
    //     ref: user,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Poem = mongoose.model('Poem', PoemSchema);

module.exports = Poem
