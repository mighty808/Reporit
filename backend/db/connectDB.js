import moongoose from "moongoose";

const connectDb = async (DATABASE_URL) => {
  try {
    await moongoose.connect(DATABASE_URL);
    console.log("Database is connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
