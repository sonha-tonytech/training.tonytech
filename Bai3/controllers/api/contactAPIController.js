const ContactService = require("../../service/contactService");

// API for Customer
const apiGetAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactService.getAllContacts();
    !contacts.length
      ? res.status(404).json([])
      : res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiGetContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await ContactService.getContactById(id);
    !Object.values(contact).length
      ? res.status(404).json("User not found")
      : res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiCreateNewContact = async (req, res, next) => {
  try {
    const userFind = await ContactService.getContactByUserName(
      req.body.userName
    );
    if (userFind !== null) {
      res.json("User already exists");
    } else {
      const newContact = await ContactService.createContact(req.body);
      !Object.values(newContact).length
        ? res.status(400).json("User could not create")
        : res.status(201).json(newContact);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiUpdateContact = async (req, res, next) => {
  try {
    const data = {
      _id: req.params.id,
      index: req.body.index,
      userName: req.body.userName,
      passWord: req.body.passWord,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
    };
    const updateContact = await ContactService.updateContact(data);
    updateContact.matchedCount === 1
      ? res.status(200).json("Success")
      : res.status(400).json("User could not Update");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiDeleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteContact = await ContactService.deleteContact(id);
    deleteContact.modifiedCount === 1
      ? res.status(200).json("Success")
      : res.status(400).json("User could not Delete");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  apiGetAllContacts,
  apiGetContactById,
  apiCreateNewContact,
  apiUpdateContact,
  apiDeleteContact,
};
