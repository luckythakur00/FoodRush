import { create } from 'zustand';

export const useModalStore = create((set, get) => ({
    loginModal: false,
    signUpModal: false,
    infoModal: false,
    deleteModal: false,
    orderModel: false,
    selectedOrderId: '',

    openLoginModal: () => set({ loginModal: true }),
    closeLoginModal: () => set({ loginModal: false }),

    openSignUpModal: () => set({ signUpModal: true }),
    closeSignUpModal: () => set({ signUpModal: false }),

    openInfoModal: () => set({ infoModal: true }),
    closeInfoModal: () => set({ infoModal: false }),

    openDeleteModal: () => set({ deleteModal: true }),
    closeDeleteModal: () => set({ deleteModal: false }),

    openOrderModal: (orderId) => {
        set({ orderModel: true })
        set({ selectedOrderId: orderId })
    },
    closeOrderModal: () => set({ orderModel: false }),
}));