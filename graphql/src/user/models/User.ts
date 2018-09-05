import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  profilePictureUrl: String,
});

export default mongoose.model('User', UserSchema);
