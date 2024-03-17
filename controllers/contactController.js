const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

//@desc Get all Contacts

//@route Get /api/contacts

//@acess private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json( contacts );
});

//@desc Create new Contacts

//@route POST /api/contacts

//@acess private

const postContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("json cannot be empty");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json( contact );
});

//@desc Get Contact

//@route GET /api/contacts

//@acess private
const getId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Put Contact for given id

//@route PUT /api/contacts

//@acess private
const putId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User dont have permission to update other user contact")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact );
});

//@desc Delete Contact for given id

//@route DELETE /api/contacts

//@acess private

const deleteId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User dont have permission to delete other user contact")
    }

    await Contact.deleteOne({_id: req.params.id});
  res.status(200).json( contact );
});

module.exports = { getContact, postContacts, getId, putId, deleteId };
