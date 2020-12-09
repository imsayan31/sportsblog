const mongoose = require('mongoose');

const sportsCommentSchema = mongoose.Schema({
  parent_id: { type:String },
  blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sports Blog', required: true },
  name: { type:String, required: true },
  email: { type:String, required: true },
  comments: { type:String, required: true },
  isDeleted: { type: Boolean, default: false },
  createdDtm: { type: Date, default: Date.now },
  updatedDtm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sports_Comment', sportsCommentSchema);
