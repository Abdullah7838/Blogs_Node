const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    PostedOn:{
        type:Date,
        default:Date.now()
    }
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports=Blog;