const mongoose = require('mongoose');
const { Schema } = mongoose;

const ressourceSchema = new Schema({
  category: {type: String, enum: ["Pitch deck", "PR", "Recruit", "Business Plan"]},  
  title: {type:String, required: [true, "A titlze is required"]},
  pictureUrl: String,
  description: {type:String, required: [true, "A description is required"]},
  link: {type:String, required: [true, "A link is required"]}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Ressource', ressourceSchema);