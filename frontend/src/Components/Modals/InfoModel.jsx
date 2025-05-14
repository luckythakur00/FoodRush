import { useModalStore } from '../../Store/useModalStore.js';

function InfoModel() {
    const { infoModal, closeInfoModal, openLoginModal } = useModalStore();

    if (!infoModal) return;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="h-40 w-80 bg-white p-6 rounded-md">
                <h1 className='text-lg font-semibold' >This feature isn't available.</h1>
                <p className='text-sm font-semibold text-black/60'>Log in or Sign up to use all features!</p>
                <div className='mt-4 flex gap-2' >
                    <button onClick={() => closeInfoModal()} className="h-8 px-4 text-sm font-semibold bg-gray-300 hover:bg-gray-400 text-black rounded-md">Cancel</button>
                    <button onClick={() => (closeInfoModal(), openLoginModal())} className="h-8 px-4 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-md">LogIn</button>
                </div>
            </div>
        </div>
    );
}

export default InfoModel;