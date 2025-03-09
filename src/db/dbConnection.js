const mongoose = require('mongoose');

module.exports = connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            autoIndex: true,
            useUnifiedTopology: true,
        }); // Database connected.
        console.log('✅ Database Connected successfully...');
    } catch (error) {
        console.log('❌ Database Connections Error :', error);
    }
};