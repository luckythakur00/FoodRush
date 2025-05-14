import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

const Food = mongoose.model('Food', foodSchema)
export default Food