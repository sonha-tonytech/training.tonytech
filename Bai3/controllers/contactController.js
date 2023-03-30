const ContactService = require("../service/contactService");

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
        ? res.status(404).json("User could not create")
        : res.status(200).json("Success");
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
    updateContact.modifiedCount === 1
      ? res.status(200).json("Success")
      : res.status(404).json("User could not Update");
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
      : res.status(404).json("User could not Delete");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// API for Admin
const apiGetAllAdmins = async (req, res, next) => {
  try {
    const admins = await ContactService.getAllAdmins();
    !admins.length ? res.status(404).json([]) : res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const apiCreateNewAdmin = async (req, res, next) => {
  try {
    const adminFind = await ContactService.getContactByUserName(
      req.body.userName
    );
    if (adminFind !== null) {
      res.json("Admin already exists");
    } else {
      const newAdmin = await ContactService.createAdmin(req.body);
      !Object.values(newAdmin).length
        ? res.status(404).json("Admin could not create")
        : res.status(200).json(newAdmin);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const apiUpdateAdmin = async (req, res, next) => {
  try {
    const data = {
      _id: req.params.id,
      userName: req.body.userName,
      passWord: req.body.passWord,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
    };

    const updateAdmin = await ContactService.updateAdmin(data);
    console.log(updateAdmin);
    updateAdmin.modifiedCount === 1
      ? res.status(200).json(updateAdmin)
      : res.status(404).json("Admin could not Update");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const apiDeleteAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteAdmin = await ContactService.deleteAdmin(id);
    deleteAdmin.modifiedCount === 1
      ? res.status(202).json(deleteAdmin)
      : res.status(404).json("Admin could not Delete");
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
  apiGetAllAdmins,
  apiCreateNewAdmin,
  apiUpdateAdmin,
  apiDeleteAdmin,
};
