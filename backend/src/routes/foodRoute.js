import { Router } from "express";
const route = Router();
import { createNewFood, getAllFoods, dltFood, updateFood, relatedFoods } from "../controllers/foodController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

route.post('/addItem', isLoggedIn, createNewFood);

route.get('/getItems', getAllFoods);

route.delete('/dltItem/:id', isLoggedIn, dltFood);

route.post('/updateItem/:id', isLoggedIn, updateFood);

route.get('/relatedFood/:foodType', relatedFoods);

export default route