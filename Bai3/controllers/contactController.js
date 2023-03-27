const ContactService = require("../service/contactService");

const apiGetAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactService.getAllContacts();
    !contacts.length
      ? res.status(404).json("User not found")
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
    const newContact = await ContactService.createContact(req.body);
    !Object.values(newContact).length
      ? res.status(404).json("User could not create")
      : res.status(200).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiUpdateContact = async (req, res) => {
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
    !Object.values(updateContact).length
      ? res.status(404).json("User could not create")
      : res.status(200).json(updateContact);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const apiDeleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteContact = await ContactService.deleteContact(id);
    res.json(deleteContact);
  } catch (error) {
    console.log(error);
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
