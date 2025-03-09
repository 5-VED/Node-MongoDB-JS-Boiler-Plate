const mongoose = require('mongoose');

const roleSchema = mongoose.Schema(
    {
        role: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true, versionKey: false }
);


const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
