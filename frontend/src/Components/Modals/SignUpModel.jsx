import { useState } from "react";
import { useModalStore } from "../../Store/useModalStore";
import { useAuthStore } from "../../Store/useAuthStore";
import { toast } from "react-toastify";

function SignUpModel() {
    const { signUpModal, openLoginModal, closeSignUpModal } = useModalStore();

    const { signUpUser } = useAuthStore();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.password) {
            return toast.error("All fields are required!")
        }
        if (formData.password.length < 6) {
            return toast.error("Password must be more than 6 characters!");
        }
        signUpUser(formData);
        setFormData({
            fullName: '',
            email: '',
            password: ''
        })
    }

    if (!signUpModal) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="min-h-40 w-[90%] md:w-[70%] lg:w-[50%] flex flex-col sm:flex-row rounded-md overflow-hidden bg-white">
                <div className="sm:w-[50%] px-4 py-6 sm:px-4 md:py-10">
                    <h1 className="text-xl font-semibold mb-4" >Hungerz</h1>
                    <h1 className='text-lg font-bold text-green-600' >Sign Up</h1>
                    <form onSubmit={handleSubmit} className="h-full w-full flex flex-col items-center">
                        <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Name" className="h-11 w-full pl-2 my-1 shadow-sm shadow-black/60 outline-none rounded-md " />
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" className="h-11 w-full pl-2 my-1 shadow-sm shadow-black/60 outline-none rounded-md" />
                        <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Password" className="h-11 w-full pl-2 my-1 shadow-sm shadow-black/60 outline-none rounded-md" />
                        <p className='text-xs my-2 font-semibold text-black/60'>Already have an account? <button type="button" onClick={() => (closeSignUpModal(), openLoginModal())} className="text-blue-600 cursor-pointer" >LogIn Here!</button></p>
                        <div className="w-full flex gap-2 justify-center items-center" >
                            <button type="button" onClick={() => closeSignUpModal()} className="h-9 w-full font-semibold border-2 border-black/40 hover:bg-gray-200 rounded-md">Cancel</button>
                            <button type="submit" className="h-9 w-full font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">SignUp</button>
                        </div>
                    </form>
                </div>

                <div className="sm:w-[50%] hidden sm:block" >
                    <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1050&q=80" alt="Delicious Food" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>
    )

}
export default SignUpModel