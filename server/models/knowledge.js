const mongoose = require('mongoose');
const { Schema } = mongoose;

const knowledgeSchema = new Schema({
  category: {type: String, enum: ["Pitch deck", "PR", "Recruit", "Business Plan"]},  
  title: {type:String, required: [true, "A title is required"]},
  pictureUrl: String,
  description: {type:String, required: [true, "A description is required"]},
  link: {type:String, required: [true, "A link is required"]}
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Knowledge', knowledgeSchema);