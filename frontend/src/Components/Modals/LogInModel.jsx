import { useState } from "react";
import { useModalStore } from "../../Store/useModalStore";
import { toast } from "react-toastify";
import { useAuthStore } from "../../Store/useAuthStore";
import foodImage from '../../assets/food.avif'

function LogInModel() {
    const { loginModal, closeLoginModal, openSignUpModal } = useModalStore();
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const { logInUser } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userEmail || !userPassword) {
            return toast.error("All fields are required!")
        }
        await logInUser({ email: userEmail, password: userPassword });
        setUserEmail('')
        setUserPassword('')
    }

    if (!loginModal) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="min-h-40 w-[90%] md:w-[70%] lg:w-[50%] flex flex-col sm:flex-row rounded-md overflow-hidden bg-white">
                <div className="sm:w-[50%] px-4 py-6 sm:px-4 md:py-10">
                    <h1 className="text-xl font-semibold mb-4" >Hungerz</h1>
                    <h1 className='text-lg font-bold text-green-600' >Log in</h1>
                    <form onSubmit={handleSubmit} className="h-full w-full flex flex-col items-center">
                        <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Email Address" className="h-11 w-full pl-2 my-1  shadow-sm shadow-black/60 outline-none rounded-md" />
                        <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="Password" className="h-11 w-full pl-2 my-1  shadow-sm shadow-black/60 outline-none rounded-md" />
                        <p className='text-xs mt-2 font-semibold text-black/60'>Don't have an account? <button type="button" onClick={() => (openSignUpModal(), closeLoginModal())} className="text-blue-600" >SignUp Here!</button></p>
                        <p className='text-xs mb-2 font-semibold text-black/60'>Forget <span className="text-blue-600 cursor-pointer" >Password?!</span></p>
                        <div className="w-full flex gap-2 justify-center items-center" >
                            <button type="button" onClick={() => closeLoginModal()} className="h-9 w-full font-semibold border-2 border-black/40 hover:bg-gray-200 rounded-md">Cancel</button>
                            <button type="submit" className="h-9 w-full font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">LogIn</button>
                        </div>
                    </form>
                </div>

                <div className="sm:w-[50%] hidden sm:block" >
                    <img src={foodImage} alt="Delicious Food" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>
    )
}
export default LogInModel