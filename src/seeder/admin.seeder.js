const ROLES  = require('../Constants/roles');
const { RoleModel, UserModel } = require('../Models');
const { adminData } = require('./seedData');

/**
 * Admin seeder.
 */
module.exports = adminSeeder = async () => {
  const superAdminRole = await RoleModel.findOne({ role: ROLES.superAdmin });

  try {
    for (let admin of adminData) {
      const adminExist = await UserModel.findOne({ email: admin.email }); // Get Admin by email.

      if (!adminExist) {
        await UserModel.create({
          firstName: "Admin",
          lastName: "user",
          email: "admin@gmail.com",
          password: "Admin@123",
          roleId: superAdminRole._id,
          isEmailVerified: true,
        }); 
      }
    }

    console.log('✅ Admin seeder run successfully...');
  } catch (error) {
    console.log('❌ Error from admin seeder :', error);
  }
};
