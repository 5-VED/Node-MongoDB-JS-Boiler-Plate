const ROLES  = require('../json/roles.json');
const { User, Role } = require('../models');
const { adminData } = require('./seedData');

/**
 * Admin seeder.
 */
module.exports = adminSeeder = async () => {
  const superAdminRole = await Role.findOne({ role: ROLES.superAdmin });

  try {
    for (let admin of adminData) {
      const adminExist = await User.findOne({ email: admin.email }); // Get Admin by email.

      if (!adminExist) {
        await User.create({
          firstName: "Admin",
          lastName: "user",
          email: "admin@gmail.com",
          password: "Admin@123",
          roleId: superAdminRole._id,
          isEmailVerified: true,
        }); // If admin doesn't exists, create admin.
      }
    }

    console.log('✅ Admin seeder run successfully...');
  } catch (error) {
    console.log('❌ Error from admin seeder :', error);
  }
};
