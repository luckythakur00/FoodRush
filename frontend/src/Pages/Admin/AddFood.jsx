import { useState } from 'react'
import { useFoodStore } from '../../Store/useFoodStore.js';
import { toast } from 'react-toastify';
import { useRef } from 'react';

function AddFood() {
    const { addNewFood, getAllItems, isSubmited } = useFoodStore();
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        rating: '',
        image: '',
        description: ''
    })
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64Image = reader.result;
            setFormData((prev) => ({ ...prev, image: base64Image }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.type || !formData.price || !formData.rating || !formData.description || !formData.image) {
            return toast.error("Please enter all the details, including the image !!!");
        }

        await addNewFood(formData);
        await getAllItems();
        setFormData({ name: '', type: '', price: '', rating: '', description: '' })
        fileInputRef.current.value = "";
    };

    return (
        <div className='h-full w-full px-10 m-auto' >
            <h1 className='text-lg md:text-2xl mt-4 text-center font-semibold' >Add New Food</h1>
            <div className='flex justify-between items-center' >
                <form onSubmit={handleSubmit} className='h-full w-full lg:w-[50%] flex flex-col justify-center items-center' >
                    <div className='h-full w-full' >
                        <h1 className='text-sm font-semibold mb-1 mt-2' >Food Name</h1>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='Enter food name' className='h-9 sm:h-11 w-full max-w-96 sm:w-96 pl-2 text-xs sm:text-base rounded-md border shadow-sm shadow-black/60 outline-none' />
                    </div>
                    <div className='h-full w-full' >
                        <h1 className='text-sm font-semibold mb-1 mt-2' >Food Type</h1>
                        <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder='Enter food type... Drink, breakfast' className='h-9 sm:h-11 w-full max-w-96 sm:w-96 pl-2 text-xs sm:text-base rounded-md border shadow-sm shadow-black/60 outline-none' />
                    </div>
                    <div className='h-full w-full' >
                        <h1 className='text-sm font-semibold mb-1 mt-2' >Price</h1>
                        <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder='Enter food price' className='h-9 sm:h-11 w-full max-w-96 sm:w-96 pl-2 text-xs sm:text-base rounded-md border shadow-sm shadow-black/60 outline-none' />
                    </div>
                    <div className='h-full w-full' >
                        <h1 className='text-sm font-semibold mb-1 mt-2' >Food Rating</h1>
                        <input type="text" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} placeholder='Enter food rating' className='h-9 sm:h-11 w-full max-w-96 sm:w-96 pl-2 text-xs sm:text-base rounded-md border shadow-sm shadow-black/60 outline-none' />
                    </div>
                    <div className='h-full w-full' >
                        <h1 className='text-sm font-semibold mb-1 mt-2' >Food Description</h1>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Enter food description' className='h-24 sm:h-28 w-full max-w-96 sm:w-96 pl-2 text-xs sm:text-sm rounded-md border border-black/20 shadow-sm shadow-black/60 outline-none'></textarea>
                    </div>
                    <div className='h-full w-full' >
                        <h1 className='text-sm font-semibold mb-1 mt-2' >Food Image</h1>
                        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="w-48 sm:w-96" />
                    </div>
                    <div className='h-full w-full my-3' >
                        <button type='submit' disabled={isSubmited ? true : false} className='h-9 px-4 bg-[#39DB4A] hover:bg-[#31bc3f] text-white rounded-md' >{isSubmited ? "Submiting..." : "Add Food"}</button>
                    </div>
                </form>

                <div className='h-full w-[50%] relative hidden lg:flex flex-col items-center' >
                    <div className='h-20 w-72 bg-orange absolute -top-3 border-t-2 border-t-black  rounded-[80%]' ></div>
                    <h1 className='font-semibold text-center animate-pulse' >Create a new food!</h1>
                </div>
            </div>
        </div>
    )
}

export default AddFood