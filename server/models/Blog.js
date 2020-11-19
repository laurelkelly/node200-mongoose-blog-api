// Imports mongoose and extracts Schema into its own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with properties
const BlogSchema = new Schema({
    title: { type: 'string', required: true },
    article: { type: 'string', required: true },
    published: { type: Date, required: true },
    featured: { type: 'boolean', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Blog', BlogSchema);