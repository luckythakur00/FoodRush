import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    allOrders: {
        type: Array,
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User