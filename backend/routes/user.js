const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
require("dotenv").config;
const jwtpassword = require("../config");
const { User, Balance } = require("../db"); // Correctly import User and Balance
const authMiddleware = require("../middleware.js"); // Correct middleware import

const zod_schema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
    username: zod.string()
});

function usercheck(req, res, next) {
    const value = zod_schema.safeParse(req.body);
    if (value.success) {
        next();
    } else {
        res.send("There is something wrong in input");
    }
}

router.post("/signup", usercheck, function (req, res) {
    const { username, firstname, lastname, password } = req.body;

    User.findOne({ username:req.body.username }).then(function (data) {
        if (data) {
            res.json({ msg: "User already exists" });
        } else {
            User.create({ username, firstname, lastname, password }).then(function (value) {
            
                // const token = jwt.sign({ user_id }, jwtpassword);
                res.json({ msg: "User added successfully" });
                createAccount(value);
            });

            function createAccount(data) {
                const user_id = data._id;
                Balance.create({ user_id, balance: 1 + Math.floor(Math.random() * 10000) });
            }
        }
    });
});

router.post("/signin", function (req, res) {

    User.findOne({ username:req.body.username,password:req.body.password}).then(function (data) {
        if (data) {
        const token=jwt.sign({user_id:data._id},jwtpassword);
            res.json({ msg: "User signed in successfully",token });
        } else {
            res.status(401).json({ msg: "Invalid username or password" });
        }
    });
});


router.put("/update", authMiddleware, function (req, res) {
    const updateSchema = zod.object({
        firstname: zod.string().optional(),
        lastname: zod.string().optional(),
        password: zod.string().optional()
    });

    const value = updateSchema.safeParse(req.body);
    if (value.success) {
        const { firstname, lastname, password } = req.body;
        User.updateOne({ _id: req.user_id }, { firstname, lastname, password }).then(function (data) {
            if (data) {
                res.json({ msg: "User updated successfully",updated_data:data });
            }
        });
    } else {
        res.status(400).json({ msg: "Invalid data" });
    }
});
router.get("/users", authMiddleware, function (req, res) {
    const value = req.query.find;
    console.log(value.trim());
    if (value.trim() === "") {
        return res.json({ users: [] }); // Return an empty array if the search value is empty
    }


    User.find({
        $or: [
            { firstname: { "$regex": value, "$options": "i" } },
            { lastname: { "$regex": value, "$options": "i" } }   
        ]
            
            //"$regex": value: This specifies that we are using a regular expression to match the firstname field. The value variable contains the regular expression pattern to be matched. Regular expressions are powerful tools for pattern matching in strings.
           // "$options": "i": This option makes the regular expression case-insensitive. The "i" flag stands for "ignore case," meaning that the match will be successful regardless of whether the letters are uppercase or lowercase.
        
    }).then(function (users) {
        if (users) {
           
            res.json({
                users: users.map(function (user) {
                    return {
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        username: user.username
                    };
                })
            });
        }
    });

}

);

module.exports = router;
