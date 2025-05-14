import { useEffect, useState } from 'react'
import { useFoodStore } from '../../Store/useFoodStore.js';
import DeleteModel from '../../Components/Modals/DeleteModel.jsx';

function FoodBoard() {
    const { allFoodItems, getAllItems, editFoodItem } = useFoodStore();
    const [search, setSearch] = useState('');
    const [updatedFood, setUpdatedFood] = useState([]);
    const [editId, setEditId] = useState('');
    const [editedFood, setEditedFood] = useState({});
    const [isModel, setIsModel] = useState(false);
    const [foodId, setFoodId] = useState();

    useEffect(() => {
        const data = allFoodItems.filter(val => val.name.toLowerCase().includes(search.toLowerCase()) || val.type.toLowerCase().includes(search.toLowerCase()));
        setUpdatedFood(data)
    }, [search, allFoodItems])

    const handleSave = async (id) => {
        setEditId('');
        await editFoodItem(editedFood, id)
        await getAllItems();
    }

    return (
        <div className='h-full w-full px-10' >
            <div className='h-full w-full p-6 ' >
                <h1 className='text-4xl font-semibold' >Admin</h1>
                {/* Top section */}
                <div className='flex justify-start items-center gap-4 mt-10 mb-4' >
                    <h1>Type: </h1>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search name or type' className='h-10 w-80 pl-2 rounded-md border outline-none shadow-sm shadow-black/30' />
                </div>

                <div className="max-h-[82%] overflow-y-auto border border-gray-300 rounded-md">
                    <table className=" min-w-full table-auto bg-white">
                        <thead className="sticky top-0 bg-white z-10">
                            <tr>
                                <th className="w-20 text-sm p-2 border-b border-r">Sr. No.</th>
                                <th className="w-96 p-2 border-b border-r">Name</th>
                                <th className="w-96 p-2 border-b border-r">Type</th>
                                <th className="w-96 p-2 border-b border-r">Price</th>
                                <th className="w-96 p-2 border-b border-r">Rating</th>
                                <th className="w-96 p-2 border-b border-r">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (search ? updatedFood : allFoodItems).map((food, ind) => (
                                    <tr key={food._id}>
                                        <td className="w-20 p-2 px-4 text-center border-b border-r">{ind + 1}.</td>
                                        <td className='w-96 border-b border-r"' >
                                            <input readOnly={editId !== food._id} value={editId === food._id ? editedFood.name ?? food.name : food.name} onChange={(e) => setEditedFood({ ...editedFood, name: e.target.value })} className={`h-9 rounded-md pl-2 outline-none ${editId === food._id ? 'border-2 border-black/30' : ''}`} />
                                        </td>
                                        <td className='w-96 border-b border-r"' >
                                            <input readOnly={editId !== food._id} value={editId === food._id ? editedFood.type ?? food.type : food.type} onChange={(e) => setEditedFood({ ...editedFood, type: e.target.value })} className={`h-9 rounded-md pl-2 outline-none ${editId === food._id ? 'border-2 border-black/30' : ''}`} />
                                        </td>
                                        <td className='w-96 border-b border-r"' >
                                            <input readOnly={editId !== food._id} value={editId === food._id ? editedFood.price ?? food.price : food.price} onChange={(e) => setEditedFood({ ...editedFood, price: e.target.value })} className={`h-9 rounded-md pl-2 outline-none ${editId === food._id ? 'border-2 border-black/30' : ''}`} />
                                        </td>
                                        <td className='w-96 border-b border-r"' >
                                            <input readOnly={editId !== food._id} value={editId === food._id ? editedFood.rating ?? food.rating : food.rating} onChange={(e) => setEditedFood({ ...editedFood, rating: e.target.value })} className={`h-9 rounded-md pl-2 outline-none ${editId === food._id ? 'border-2 border-black/30' : ''}`} />
                                        </td>
                                        <td className="w-96 border-b border-r font-semibold">
                                            <button onClick={editId === food._id ? () => handleSave(food._id) : () => setEditId(food._id)} className={`${editId === food._id ? 'text-yellow-500 hover:text-yellow-600' : 'text-blue-500 hover:text-blue-700'} mr-2`}>{editId === food._id ? 'Save' : 'Edit'}</button>
                                            <button onClick={() => { setIsModel(true), setFoodId(food._id) }} className="text-red-500 hover:text-red-700">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            <DeleteModel isModel={isModel} setIsModel={setIsModel} foodId={foodId} />
        </div >
    )
}

export default FoodBoard