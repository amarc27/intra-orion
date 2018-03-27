const mongoose = require('mongoose');
const { Schema } = mongoose;

const mailSchema = new Schema({
  firstname: {type:String, required: [true, "A name is required"]},
  email: {type:String, required: [true, "A description is required"]},
});

module.exports = mongoose.model('Mail', mailSchema);