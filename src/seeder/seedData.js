const  ROLES  = require("../json/roles.json");

module.exports = {
  roles: [
    {
      role: ROLES.superAdmin,
    },
    {
      role: ROLES.employee,
    },
    {
      role: ROLES.Client,
    },
  ],

  adminData: [
    {
      firstName: "Admin",
      lastName: "user",
      email: "admin@gmail.com",
      password: "Admin@123",
    },
  ],
};
