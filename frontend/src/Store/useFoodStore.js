import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useFoodStore = create((set, get) => ({
    allFoodItems: [],
    orderItems: [],
    totalPrice: 0,
    isSubmited: false,
    selectedFood: {},
    recomendedFoods: [],

    showFoodDetail: async (foodData) => {
        try {
            const response = await axiosInstance.get(`/food/relatedFood/${foodData.type}`)
            const allRecomendedFoods = response.data.data.filter(val => val._id !== foodData._id)
            set({ recomendedFoods: allRecomendedFoods });
            set({ selectedFood: foodData })
        } catch (error) {
            console.log(error.message);
        }
    },

    addNewFood: async (formData) => {
        set({ isSubmited: true });
        try {
            const response = await axiosInstance.post('/food/addItem', formData);
            set({ isSubmited: false });
            toast.success(response?.data?.message);
        } catch (error) {
            set({ isSubmited: false });
            toast.error(error?.response?.data?.message);
        }
    },
    getAllItems: async () => {
        try {
            const response = await axiosInstance.get('/food/getItems');
            set({ allFoodItems: response?.data?.data })
        } catch (error) {
            console.log("Error while getting all the fodds: ", error.message);
        }
    },
    addToCart: async (foodDetail) => {
        try {
            const { orderItems, totalPrice } = get();
            const alreadyExists = orderItems.some(val => val._id === foodDetail._id)
            if (alreadyExists) {
                return toast.warn("Already addded!")
            }
            set({ orderItems: [...orderItems, { ...foodDetail, quantity: 1 }] })
            set({ totalPrice: totalPrice + foodDetail.price })
            toast.success("Food added to cart!")
        } catch (error) {
            console.log("Error while adding food to cart:", error.message);
        }
    },
    removeCartItems: (foodDetail) => {
        try {
            const { orderItems, totalPrice } = get();
            const updatedorderItems = orderItems.filter(val => val._id !== foodDetail._id)
            toast.success("Food removed succeffully!");
            set({ totalPrice: totalPrice - foodDetail.price * foodDetail.quantity })
            set({ orderItems: updatedorderItems })
        } catch (error) {
            console.log("ERROR here in remove items: ", error.message);
        }
    },
    increaseQuantity: (foodDetail) => {
        try {
            const { orderItems, totalPrice } = get();
            const updatedItems = orderItems.map(val => val._id === foodDetail?._id ? { ...val, quantity: val.quantity + 1 } : val);
            set({ orderItems: updatedItems })
            set({ totalPrice: totalPrice + foodDetail?.price })
        } catch (error) {
            console.log("Error in Increase quantity: ", error.message);
        }
    },
    decreaseQuantity: (foodDetail) => {
        try {
            const { orderItems, totalPrice } = get();
            const updatedItems = orderItems.map(val => val._id === foodDetail._id ? { ...val, quantity: val.quantity - 1 } : val)
            set({ orderItems: updatedItems })
            set({ totalPrice: totalPrice - foodDetail.price })
        } catch (error) {
            console.log("Error in decrease quantity: ", error.message);
        }
    },

    deleteFoodItem: async (foodId) => {
        try {
            const response = await axiosInstance.delete(`/food/dltItem/${foodId}`);
            toast.success(response.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        }
    },
    editFoodItem: async (foodData, id) => {
        try {
            const response = await axiosInstance.post(`/food/updateItem/${id}`, foodData);
            toast.success(response?.data?.message);
        } catch (error) {
            console.log("Error while editing food detial: ", error.response.data.message);
        }
    }

}))