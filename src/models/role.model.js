const {Schema,model} = require('mongoose');

const roleSchema = Schema(
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


const Role = model('Role', roleSchema);
module.exports = Role;
