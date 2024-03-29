const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const contactSschema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add the contact email address"],
  },
  phone: {
    type: String,
    required: [true, "Please add the contact phone Number"],
  },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("contact",contactSschema);
