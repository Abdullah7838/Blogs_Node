const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    default:null
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
})

const Person = mongoose.model('Person',PersonSchema);
module.exports=Person;