// Node modules
import mongoose, { ConnectOptions } from "mongoose";

// Local modules
import config from "config";

function connect() {
  const databaseUri = config.get("databaseUri") as string;

  return mongoose
    .connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((error) => {
      console.log(`Database connection error: ${error}`);
      process.exit(1);
    });
}

export default connect;