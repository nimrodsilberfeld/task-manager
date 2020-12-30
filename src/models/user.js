const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is invalid")
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 18) {
                throw new Error("age must be higher then 18 ")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes("password")) {
                throw new Error("password cannont contains the word 'Password'")
            }
        }
    },
    tokens: [{ token: { type: String, required: true } }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('task', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//methods usually refer to instances,in this case to a specific user
userSchema.methods.generateAuthToken = async function () {
    const user = this  //the user from the route "login" or new user
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET)
    user.tokens = user.tokens.concat(({ token }))
    user.save()
    return token
}

//toJSON get called when json.stringifiy get called,whice happend when we send back the user.
//so before we send the user info we REMOVE the password and tokens
userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}


// statics usualy refer to the model 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Email is unknown to the system")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("Unable to login")
    }
    return user
}


//Hash the text of password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//Delete user Taskes if user is Removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User