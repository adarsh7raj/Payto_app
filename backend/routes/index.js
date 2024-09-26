const express = require("express");
const userRouter=require("./user.js");
const accountRouter=require("./account.js");
const app=express();
const  router=express.Router();
router.use("/user",userRouter);
router.use("/account",accountRouter)
app.use(express.json());


module.exports= router;
