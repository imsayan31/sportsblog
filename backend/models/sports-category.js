const mongoose = require('mongoose');

const sportsCategorySchema = mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  category_desc: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdDtm: { type: Date, default: Date.now },
  updatedDtm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sports Category', sportsCategorySchema);
