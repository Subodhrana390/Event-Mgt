import mongoose from "mongoose";

export function dbConnection() {
  mongoose
    .connect(
      "mongodb+srv://admin:admin@cluster0.g8y85oz.mongodb.net/eventMgt?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("DB Connected Succesfully");
    })
    .catch((error) => {
      console.log("DB Failed to connect", error);
    });
}
