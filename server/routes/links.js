import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/Links', async (req, res) => {

    let sent = false;
    let token = '';
    let decoded = '';

    const bearerHeader = req.headers['authorization'];

    try{
        const bearer = bearerHeader.split(' ');
        token = bearer[1];

        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        res.send({error: 'No Token Supplied'});
        sent = true;
    }

    let result = [];

    if(!sent){
        User.findOne({userName: decoded}, async (err, doc) => {
            if (doc) {
                result = doc.links;
                res.send(result);
            } else {
                res.send({error: "Failed to Authenticate"})
                sent = true;
            }
        })
    }
    
});

export { router };
