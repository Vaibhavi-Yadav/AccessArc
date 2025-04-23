const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  user_type: { type: String, enum: ['user', 'admin'], default: 'user' },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
