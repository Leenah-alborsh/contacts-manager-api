const express = require("express");
const router = express.Router();

// This file connects the API routes with the contact controller functions.
const {
  getContacts,
  createContact,
  updateContact,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");

// GET /api/contacts gets all contacts.
// POST /api/contacts creates a new contact.
router.route("/").get(getContacts).post(createContact);

// These routes work with one contact by its MongoDB id.
router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
