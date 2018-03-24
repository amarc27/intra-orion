const mongoose = require('mongoose');
const { Schema } = mongoose;

const candidateSchema = new Schema({
  skill: {type: String, enum: ["Dev", "Design", "Sales", "Finance"]},
  contract: {type: String, enum: ["Fulltime", "Internship", "Prestataire"]},
//   date:
  firstname: {type:String, required: [true, "A firstname is required"]},
  lastname: {type:String, required: [true, "A lastname is required"]},
  email: {type:String, required: [true, "An email is required"]}
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Candidate', candidateSchema);