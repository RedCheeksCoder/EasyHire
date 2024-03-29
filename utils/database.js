import mongoose from "mongoose";

//for status connection
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  /*   mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true); */
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "easy_hire",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
