import { useModalStore } from '../../Store/useModalStore.js';
import { useAuthStore } from '../../Store/useAuthStore.js';
import food1 from '../../assets/food1.png'

function OrderModel() {
    const { orderModel, closeOrderModal, selectedOrderId } = useModalStore();
    const { authUser } = useAuthStore();

    const selectedOrder = authUser.allOrders.find(order => order.orderId === selectedOrderId)

    if (!orderModel) return;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
            {
                selectedOrder &&
                <div key={selectedOrder.orderId} className='min-h-[40%] max-h-[60%] w-[95%] md:w-[80%] lg:w-[60%] relative p-2 sm:p-4 pb-14 bg-white rounded-md overflow-hidden'>
                    <div className='w-full sm:w-[90%] m-auto flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                        <h1 className='w-full sm:w-[40%] text-sm sm:text-base'>OrderId: {selectedOrder?.orderId}</h1>
                        <h1 className='w-full sm:w-[30%] text-sm sm:text-base'>Payment: COD</h1>
                        <h1 className='w-full sm:w-[30%] text-sm sm:text-base'>Total Amount:
                            <span className='line-through text-sm font-semibold'>${selectedOrder.orderTotalPrice}</span>
                            <span className='ml-1 font-bold text-lg'>${selectedOrder.orderTotalPrice > 100 && selectedOrder.orderTotalPrice - 50}</span>
                        </h1>
                        <button onClick={closeOrderModal} className='absolute top-1 right-3 text-xl font-semibold'>X</button>
                    </div>

                    <div className='h-full w-full pb-4 overflow-y-scroll'>
                        {
                            selectedOrder?.items?.map((val) => (
                                <div key={val.orderId} className='min-h-32 w-full sm:w-[90%] m-auto flex flex-col sm:flex-row justify-between sm:items-center border-b border-black/40 gap-2 p-2'>
                                    <div className='w-full sm:w-[40%] flex gap-2 md:gap-4'>
                                        <img src={val.image || food1} onClick={() => handleClick(val)} className='h-20 w-20 rounded-md cursor-pointer object-cover' />
                                        <div>
                                            <h1 className='font-semibold text-sm'>{val.name}</h1>
                                            <span className='text-black/60 text-xs font-bold'>({val.type})</span>
                                        </div>
                                    </div>
                                    <div className='w-full sm:w-[30%] text-sm font-semibold'>
                                        <h1>Quantity: <span className='text-black/70'>{val.quantity}</span></h1>
                                        <h1>Status: <span className='text-black/70'>Order Placed</span></h1>
                                        <h1>Date: <span className='text-black/70'>{selectedOrder.orderDate}</span></h1>
                                    </div>
                                    <h1 className='w-full sm:w-[30%] font-semibold text-sm'>Amount: <span className='text-black/70'>${val.price}</span></h1>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default OrderModel