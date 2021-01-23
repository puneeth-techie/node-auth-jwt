const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isAdmin: Boolean,
});

// userSchema.pre('save', function(next){
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//         })
//     })
//     next();
// })

userSchema.methods.generateAuthToken = function(){
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtKey'), { expiresIn: maxAge});
    return token;
}

const Users = mongoose.model('Users', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(5).max(16).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'password must match' } } })
    }
    return Joi.validate(user, schema);
}

exports.Users = Users;
exports.validateUser = validateUser;