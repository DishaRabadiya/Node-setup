const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  user_id: {
    type: Number,
  },
  full_name: {
    type: String,
  },
  email:{
    type:String,
    unique: true, 
  },
  mobile_no:{
    type:String,
    unique: true, 
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
    Comment: "1-superadmin ,2-admin ,3-staff",
  },
  status: {
    type: Number,
    Comment: "0-Deactive , 1-Active",
    default: 1,
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("users", userModel);
