import { useFoodStore } from '../../Store/useFoodStore';
import { useAuthStore } from '../../Store/useAuthStore';

function DeleteModel({ isModel, setIsModel, foodId, userId }) {
    const { deleteFoodItem, getAllItems } = useFoodStore()
    const { deleteUser, getAllUsers } = useAuthStore();

    const handleDelete = async () => {
        if (foodId) {
            await deleteFoodItem(foodId);
            await getAllItems();
        }
        if (userId) {
            await deleteUser(userId);
            await getAllUsers();
        }
        setIsModel(false);
    };

    if (!isModel) return;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="h-32 w-64 md:h-40 md:w-80 bg-white p-4 md:p-6 rounded-md">
                <h1 className=' md:text-lg font-semibold' >Confirm Deletion</h1>
                <p className='text-xs md:text-sm font-semibold text-black/60'>This operation is permanent and cannot be reversed.</p>
                <div className='mt-3 md:mt-4 flex gap-2' >
                    <button onClick={() => setIsModel(false)} className="h-7 md:h-8 px-2 md:px-4 text-xs md:text-sm font-semibold bg-gray-300 hover:bg-gray-400 text-black rounded-md">Cancel</button>
                    <button onClick={() => handleDelete()} className="h-7 md:h-8 px-2 md:px-4 text-xs md:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModel;