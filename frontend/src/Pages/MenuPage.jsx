import { useState } from 'react'
import food1 from '../assets/food1.png'
import Drinks from '../assets/food4.png'
import desert from '../assets/Chocolate Cake.png'
import veg from '../assets/veg.png'
import NonVeg from '../assets/NonVeg.png'
import { useFoodStore } from '../Store/useFoodStore'
import { FaArrowLeft, FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../Store/useAuthStore'
import { useModalStore } from '../Store/useModalStore'

function MenuPage() {
    const { openInfoModal } = useModalStore();
    const { authUser } = useAuthStore();
    const { allFoodItems, addToCart, showFoodDetail } = useFoodStore();
    const [selectedType, setSelectedType] = useState('');
    const [searchedFood, setSearchedFood] = useState('');

    const location = useLocation();;
    const navigate = useNavigate()

    const allFilteredFood = allFoodItems.filter(val => {
        const matchesType = selectedType === "All" || selectedType === '' || val.type === selectedType;
        const matchesSearch = searchedFood === '' || val.name.trim().toLowerCase().includes(searchedFood.trim().toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleClick = (data) => {
        showFoodDetail(data)
        navigate('/foodPage')
    }

    return (
        <div className={`min-h-[93vh] w-full lg:w-[90%] m-auto mb-10 pt-16 px-6 md:px-10 ${window.location.pathname.startsWith('/menu') ? 'pt-16' : 'pt-0'}`} >
            {/* Favourite */}
            <div className='relative' >
                <h1 className='text-center text-sm lg:text-base font-bold pb-2 text-red-400' >Customer Favourite</h1>
                <h1 className='text-2xl lg:text-4xl text-center font-semibold mb-10 '>Popular Catagories</h1>
                {
                    location.pathname === '/menu' &&
                    <div className='absolute top-2 right-0 hidden lg:flex justify-between items-center h-10 w-80 rounded-md overflow-hidden shadow-sm shadow-black/50' >
                        <input type="text" value={searchedFood} onChange={(e) => setSearchedFood(e.target.value)} required placeholder='Search here' className='h-full w-[90%] pl-2 border-none outline-none' />
                        <button className='w-[10%] flex justify-center'><FaSearch /></button>
                    </div>
                }

                {/* Upper Main Foods */}
                <div className='m-auto flex flex-wrap gap-4 justify-center items-center' >
                    <div onClick={() => setSelectedType("All")} className={`box ${selectedType === "All" ? "bg-slate-200" : ''} h-40 w-32 sm:h-44 sm:w-36 md:h-48 md:min-w-40 lg:h-56 lg:min-w-48 rounded-md sm:rounded-3xl bg-[#d8d8d844] hover:bg-slate-200 cursor-pointer shadow-md shadow-black/40`} >
                        <div className='h-[70%] flex justify-center items-center' >
                            <img src={food1} className='h-20 w-20 md:h-26 md:w-26 lg:h-28 lg:w-28 object-cover rounded-full' />
                        </div>
                        <div className='h-[30%] text-center ' >
                            <h1 className='font-semibold text-sm lg:text-base' >All</h1>
                            <p className='font-semibold text-xs lg:text-sm text-black/70' >{allFoodItems?.length > 1 ? allFoodItems.length - 4 : 0} Dishes <span className='text-red-400'>{`${allFoodItems.length > 0 ? `(4 new)` : ''} `}</span></p>
                        </div>
                    </div>
                    <div onClick={() => setSelectedType("Veg")} className={`box ${selectedType === "Veg" ? "bg-slate-200" : ''} h-40 w-32 sm:h-44 sm:w-36 md:h-48 md:min-w-40 lg:h-56 lg:min-w-48 rounded-md sm:rounded-3xl bg-[#d8d8d844] hover:bg-slate-200 cursor-pointer shadow-md shadow-black/40`} >
                        <div className='h-[70%] flex justify-center items-center' >
                            <img src={veg} className='h-20 w-20 md:h-26 md:w-26 lg:h-28 lg:w-28 object-cover rounded-full' />
                        </div>
                        <div className='h-[30%] text-center ' >
                            <h1 className='font-semibold text-sm lg:text-base' >Vegetarian</h1>
                            <p className='font-semibold text-xs lg:text-sm text-black/70' >{allFoodItems?.filter(val => val.type === "Veg").length || 0} Dishes</p>
                        </div>
                    </div>
                    <div onClick={() => setSelectedType("Non-Veg")} className={`box ${selectedType === "Non-Veg" ? "bg-slate-200" : ''} h-40 w-32 sm:h-44 sm:w-36 md:h-48 md:min-w-40 lg:h-56 lg:min-w-48 rounded-md sm:rounded-3xl bg-[#d8d8d844] hover:bg-slate-200 cursor-pointer shadow-md shadow-black/40`} >
                        <div className='h-[70%] flex justify-center items-center' >
                            <img src={NonVeg} className='h-20 w-20 md:h-26 md:w-26 lg:h-28 lg:w-28 object-cover rounded-full' />
                        </div>
                        <div className='h-[30%] text-center ' >
                            <h1 className='font-semibold text-sm lg:text-base' >Non-Vegetarian</h1>
                            <p className='font-semibold text-xs lg:text-sm text-black/70' >{allFoodItems?.filter(val => val.type === "Non-Veg").length || 0} Dishes</p>
                        </div>
                    </div>
                    <div onClick={() => setSelectedType("Drink")} className={`box ${selectedType === "Drink" ? "bg-slate-200" : ''} h-40 w-32 sm:h-44 sm:w-36 md:h-48 md:min-w-40 lg:h-56 lg:min-w-48 rounded-md sm:rounded-3xl bg-[#d8d8d844] hover:bg-slate-200 cursor-pointer shadow-md shadow-black/40`} >
                        <div className='h-[70%] flex justify-center items-center' >
                            <img src={Drinks} className='h-20 w-20 md:h-26 md:w-26 lg:h-28 lg:w-28 object-cover rounded-full' />
                        </div>
                        <div className='h-[30%] text-center ' >
                            <h1 className='font-semibold text-sm lg:text-base' >Drinks</h1>
                            <p className='font-semibold text-xs lg:text-sm text-black/70' >{allFoodItems?.filter(val => val.type === "Drink").length || 0} Drinks</p>
                        </div>
                    </div>
                    <div onClick={() => setSelectedType("Dessert")} className={`box ${selectedType === "Dessert" ? "bg-slate-200" : ''} h-40 w-32 sm:h-44 sm:w-36 md:h-48 md:min-w-40 lg:h-56 lg:min-w-48 rounded-md sm:rounded-3xl bg-[#d8d8d844] hover:bg-slate-200 cursor-pointer shadow-md shadow-black/40`} >
                        <div className='h-[70%] flex justify-center items-center' >
                            <img src={desert} className='h-20 w-20 md:h-26 md:w-26 lg:h-28 lg:w-28 object-center rounded-full' />
                        </div>
                        <div className='h-[30%] text-center ' >
                            <h1 className='font-semibold text-sm lg:text-base' >Dessert</h1>
                            <p className='font-semibold text-xs lg:text-sm text-black/70' >{allFoodItems?.filter(val => val.type === "Dessert").length || 0} Desserts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Dishes */}
            <div >
                <h1 className='mt-14  lg:mb-4 font-semibold text-red-400' >Special Dishes</h1>
                <h1 className='text-xl md:text-3xl lg:text-4xl font-semibold '>Standout Dishes <br /> From Our Menu</h1>

                <div className='flex flex-wrap justify-center gap-2 sm:gap-4 my-10' >
                    {
                        allFilteredFood?.length > 0 && <>
                            {
                                (location.pathname === '/' ? allFilteredFood.slice(0, 20) : allFilteredFood).map(val => (
                                    <div key={val._id} className='h-52 w-36 sm:h-60 sm:w-48 lg:h-80 lg:w-60 relative rounded-md sm:rounded-3xl overflow-hidden bg-[#d8d8d844] shadow-md shadow-black/40' >
                                        <div className='h-[65%] lg:h-[70%] cursor-pointer flex justify-center items-center' >
                                            <img src={val.image ? val.image : food1} onClick={() => handleClick(val)} className='h-full w-full object-cover' />
                                        </div>
                                        <div className='h-[35%] lg:h-[30%] px-2 sm:px-4 mt-2 ' >
                                            <div className='flex justify-between items-center'>
                                                <div>
                                                    <h1 className='font-semibold text-xs sm:text-base' >{val.name.length < 12 ? val.name : val.name.slice(0, 12) + '..'}</h1>
                                                    <h1 className='font-semibold text-xs mb-2 text-black/70' >{val.type}</h1>
                                                </div>
                                                <div onClick={() => (!authUser ? openInfoModal() : addToCart(val))} className='h-5 w-10 sm:h-7 sm:w-14 lg:h-8 lg:w-20 cursor-pointer bg-green-400 relative hover:bg-[#39DB4A]/70 transition-all font-bold rounded-md bg-[#39DB4A]/50 text-[#27682e] border-2 border-green-800' >
                                                    <button className='h-full w-full absolute sm:static text-[10px] sm:text-xs pr-1 sm:pr-0 lg:text-base text-[#27682e] ' >ADD</button>
                                                    <h1 className='absolute -top-0.5 right-0.5 sm:-top-1 sm:right-1 text-xs sm:text-sm lg:text-base' >+</h1>
                                                </div>
                                            </div>
                                            <div className='flex justify-between items-center text-xs lg:text-base font-semibold' >
                                                <h1 className='font-bold' >${val.price}</h1>
                                                <h1 className='font-bold text-black/75' >*{val.rating}</h1>
                                            </div>
                                        </div>
                                        <div className='h-6 w-8 lg:h-10 lg:w-12 rounded-bl-[70%] lg:rounded-bl-3xl flex justify-center items-center absolute top-0 right-0 bg-[#39DB4A] ' >
                                            <h1 className='text-xl lg:text-3xl' >*</h1>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    }
                </div>
                <button onClick={() => (!authUser ? openInfoModal() : navigate('/menu'))} className={`w-40 text-blue-600 ${location.pathname === '/menu' ? ' hidden' : ''} cursor-pointer font-semibold flex items-center gap-1`} ><FaArrowLeft /> Show more items</button>
            </div>
        </div>
    )
}

export default MenuPage