import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        min: [3, 'Username Should be minimum 3 character'],
    },

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        validate: {
            validator: (email) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    email,
                )
            },
            message: (email) => `${email} is not valid email address`,
        },
    },

    password: {
        type: String,
        min: [6, 'Password length should be minimum 6 character'],
        select : false,
    },

    socialLogin: [
        {
            type: {
                id: {
                    type: String,
                    required: [true, 'Social id is required'],
                },
                platformType: {
                    type: String,
                    enum: [
                        'GOOGLE',
                        'FACEBOOK',
                        'TWITTER',
                        'LINKEDIN',
                        'APPLE',
                    ],
                    required: [true, 'Platform type is required'],
                },
            },
            required: false,
        },
    ],

    profilePicture: String,

    confirmationCode: {
        type: String,
        min: [4, 'OTP must be 4 digit'],
        max: [4, 'OTP must be 4 digit'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },

    updatedAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
})

UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)

    next()
})

UserSchema.methods.validatePassword = async function ( comparePassword ){
    return await  bcrypt.compare(comparePassword,this.password)
}

export default mongoose.model('User', UserSchema)
