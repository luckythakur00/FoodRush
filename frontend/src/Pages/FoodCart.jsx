import food1 from '../assets/food1.png'
import { useFoodStore } from '../Store/useFoodStore'
import { GiRiceCooker } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../assets/Cart.webp';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuthStore } from '../Store/useAuthStore';
import { useModalStore } from '../Store/useModalStore';

function FoodCart() {
    const { orderFood, checkAuth, authUser } = useAuthStore();
    const { orderItems, removeCartItems, totalPrice, increaseQuantity, decreaseQuantity, addToCart, allFoodItems, showFoodDetail, selectedFood } = useFoodStore();
    const { openInfoModal } = useModalStore();

    const navigate = useNavigate();
    const handleClick = (data) => {
        showFoodDetail(data)
        navigate('/foodPage')
    }

    const handlePlaceOrder = async () => {
        await orderFood(orderItems, totalPrice)
        await checkAuth()
    }

    return (
        <div className='min-h-[90vh] w-full lg:w-[90%] relative m-auto mb-10 pt-14' >
            <div className='h-full w-full flex flex-col md:flex-row'>
                <div className='h-full w-full md:w-[70%] flex flex-col gap-4' >
                    {
                        orderItems?.length > 0 ? <>
                            <h1 className='text-lg sm:text-2xl font-semibold text-black ml-[10%] pt-12' >Product Details <span className='text-sm sm:text-base text-green-600' >{orderItems.length} items</span> </h1>
                            <div className='max-h-[70vh] w-full pb-4 sm:py-0 overflow-y-scroll hidden sm:flex justify-center flex-wrap gap-4 ' >
                                {
                                    orderItems.map(val => (
                                        <>
                                            <div key={val._id} className='h-32 w-[80%] ml-[10%] hidden sm:flex justify-between items-center border-b border-b-black/40 overflow-hidden' >
                                                <div className='h-[80%] w-[40%] mr-4 flex justify-start items-start gap-4' >
                                                    <img src={val.image ? val.image : food1} onClick={() => handleClick(val)} className='h-full w-[50%] rounded-md cursor-pointer object-cover' />
                                                    <h1 className='font-semibold pt-4 flex flex-col' >{val.name} <span className='text-black/60 text-xs font-bold' >({val.type})</span></h1>
                                                </div>
                                                <div className='h-8 w-20 text-xs flex justify-center items-center font-semibold rounded-full mx-2 border-2 border-black' >
                                                    <button disabled={val.quantity === 1 ? true : false} onClick={() => decreaseQuantity(val)} className='h-full w-[40%] mb-2 text-2xl font-bold ' >-</button>
                                                    <h1 className='h-full w-[20%] flex justify-center items-center cursor-auto ' >{val.quantity}</h1>
                                                    <button onClick={() => increaseQuantity(val)} className='h-full w-[40%] mb-1 text-xl font-semibold  ' >+</button>
                                                </div>
                                                <h1 className='font-bold text-black/75' >${val.price}</h1>
                                                <button onClick={() => removeCartItems(val)} className='h-6 w-6 font-semibold text-sm border-2 border-red-800 bg-red-500 hover:bg-red-600 text-white rounded-full' >X</button>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                            <div className='max-h-[70vh] w-full pb-4 px-2 overflow-y-scroll sm:hidden flex justify-center flex-wrap gap-4 ' >
                                {
                                    orderItems.map(val => (
                                        <>
                                            <div key={val._id} className='h-52 w-36 relative block sm:hidden rounded-xl overflow-hidden shadow-md shadow-black/40' >
                                                <div className='h-[65%] cursor-pointer flex justify-center items-center' >
                                                    <img src={val.image ? val.image : food1} onClick={() => handleClick(val)} className='h-full w-full object-cover' />
                                                </div>
                                                <div className='h-[35%] px-2 mt-1 ' >
                                                    <div className='flex justify-between items-center'>
                                                        <div className='text-start' >
                                                            <h1 className='text-xs font-bold' >{val.name.length < 9 ? val.name : val.name.slice(0, 9) + '..'}</h1>
                                                            <h1 className='text-xs font-semibold mb-2 text-black/70' >{val.type}</h1>
                                                        </div>
                                                        <div className='h-6 w-14 text-xs flex justify-center items-center font-semibold rounded-full border border-black' >
                                                            <button disabled={val.quantity === 1 ? true : false} onClick={() => decreaseQuantity(val)} className='h-full w-[40%] mb-4 text-2xl font-semibold ' >-</button>
                                                            <h1 className='h-full w-[20%] flex justify-center items-center cursor-auto ' >{val.quantity}</h1>
                                                            <button onClick={() => increaseQuantity(val)} className='h-full w-[40%] mb-3 text-xl font-semibold  ' >+</button>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between items-center text-xs font-bold' >
                                                        <h1>${val.price}</h1>
                                                        <button onClick={() => removeCartItems(val)} className='h-5 w-5 font-semibold text-xs border-2 border-red-800 bg-red-500 hover:bg-red-600 text-white rounded-full' >X</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                            <Link to={'/menu'} className='w-44 font-semibold ml-[10%] flex justify-start items-center gap-2 text-blue-600'><FaArrowLeft /> Continue Shopping</Link>
                        </> :
                            <div className='w-[95vw] lg:w-[90vw] ml-[2.5vw] lg:ml-0 text-center'>
                                <img src={Cart} className='h-40 w-60 md:h-44 md:w-64 m-auto object-cover animate-pulse' />
                                <h1 className='text-lg md:text-xl font-semibold'>Your cart is empty!</h1>
                                <p className='text-xs md:text-sm font-semibold text-black/60' >Looks like you haven't added anything yet.</p>
                                <div>
                                    <Link to={'/'} ><button className='h-8 w-28 md:h-10 md:w-32 mt-4 font-semibold text-xs md:text-sm rounded-full border-2 border-black mx-2 hover:bg-gray-200' >Back to Home</button></Link>
                                    <Link to={'/menu'}><button className='h-8 w-28 md:h-10 md:w-32 mt-4 font-semibold text-xs md:text-sm rounded-full border-2 border-green-800 bg-green-400 hover:bg-green-500 mx-2' >Go to Menu</button></Link>
                                </div>
                                <div className='mt-12' >
                                    <h1 className='md:text-xl font-semibold text-red-500 text-start pl-4' >Maybe you’ll love these:</h1>
                                    <div className='h-full w-full overflow-x-scroll flex justify-start gap-4 p-4'>
                                        {
                                            (allFoodItems.slice(0, 10)).map(val => (
                                                <div key={val._id} className='h-52 min-w-36 sm:h-56 sm:min-w-44 md:h-64 md:min-w-52 relative rounded-md sm:rounded-xl md:rounded-3xl overflow-hidden bg-[#d8d8d844] shadow-md shadow-black/40' >
                                                    <div className='h-[65%] cursor-pointer flex justify-center items-center' >
                                                        <img src={val.image ? val.image : food1} onClick={() => handleClick(val)} className='h-full w-full object-cover' />
                                                    </div>
                                                    <div className='h-[35%] px-4 mt-2 ' >
                                                        <div className='flex justify-between items-center'>
                                                            <div className='text-start' >
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
                                </div>
                            </div>
                    }
                </div>
                {
                    orderItems.length > 0 &&
                    <div className='w-full md:w-[30%] flex justify-center items-center' >
                        <div className='min-h-96 w-80 mt-4 md:mt-20 md:mr-4 lg:mr-0 rounded-md p-4 bg-[#e4e4e4] shadow-sm shadow-black/60' >
                            <h1 className='text-2xl font-semibold mb-2' >Order Summary</h1>
                            <hr className='h-0.5 bg-black/60' />
                            <h1 className='font-semibold mb-2 flex justify-between' >Total Items: <span className='text-black/70 font-semibold' >{orderItems.length}</span></h1>
                            <div className='my-4 ' >
                                <h1 className='font-semibold ' >PAYMENT METHOD</h1>
                                <select className='h-9 w-full rounded-md border-none outline-none cursor-pointer font-semibold text-sm' >
                                    <option value="">Cash On Delivery</option>
                                    <option value="">Online Payment</option>
                                </select>
                            </div>
                            <h1 className='font-bold' >Price Detials:</h1>
                            {
                                orderItems.length > 0 && orderItems.map(val => (
                                    <div key={val._id}>
                                        <h1 className='font-semibold  flex justify-between' >{val.name}: <span className='text-black/70 font-semibold ml-2' > ${val.price} * {val.quantity} = {val.price * val.quantity}</span></h1>
                                    </div>
                                ))
                            }
                            <hr className='h-0.5 bg-black/60' />
                            <div>
                                <h1 className='font-semibold flex justify-between' >Sub Price: <span className='text-black/70 font-semibold' >${totalPrice}</span></h1>
                                <h1 className='font-semibold flex justify-between' >Offer <span className='text-black/70 font-semibold' >$50</span></h1>
                                <h1 className='font-semibold flex justify-between' >Shipping Fee <span className='text-green-600 font-bold' >Free</span></h1>
                                <h1 className='font-semibold flex justify-between' >Total Price: <span className='text-black/70 font-semibold' >${totalPrice - 50}</span></h1>
                            </div>
                            <button onClick={handlePlaceOrder} className='h-10 w-full flex justify-center items-center font-semibold rounded-md mt-2 bg-[#39DB4A] hover:bg-[#31bc3f]' >Place Order <span><GiRiceCooker size={20} className='ml-2 animate-pulse' /></span> </button>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default FoodCart