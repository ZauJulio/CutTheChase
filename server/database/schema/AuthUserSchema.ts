import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    email: String,
    password: String,
  },
  { _id: false }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
