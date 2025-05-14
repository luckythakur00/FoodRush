import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    try {
        return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY)
    } catch (error) {
        console.log("Error while generating token:", error.message);
    }
}