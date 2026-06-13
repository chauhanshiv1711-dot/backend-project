import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    // Insert DB name before query parameters in the URI
    const uri = process.env.MONGODB_URI;
    const [base, query] = uri.split("?");
    const connectionString = query
      ? `${base}${DB_NAME}?${query}`
      : `${base}/${DB_NAME}`;

    const connectionInstance = await mongoose.connect(connectionString);
    console.log(
      `\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;


// import mongoose from "mongoose";
// import { DB_NAME } from "./constant.js";

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );

//     console.log(
//       `\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
