const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
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

module.exports = Poem;
