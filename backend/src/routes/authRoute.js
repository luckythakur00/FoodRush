import express from "express";
import { checkAuth, logInUser, logOutUser, signUpUser, allUsers, dltUser, newOrder } from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const route = express.Router();

route.post('/signUp', signUpUser)

route.post('/logIn', logInUser)

route.get('/logOut', isLoggedIn, logOutUser)

route.get('/checkAuth', isLoggedIn, checkAuth)

route.get('/allUsers', isLoggedIn, allUsers)

route.delete('/dltUser/:id', isLoggedIn, dltUser)

route.post('/newOrder/:id', isLoggedIn, newOrder)

export default route