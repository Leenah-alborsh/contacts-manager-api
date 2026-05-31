const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../Models/contactModel");

// This file contains the logic for each contacts API route.

// This helper checks if the id looks like a real MongoDB ObjectId.
const validateContactId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid contact id");
  }
};

//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = asyncHandler(async (req, res) => {
  // Find all contact documents from the contacts collection.
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create a new contact
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { name, email, phone } = req.body || {};

  // The user must send name, email, and phone.
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Create saves the new contact in MongoDB.
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access Public
const getContactById = asyncHandler(async (req, res) => {
  validateContactId(req.params.id, res);

  // Find one contact using the id from the URL.
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

//@desc Update contact by ID
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  validateContactId(req.params.id, res);

  // First check if the contact exists.
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Update only the fields that come in the request body.
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after", runValidators: true },
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact by ID
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  validateContactId(req.params.id, res);

  // First check if the contact exists.
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Delete the contact from MongoDB.
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContactById,
  deleteContact,
};
