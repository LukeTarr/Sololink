import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

// Import my custom routers
import { router as authRouter } from "./routes/auth.js";
import { router as linkRouter } from "./routes/links.js";

// Init the app and express with some setup
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// Call config so we can access the env vars
config();

const PORT = process.env.PORT || 5000;

//Connect to the mongoDB with the env var connection string
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    // If no errors connecting, start listening to handle requests
    app.listen(PORT, () => {
      console.log("Server running on:", PORT);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set("useFindAndModify", false);

// Use the custom routers
app.use(authRouter);
app.use(linkRouter);
