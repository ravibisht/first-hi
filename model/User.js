import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 20,
    },

    name: {
        type: String,
        required: true,
        maxLength: 20,
    },

    password: {
        type: String,
        required: true,
        validate: {},
    },
})
export default User = mongoose.model('User', UserSchema)
