import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { useModalStore } from './useModalStore';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    allUsers: [],
    userOrder: [],

    signUpUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/user/signUp', userData);
            toast.success(response?.data?.data);
            const closeSignUpModal = useModalStore.getState().closeSignUpModal;
            closeSignUpModal();
            set({ authUser: response?.data?.data });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    },
    logInUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/user/logIn', userData);
            toast.success(response?.data?.data?.message);
            const closeLoginModal = useModalStore.getState().closeLoginModal;
            closeLoginModal();
            set({ authUser: response?.data?.data });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    },
    logOutUser: async () => {
        try {
            const response = await axiosInstance.get('/user/logOut')
            toast.success(response?.data?.message);
            set({ authUser: null });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    },
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/user/checkAuth');
            set({ authUser: response?.data?.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error.response.data.message);
        }
    },
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/user/allUsers');
            set({ allUsers: response?.data?.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error.response.data.message);
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await axiosInstance.delete(`/user/dltUser/${userId}`);
            toast.success(response.data.message)
        } catch (error) {
            console.log("Error while deleting user: ", error.response.data.message);
        }
    },

    orderFood: async (items, totalPrice) => {
        try {
            const { authUser } = get();
            const response = await axiosInstance.post(`/user/newOrder/${authUser._id}`, { items, totalPrice })
            toast.success(response.data.message);
            set({ userOrder: response.data.allOrders })
        } catch (error) {
            console.log(error.message);
        }
    }

}))