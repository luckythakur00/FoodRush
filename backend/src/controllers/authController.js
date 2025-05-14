import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken.js";

const signUpUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be greater than 6 characters" });
        }
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already registered" });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(400).json({ message: "Something went wrong" });
                else {
                    const newUser = await User.create({
                        fullName,
                        email,
                        password: hash
                    })
                    let token = generateToken(newUser);
                    res.cookie('token', token);
                    res.status(200).json({
                        data: {
                            _id: newUser?._id,
                            fullName: newUser?.fullName,
                            email: newUser?.email
                        },
                        message: "User Created"
                    })
                }
            })
        })
    } catch (error) {
        console.log("Error while creating user:", error.message);
        res.status(500).json({ message: "Server Error!" })
    }
}

const logInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid Credentials! Email" });

        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                return res.status(400).json({ message: "Invalid Credentials! Password" });
            }
            const token = generateToken(user)
            res.cookie('token', token);
            res.status(200).json({
                message: "User loggedIn", data: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    isAdmin: user.idAdmin
                }
            })
        })
    } catch (error) {
        console.log("Error while user login:", error.message);
        res.status(500).json({ message: "Server Error!" })
    }
}

const logOutUser = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });
        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        console.log("Error while logout user:", error.message);
        res.status(500).json({ message: "Server Error!" })
    }
}

const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ data: req.user })
    } catch (error) {
        console.log("Error while checking the user:", error.message);
        res.status(500).json({ message: "Server Error!" })
    }
}

const allUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ data: users })
    } catch (error) {
        console.log("Error while getting all the users: ", error.message);
    }
}

const dltUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findOneAndDelete({ _id: id })
        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

const newOrder2 = async (req, res) => {
    try {
        const id = "67f4ff742bcc66fc0f491997"
        const foodOrder = [
            { name: 'Burger', price: 50, rating: '4.2' },
            { name: 'Pizza', price: 80, rating: '4.4' },
        ]
        await User.findOneAndUpdate({ _id: id }, { allOrders: foodOrder }, { new: true })
        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ message: "Server Error!" })
    }
}

const newOrder3 = async (req, res) => {
    try {
        const { foodOrder } = req.body;
        const { id } = req.params;

        await User.findByIdAndUpdate(id,
            { $push: { allOrders: { $each: foodOrder } } },
            { new: true }
        );
        res.status(200).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error!" });
    }
};

const newOrder = async (req, res) => {
    try {
        const { items, totalPrice } = req.body;
        const { id } = req.params;

        const newOrderData = {
            orderId: new Date().getTime().toString(),
            orderDate: new Date().toISOString().split('T')[0],
            orderTotalPrice: totalPrice,
            items: items
        };

        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: { allOrders: newOrderData }
        }, { new: true });

        res.status(200).json({ message: "Order placed successfully!", allOrders: updatedUser.allOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error!" });
    }
}


export { signUpUser, logInUser, logOutUser, checkAuth, allUsers, dltUser, newOrder }