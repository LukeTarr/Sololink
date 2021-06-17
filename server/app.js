import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserModel } from "../server/schemas.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server running on:", PORT);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });

mongoose.set("useFindAndModify", false);

app.post("/auth/register", async (req, res) => {
  let sent = false;

  console.log(req.body);

  if (req.body.userName.length === 0) {
    res.send({ error: "Username must be filled out" });
    sent = true;
  } else if (req.body.email.length === 0) {
    res.send({ error: "Email must be filled out" });
    sent = true;
  } else if (req.body.password1.length === 0) {
    res.send({ error: "Password must be filled out" });
    sent = true;
  } else if (req.body.password2.length === 0) {
    res.send({ error: "Re-enter password" });
    sent = true;
  } else if (req.body.password1 !== req.body.password2) {
    res.send({ error: "Passwords don't match" });
    sent = true;
  }

  if (!sent) {
    UserModel.exists({ userName: req.body.userName }, async (err, doc) => {
      if (doc) {
        res.send({ error: "Username is taken" });
      } else {
        UserModel.exists({ email: req.body.email }, async (err2, doc2) => {
          if (doc2) {
            res.send({ error: "Email is already in use" });
          } else {
            const salt = await bcrypt.genSalt(10);
            const pword = await bcrypt.hash(req.body.password1, salt);
            const user = new UserModel({
              userName: req.body.userName,
              email: req.body.email,
              password: pword,
              links: [],
            });
            user.save((e) => console.log(e));
            res.send({ error: null });
          }
        });
      }
    });
  }
});
