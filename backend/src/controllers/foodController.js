import Food from "../models/FoodModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";

const createNewFood = async (req, res) => {
    const { name, type, price, rating, description, image } = req.body;

    if (!name || !type || !price || !rating || !description || !image) {
        return res.status(400).json({ message: "Please Enter all the details, including the image!" })
    }
    try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'FoodApp Images'
        });
        const newItem = await Food.create({
            name,
            type,
            price,
            rating,
            description,
            image: uploadResponse.secure_url
        })
        res.status(200).json({ message: "New Item Added!", data: newItem })
    } catch (error) {
        res.status(400).json({ message: "Server Error!" })
        console.log('Error while creating new food:', error.message);
    }
}

const getAllFoods = async (req, res) => {
    try {
        const allItems = await Food.find();
        res.status(200).json({ data: allItems });
    } catch (error) {
        console.log('Error while getting all the food items:', error.message);
    }
}

const dltFood = async (req, res) => {
    try {
        const { id } = req.params;
        await Food.findOneAndDelete({ _id: id });
        res.status(200).json({ message: "Food deleted!" })
    } catch (error) {
        res.status(400).json({ message: "Server Error!" })
    }
}

const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        await Food.findByIdAndUpdate(id, { $set: updatedFields });
        res.status(200).json({ message: "Food updated!" })
    } catch (error) {
        res.status(400).json({ message: "Server Error!" })
    }
}

const relatedFoods = async (req, res) => {
    try {
        const { foodType } = req.params;
        const foodItems = await Food.find({ type: foodType })
        res.status(200).json({ data: foodItems })
    } catch (error) {
        res.status(400).json({ message: "Server Error!" })
    }
}

export { createNewFood, getAllFoods, dltFood, updateFood, relatedFoods }