const mongoose=require("mongoose");

const dotenv=require("dotenv").config();
// const dbURI = process.env.MONGODB_URI||"mongodb+srv://adarshrajyadav68:TESRECT7!@cluster0.ymcx3jk.mongodb.net/Payto"
console.log(process.env.MONGODB_URI);
console.log("hello");
mongoose.connect(process.env.MONGODB_URI||"")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
const User_Schema=new mongoose.Schema({username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    minLength:3,
    maxLength:30

},firstname:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
},lastname:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
},password:{
    type:String,
    required:true,
    minLength:6
}});
const User=new mongoose.model("User",User_Schema);

const account_Schema=new mongoose.Schema({user_id:{
   type: mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
},
balance:{
    type:Number,
    required:true
}
})

const Balance=new mongoose.model("Balance",account_Schema);

module.exports={
    User,Balance
};
