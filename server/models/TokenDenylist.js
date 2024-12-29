import mongoose from 'mongoose';

const tokenDenylistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // Automatically remove entries after 24 hours
  }
});

export default mongoose.model('TokenDenylist', tokenDenylistSchema);