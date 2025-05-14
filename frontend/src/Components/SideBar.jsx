import { HiOutlineShoppingCart } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../Store/useAuthStore'
import { useModalStore } from '../Store/useModalStore';
import { useFoodStore } from '../Store/useFoodStore';

function SideBar({ setOpenSideBar }) {
    const { authUser, logOutUser } = useAuthStore();
    const { openInfoModal } = useModalStore();
    const { orderItems } = useFoodStore();

    const navigate = useNavigate();
    
    return (
        <div className='h-screen w-40 sm:w-48 pt-10 ' >
            <div className='h-full w-full flex flex-col pl-6 text-sm' >
                <Link to={'/'} className='mx-4 py-1 '> <span className={` `} >Home</span></Link>
                <Link to={`/menu`} className='mx-4 py-1 '> <span className={` `} >Menu</span></Link>
                <Link to={'/service'} className='mx-4 py-1 '><span className={` `} >Services</span></Link>
                <Link to={'/contact'} className='mx-4 py-1 '><span className={` `} >Contact</span></Link>
                <div onClick={() => (!authUser ? openInfoModal() : navigate('/foodCart'))} className={`mx-4 py-1 cursor-pointer flex `}>
                    <h1>Cart</h1>
                    <h1 className="px-1.5 animate-pulse"><HiOutlineShoppingCart size={22} /></h1>
                    <h1 className='h-4 w-4 text-center relative -top-1 right-3 text-xs bg-green-400 text-black font-bold rounded-full' >{orderItems?.length}</h1>
                </div>
                <Link to={'/userOrder'} className='mx-4 py-1 '><span className={` `} >My Orders</span></Link>
                <button onClick={() => (logOutUser(), setOpenSideBar(false))} className='h-7 w-20 mx-4 my-1 text-xs font-semibold rounded-full bg-red-600 hover:bg-red-700 text-white transition-all '>Logout</button>
            </div>
        </div>
    )
}

export default SideBar