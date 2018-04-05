const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  name: {type:String},
  pictureUrl: String,
  description: {type:String},  
  _employees: [{ type: Schema.Types.ObjectId, ref: 'People' }],
  website: {type:String},
  role: {type: String, enum: ["Startup", "Investor", "EIR", "Outter"]},
  sector: {type: String, enum: ["BioTech", "EdTech", "FinTech", "SexTech"]},
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('Company', companySchema);