import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;