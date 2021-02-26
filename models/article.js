const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: String,
    articleImg: String,
    thumbnailImg: String
})

module.exports = mongoose.model('Article', articleSchema);