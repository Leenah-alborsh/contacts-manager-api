const mongoose = require("mongoose");

// This file describes how a contact document should look in MongoDB.
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
  },
  {
    // Mongoose will add createdAt and updatedAt automatically.
    timestamps: true,
  },
);

// This creates the contacts collection in MongoDB and lets controllers use it.
module.exports = mongoose.model("Contact", contactSchema);
