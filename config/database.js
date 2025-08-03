import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Load .env variables at the top

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb+srv://phantomdevel:Aqib-1234@cluster0.sqkqe.mongodb.net/rolebased";

  if (!uri) {
    console.error("❌ MONGODB_URI is undefined. Did you forget your .env file?");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
