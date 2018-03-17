const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  name: {type:String, required: [true, "A name is required"]},
  pictureUrl: String,
  description: {type:String, required: [true, "A description is required"]},  
  _employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  website: {type:String, required: [true, "A website url is required"]},
  role: {enum: ["Startup", "Investor", "EntInRes", "Outter"]},
  sector: {enum: ["BioTech", "Edtech", "FinTech", "SexTech"]},
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Company', companySchema);