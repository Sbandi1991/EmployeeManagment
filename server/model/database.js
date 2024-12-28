// Load .env file
// Rename env to .env (first replace the credentials and endpoint to reflect your own)
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { MONGODB_URI } = process.env;

console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI);

//Listen connection event
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
