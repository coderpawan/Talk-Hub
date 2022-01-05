const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


// var check = function (val){
//     if(val.includes("@itbhu.ac.in"))
//     {
//         return true;

//     }
//     return false;
// }

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please  enter the name"]
    },
    age: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: [true, "This email address already registered"],
        required: [true, "Please  enter the email"],
        validate: [isEmail, 'Please enter a valid email address']
        // validate: check
    },
    password: {
        type: String,
        required: [true, "Please  enter the password"],
        minlength: [6, "Password should be minimun of 6 letters"]
    }

}, { timestamps: true }, { typeKey: '$type' });


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        // const isAuthenticated = await bcrypt.compare(password, user.password);

        if (password===user.password) {
            return user;
        }
        else {
            console.log(user.password)
            throw new Error('incorrect password');
        }
    }
    else {


        throw new Error('incorrect email');
    }

}

const User = mongoose.model('user', userSchema);
module.exports = User;