const mongoose = require('mongoose');
const userSchema = new mongoose.schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
       
    },
    root: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;