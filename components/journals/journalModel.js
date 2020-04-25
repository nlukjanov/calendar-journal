const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Journal', journalSchema);