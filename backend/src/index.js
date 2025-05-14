import express from 'express';
const app = express();
import { connectDB } from './db/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './utils/Config.js';
import userRouter from './routes/authRoute.js'
import foodRoute from './routes/foodRoute.js'
import Food from './models/FoodModel.js';

connectDB();
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use('/api/user', userRouter)
app.use('/api/food', foodRoute)

app.get('/api/addManyItems', async (req, res) => {
    const sampleFoods = [
        {
            name: "Sushi",
            type: "Non-Vegetarian",
            price: 250,
            rating: 4.7,
            description: "Fresh sushi rolls filled with fish, rice, and vegetables, topped with soy sauce and wasabi.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Paella",
            type: "Non-Vegetarian",
            price: 300,
            rating: 4.8,
            description: "A classic Spanish dish made with rice, saffron, and a mix of seafood and meat, served in a large pan.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Bangers and Mash",
            type: "Non-Vegetarian",
            price: 200,
            rating: 4.5,
            description: "Sausages served with mashed potatoes and gravy, a comforting British classic.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Peking Duck",
            type: "Non-Vegetarian",
            price: 400,
            rating: 4.9,
            description: "Crispy duck served with pancakes, hoisin sauce, and thinly sliced vegetables, a traditional Chinese delicacy.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Moussaka",
            type: "Non-Vegetarian",
            price: 250,
            rating: 4.6,
            description: "A baked casserole made with layers of eggplant, minced meat, and béchamel sauce.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Ratatouille",
            type: "Vegetarian",
            price: 180,
            rating: 4.7,
            description: "A vegetable stew made with zucchini, eggplant, bell peppers, and tomatoes, seasoned with herbs.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Falafel",
            type: "Vegetarian",
            price: 120,
            rating: 4.5,
            description: "Crispy fried chickpea balls, served in pita bread with vegetables and tahini sauce.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Tom Yum Soup",
            type: "Non-Vegetarian",
            price: 150,
            rating: 4.8,
            description: "A spicy and sour Thai soup made with shrimp, lemongrass, lime, and chili.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Dim Sum",
            type: "Non-Vegetarian",
            price: 180,
            rating: 4.6,
            description: "Steamed dumplings filled with a variety of fillings like pork, shrimp, and vegetables.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Paolo Ragu",
            type: "Non-Vegetarian",
            price: 220,
            rating: 4.7,
            description: "Italian pasta served with a rich, slow-cooked beef ragu sauce.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Souvlaki",
            type: "Non-Vegetarian",
            price: 180,
            rating: 4.6,
            description: "Grilled skewers of meat, typically served with pita, vegetables, and yogurt sauce.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Ceviche",
            type: "Non-Vegetarian",
            price: 210,
            rating: 4.7,
            description: "Fresh raw fish marinated in citrus juices with onions, cilantro, and spices.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Goulash",
            type: "Non-Vegetarian",
            price: 230,
            rating: 4.5,
            description: "Hungarian beef stew flavored with paprika, onions, and vegetables.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Shawarma",
            type: "Non-Vegetarian",
            price: 160,
            rating: 4.4,
            description: "Spiced meat (usually lamb or chicken) cooked on a vertical rotisserie and served with pita or flatbread.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Mole Poblano",
            type: "Non-Vegetarian",
            price: 280,
            rating: 4.6,
            description: "A rich Mexican sauce made with chili peppers, chocolate, and spices, often served with chicken.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Sauerbraten",
            type: "Non-Vegetarian",
            price: 300,
            rating: 4.8,
            description: "German pot roast marinated in vinegar and spices, traditionally served with red cabbage and dumplings.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Poutine",
            type: "Non-Vegetarian",
            price: 150,
            rating: 4.3,
            description: "French fries topped with cheese curds and gravy, a classic Canadian comfort food.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Tempura",
            type: "Non-Vegetarian",
            price: 170,
            rating: 4.5,
            description: "Japanese dish of battered and deep-fried shrimp and vegetables, served with dipping sauce.",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        },
        {
            name: "Banh Mi",
            type: "Non-Vegetarian",
            price: 130,
            rating: 4.4,
            description: "Vietnamese sandwich made with a crispy baguette, pickled vegetables, and your choice of protein (usually pork).",
            image: "https://res.cloudinary.com/ddghuvxtf/image/upload/v1744783967/IMAGE_LINK_HERE.png",
            quantity: 1
        }
    ];

    try {
        const response = await Food.insertMany(sampleFoods);
        res.status(200).json({ message: "Sample foods seeded successfully!", data: { response } });
    } catch (err) {
        res.status(500).json({ message: "Failed to seed foods", error: err.message });
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})