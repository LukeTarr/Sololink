import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import jwt from 'jsonwebtoken';

const router = express.Router();


function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET);
}

router.post("/auth/register", async (req, res) => {
  // track if a response was sent yet
  let sent = false;

  console.log(req.body);

  //do the same validation as on client in-case of alternative client
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
  // if all the previous validation passed, check if the userName or email have been used in db yet

  if (!sent) {
    User.exists({ userName: req.body.userName }, async (err, doc) => {
      if (doc) {
        res.send({ error: "Username is taken" });
      } else {
        User.exists({ email: req.body.email }, async (err2, doc2) => {
          if (doc2) {
            res.send({ error: "Email is already in use" });
          } else {
            // construction of the payload to get sent to the db with a hashed password from bcrypt
            const salt = await bcrypt.genSalt(10);
            const pword = await bcrypt.hash(req.body.password1, salt);

            const user = new User({
              userName: req.body.userName,
              email: req.body.email,
              password: pword,
              links: [],
            });
            // if this post doesn't contain an already used email or userName, save it to the db
            user.save((e) => console.log(e));
            res.send({ error: null });
          }
        });
      }
    });
  }
});

router.post("/auth/login", async (req, res) => {
  let sent = false;

  if (req.body.email.length === 0) {
    res.send({ error: "Email must be filled out" });
    sent = true;
  } else if (req.body.password.length === 0) {
    res.send({ error: "Password must be filled out" });
    sent = true;
  }

  if (!sent) {
    User.findOne({ email: req.body.email }, async (err, doc) => {
      if(doc){
        bcrypt.compare(req.body.password, doc.password, function (err, result) {
            if(err) {
              console.log(err)
            }
            if(result) {
              const auth = generateAccessToken(doc.userName);
              res.send({token: auth});
            } else {
              res.send({error: "Wrong password"});
            }
        });
      } else {
        res.send({error: "No user found with that email"})
      }
    });
  }
});

export { router };
