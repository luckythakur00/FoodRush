import { useAuthStore } from '../Store/useAuthStore';
import food1 from '../assets/food1.png'
import { useState } from "react";
import { useModalStore } from '../Store/useModalStore';

function UserOrderPage() {
    const { authUser } = useAuthStore();
    const { openOrderModal } = useModalStore();
    const [showHistory, setShowHistory] = useState(false);

    const latestOrder = authUser?.allOrders?.[authUser?.allOrders?.length - 1]
    const orderHistory = authUser?.allOrders;

    return (
        <div className='h-full w-[95%] md:w-[90%] m-auto py-20 ' >
            {/* LEFT SIDE */}
            <div className='' >
                <button onClick={() => setShowHistory(false)} className={`h-9 px-4 mr-2 ${!showHistory ? 'bg-gray-200' : ''} rounded-md border border-black/60`} >Latest Order</button>
                <button onClick={() => setShowHistory(true)} className={`h-9 px-4 mr-2 ${showHistory ? 'bg-gray-200' : ''} rounded-md border border-black/60`} >Order History</button>
            </div>

            {/* Right SIDE */}
            <div>
                {/* Latest ORDER */}
                {
                    !showHistory ? <>
                        <h1 className='text-2xl font-semibold my-6' >Latest ORDER</h1>
                        <div className='hidden sm:block'>
                            {
                                latestOrder &&
                                <div key={latestOrder.orderId} className='h-full w-full lg:w-[80%] p-4 border-2 border-black/60 rounded-md' >
                                    <div className='h-full w-full md:w-[90%] m-auto flex justify-between items-center' >
                                        <h1 className='w-[40%] '>OrderId: {latestOrder?.orderId}</h1>
                                        <h1 className='w-[30%] '>Payment: COD</h1>
                                        <h1 className='w-[30%] '>Total Amount: <span className='line-through text-sm font-semibold'>${latestOrder.orderTotalPrice}</span> <span className='ml-1 font-bold text-xl'>${latestOrder.orderTotalPrice > 100 && latestOrder.orderTotalPrice - 50}</span></h1>
                                    </div>
                                    {
                                        latestOrder?.items?.map(val => (
                                            <div key={val.orderId} className='h-32 w-full md:w-[90%] m-auto flex justify-around items-center border-b border-b-black/40 overflow-hidden' >
                                                <div className='h-[80%] w-[40%] mr-4 flex justify-start items-start gap-4' >
                                                    <img src={val.image ? val.image : food1} className='h-full w-[50%] md:w-[40%] rounded-md cursor-pointer object-cover' />
                                                    <h1 className='font-semibold pt-4 flex flex-col' >{val.name} <span className='text-black/60 text-xs font-bold' >({val.type})</span></h1>
                                                </div>
                                                <div className='w-[30%] ' >
                                                    <h1 className='flex justify-start items-center cursor-auto text-sm font-semibold' >Quantity: <span className='text-black/70 pl-1'>{val.quantity}</span></h1>
                                                    <h1 className='flex justify-start items-center cursor-auto text-sm font-semibold ' >Status: <span className='text-black/70 pl-1'>Order Placed</span></h1>
                                                    <h1 className='flex justify-start items-center cursor-auto text-sm font-semibold' >Date: <span className='text-black/70 pl-1'>{latestOrder.orderDate}</span></h1>
                                                </div>
                                                <h1 className='w-[30%] font-semibold' >Amount: <span className='text-black/70 pl-1'>${val.price}</span></h1>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        <div className='block sm:hidden'>
                            {
                                latestOrder &&
                                <div key={latestOrder.orderId} className='min-h-40 w-80 p-2 m-auto shadow-md shadow-black/60 cursor-pointer rounded-md' >
                                    <div className='w-[90%] pl-2' >
                                        <h1 className='text-sm font-semibold '>OrderId: <span className='text-xs'>{latestOrder?.orderId}</span></h1>
                                        <h1 className='text-xs font-semibold text-black/60 '>Date: {latestOrder.orderDate}</h1>
                                        <h1 className='text-xs font-semibold text-black/60 '>Payment: COD</h1>
                                        <h1 className='text-sm font-semibold '>Total Price: <span className='line-through text-xs font-semibold'>${latestOrder.orderTotalPrice >= 100 ? latestOrder.orderTotalPrice : null}</span> <span className='ml-1 font-bold text-sm'>${latestOrder?.orderTotalPrice >= 100 ? latestOrder.orderTotalPrice - 50 : latestOrder.orderTotalPrice}</span></h1>
                                    </div>
                                    <div className='flex flex-col gap-4 mt-4 mb-2'>
                                        {
                                            latestOrder.items.map(val => (
                                                <div key={val._id} className='flex justify-between items-center' >
                                                    <div className='h-full w-[30%] flex justify-center items  ' >
                                                        <img src={val.image ? val.image : food1}  className='h-20 w-20 rounded-full object-cover' />
                                                    </div>
                                                    <div className='h-full w-[70%] px-2 flex flex-col items-start text-sm font-semibold ' >
                                                        <h1>{val.name}</h1>
                                                        <h1 className='text-black/60 text-xs mb-1'>{val.type}</h1>
                                                        <div className='w-full flex justify-between items-center  ' >
                                                            <h1>${val.price}</h1>
                                                            <h1 className='mr-10'>Qty: {val.quantity}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </> : null
                }

                {/* All ORDERS */}
                {
                    showHistory ? <>
                        <h1 className='text-2xl font-semibold my-6' >ORDER HISTORY</h1>
                        <div className='flex flex-wrap justify-center gap-4' >
                            {
                                orderHistory?.map(order => (
                                    <div key={order.orderId} onClick={() => openOrderModal(order.orderId)} className='min-h-40 w-80 p-2 shadow-md shadow-black/60 cursor-pointer rounded-md' >
                                        <div className='w-[90%] pl-2' >
                                            <h1 className='text-sm font-semibold '>OrderId: <span className='text-xs'>{order?.orderId}</span></h1>
                                            <h1 className='text-xs font-semibold text-black/60 '>{order.orderDate}</h1>
                                            <h1 className='text-sm font-semibold '>Total Price: <span className='line-through text-xs font-semibold'>${order.orderTotalPrice >= 100 ? order.orderTotalPrice : null}</span> <span className='ml-1 font-bold text-sm'>${order?.orderTotalPrice >= 100 ? order.orderTotalPrice - 50 : order.orderTotalPrice}</span></h1>
                                        </div>
                                        <div className='flex flex-col gap-4 mt-4 mb-2'>
                                            {
                                                (order?.items?.length >= 2 ? order.items.slice(0, 2) : order.items).map(val => (
                                                    <div key={val._id} className='flex justify-between items-center' >
                                                        <div className='h-full w-[30%] flex justify-center items  ' >
                                                            <img src={val.image ? val.image : food1} className='h-20 w-20 rounded-full object-cover' />
                                                        </div>
                                                        <div className='h-full w-[70%] px-2 flex flex-col items-start text-sm font-semibold ' >
                                                            <h1>{val.name}</h1>
                                                            <h1 className='text-black/60 text-xs mb-1'>{val.type}</h1>
                                                            <div className='w-full flex justify-between items-center  ' >
                                                                <h1>${val.price}</h1>
                                                                <h1 className='mr-10'>Qty: {val.quantity}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </> : null
                }
            </div>
        </div>
    )
}

export default UserOrderPage