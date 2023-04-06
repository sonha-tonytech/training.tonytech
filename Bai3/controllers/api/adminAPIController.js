const AdminService = require("../../service/adminService");

// API for Admin
const apiGetAllAdmins = async (req, res, next) => {
  try {
    const admins = await AdminService.getAllAdmins();
    !admins.length ? res.status(404).json([]) : res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const apiCreateNewAdmin = async (req, res, next) => {
  try {
    const adminFind = await AdminService.getContactByUserName(
      req.body.userName
    );
    if (adminFind !== null) {
      res.json("Admin already exists");
    } else {
      const newAdmin = await AdminService.createAdmin(req.body);
      !Object.values(newAdmin).length
        ? res.status(400).json("Admin could not create")
        : res.status(201).json(newAdmin);
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

    const updateAdmin = await AdminService.updateAdmin(data);
    console.log(updateAdmin);
    updateAdmin.modifiedCount === 1
      ? res.status(200).json(updateAdmin)
      : res.status(400).json("Admin could not Update");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
const apiDeleteAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteAdmin = await AdminService.deleteAdmin(id);
    deleteAdmin.modifiedCount === 1
      ? res.status(200).json(deleteAdmin)
      : res.status(400).json("Admin could not Delete");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  apiGetAllAdmins,
  apiCreateNewAdmin,
  apiUpdateAdmin,
  apiDeleteAdmin,
};
