import * as mongoose from 'mongoose';

delete mongoose.connection.models.User;

export interface UserModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profilePictureUrl: string;
  active: boolean;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<UserModel>('User', UserSchema);
