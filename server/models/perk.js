const mongoose = require('mongoose');
const { Schema } = mongoose;

const perkSchema = new Schema({
  name: {type:String, required: [true, "A name is required"]},
  pictureUrl: String,
  description: {type:String, required: [true, "A description is required"]},  
  category: {enum: ["Marketing", "CRM", "Sales", "Devs"]},
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Perk', perkSchema);