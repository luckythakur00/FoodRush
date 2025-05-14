import food1 from '../assets/food1.png'
import { useFoodStore } from '../Store/useFoodStore'
import { useNavigate } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useAuthStore } from '../Store/useAuthStore';
import { useModalStore } from '../Store/useModalStore';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function FoodPage() {
    const { openInfoModal } = useModalStore()
    const { authUser } = useAuthStore();
    const { selectedFood, addToCart, showFoodDetail, recomendedFoods, allFoodItems } = useFoodStore();
    const navigate = useNavigate();

    const handleClick = (data) => {
        showFoodDetail(data)
        navigate('/foodPage')
    }
    const handleBuyNow = (data) => {
        if (!authUser) {
            openInfoModal();
            return;
        }
        addToCart(data)
        navigate('/foodCart')
    }

    function RatingStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-400" />); // full star
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />); // half star
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />); // empty star
            }
        }
        return <div className="flex">{stars}</div>;
    }

    return (
        <div className='h-full w-full lg:w-[90%] m-auto pt-10 md:pt-16 px-6 md:px-10 ' >
            <h1 className='mt-8 md:mt-10 lg:ml-20 text-lg md:text-2xl font-semibold mb-2 md:mb-4' >Food Details</h1>
            <div className='h-full w-full sm:flex justify-between' >
                {/* Left Side */}
                <div className='min-h-20 w-full lg:min-h-72  sm:w-[50%] flex justify-center items-center' >
                    <div className='h-full w-full sm:w-[80%] lg:w-[70%] p-4 sm:p-6 border border-black/60' >
                        <img src={selectedFood.image || food1} className='h-full w-full rounded-md' />
                    </div>
                </div>

                {/* Right Side */}
                <div className='h-full w-full sm:w-[50%]' >
                    <h1 className='text-lg md:text-2xl font-semibold' >{selectedFood?.name}</h1>
                    <h1 className='flex justify-start items-center gap-2 text-xs' >{RatingStars(selectedFood?.rating)} <span className='text-sm md:text-lg font-semibold '>({selectedFood?.rating})</span></h1>
                    <div className='my-2' >
                        <h1 className='text-xs font-semibold line-through text-black/60' >MRP: ${selectedFood?.price}</h1>
                        <h1 className='text-sm md:text-lg font-semibold flex' >MRP: ${selectedFood?.price - 14} <span className='text-xs font-semibold ml-2 text-black/60 mb-4 block sm:hidden'>(Inclusive of all texes)</span> </h1>
                        <h1 className='text-xs font-semibold text-black/60 mb-4 hidden sm:block' >(Inclusive of all texes)</h1>
                    </div>
                    <h1 className='font-bold md:font-semibold md:text-lg' >About Product</h1>
                    <li className='text-xs md:text-sm font-semibold text-black/60' >{selectedFood?.type}</li>
                    <li className='text-xs md:text-sm font-semibold text-black/60' >{selectedFood?.description}</li>
                    <div className='h-full w-full flex mt-4' >
                        <button onClick={() => (!authUser ? openInfoModal() : addToCart(selectedFood))} className='h-8 md:h-10 w-[50%] text-sm md:text-base rounded-sm font-semibold bg-gray-300 hover:bg-gray-400 transition-all flex justify-center items-center' >Add to Cart <HiOutlineShoppingCart className='size-5 ml-2' /> </button>
                        <button onClick={() => handleBuyNow(selectedFood)} className='h-8 md:h-10 w-[50%] text-sm md:text-base rounded-sm font-semibold bg-green-300 hover:bg-green-400 transition-all mx-4' >Buy now</button>
                    </div>
                </div>
            </div>

            <h1 className='sm:ml-20 text-xl md:text-2xl font-semibold text-center mt-10'>Related Products</h1>
            {
                <div className='h-full w-full overflow-x-scroll flex justify-start gap-4 sm:my-4 p-4'>
                    {
                        (recomendedFoods.length > 0 ? recomendedFoods : allFoodItems).map(val => (
                            <div key={val._id} className='h-56 min-w-44 md:h-64 md:min-w-52 relative rounded-3xl overflow-hidden bg-[#d8d8d844] shadow-md shadow-black/40' >
                                <div className='h-[65%] cursor-pointer flex justify-center items-center' >
                                    <img src={val.image ? val.image : food1} onClick={() => handleClick(val)} className='h-full w-full object-cover' />
                                </div>
                                <div className='h-[35%] px-4 mt-2 ' >
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <h1 className='text-xs md:text-sm font-bold md:font-semibold' >{val.name.length < 12 ? val.name : val.name.slice(0, 12) + '..'}</h1>
                                            <h1 className='text-xs font-semibold mb-2 text-black/70' >{val.type}</h1>
                                        </div>
                                        <div onClick={() => (!authUser ? openInfoModal() : addToCart(selectedFood))} className='h-6 w-12 md:h-7 md:w-16 cursor-pointer bg-green-400 relative hover:bg-[#39DB4A]/70 transition-all font-bold rounded-md bg-[#39DB4A]/50 text-[#27682e] border-2 border-green-800' >
                                            <button className='h-full w-full text-[#27682e] text-xs md:text-sm ' >ADD</button>
                                            <h1 className='absolute -top-1.5 right-0.5' >+</h1>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center text-xs md:text-sm font-bold' >
                                        <h1>${val.price}</h1>
                                        <h1 className='text-black/75' >*{val.rating}</h1>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default FoodPage