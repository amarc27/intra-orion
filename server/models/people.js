const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const peopleSchema = new Schema({
  // email: String, // Defined with passportLocalMongoose
  // hashed: String, // Defined with passportLocalMongoose
  // salt: String, // Defined with passportLocalMongoose
  firstname: {type:String, required: [true, "A firstname is required"]},
  lastname: {type:String, required: [true, "A lastname is required"]},
  mobilePhone: {type:String, required: true},
  role: {type: String, enum: ["Admin", "Staff", "Founder", "Outter"]},
  specialSkill: String,
  pictureUrl: String,
  position: String,
  _company: { type: Schema.Types.ObjectId, ref: 'Company' },
  signupSecret: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

// Add "email" (instead of "username"), "hash" and "salt" field to store the email (as username), the hashed password and the salt value
// Documentation: https://github.com/saintedlama/passport-local-mongoose
peopleSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model('people', peopleSchema);