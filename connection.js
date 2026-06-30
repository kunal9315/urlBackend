import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

async function connectDB() {
  await mongoose.connect(process.env.DATABASE_URL, {
    dbName: "urlShortner"
  })
    .then(() => { console.log("Database connected successfully") })
    .catch((err) => { console.log(err.message) })
}
export default connectDB