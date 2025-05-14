import { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import { useFoodStore } from '../Store/useFoodStore';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { useModalStore } from '../Store/useModalStore';
import profile from '../assets/profilePic.jpg'
import { GiHamburgerMenu } from 'react-icons/gi';
import SideBar from './SideBar';

function Header() {
  const { openInfoModal, openLoginModal } = useModalStore();
  const { logOutUser, authUser } = useAuthStore();
  const { orderItems } = useFoodStore();
  const [menu, setMenu] = useState('');
  const [showUser, setShowUser] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='h-14 w-full fixed z-50 bg-white shadow-md shadow-black/20 ' >
      <div className='w-[90%] m-auto py-2 flex justify-between items-center' >
        <div className='' >
          <Link to={'/'} className='font-semibold text-2xl font-serif' >FoodRush</Link>
        </div>
        <div className=' hidden md:flex text-sm lg:text-base ml-10' >
          <Link to={'/'} onClick={() => setMenu('')} className='mx-4 font-semibold transition-all '> <span className={`${menu === '' ? 'text-green-600 transition-all' : 'text-black'} hover:text-green-600`} >Home</span></Link>
          <Link to={`/menu`} onClick={() => setMenu("menu")} className='mx-4 font-semibold transition-all '> <span className={`${menu === 'menu' ? 'text-green-600 transition-all' : 'text-black'} hover:text-green-600`} >Menu</span></Link>
          <Link to={'/service'} onClick={() => setMenu("service")} className='mx-4 font-semibold transition-all '><span className={`${menu === 'service' ? 'text-green-600 transition-all' : 'text-black'} hover:text-green-600`} >Services</span></Link>
          <Link to={'/contact'} onClick={() => setMenu("contact")} className='mx-4 font-semibold transition-all '><span className={`${menu === 'contact' ? 'text-green-600 transition-all' : 'text-black'} hover:text-green-600`} >Contact</span></Link>
          <div onClick={() => (!authUser ? openInfoModal() : (setMenu("foodCart"), navigate('/foodCart')))} className={`mx-4 font-semibold transition-all cursor-pointer hover:text-green-600 flex ${menu === 'foodCart' ? 'text-green-600 transition-all' : 'text-black'}`}>
            <h1>Cart</h1>
            <h1 className="px-1.5 text-xs animate-pulse"><HiOutlineShoppingCart size={24} /></h1>
            <h1 className='h-4 w-4 text-center relative -top-1 right-3 text-xs bg-green-400 text-black font-semibold rounded-full' >{orderItems.length}</h1>
          </div>
        </div>
        {
          authUser ?
            <>
              <div className='hidden md:flex justify-center items-center  ' >
                <button onClick={() => logOutUser()} className='h-9 w-24 mr-2 mb-2 text-sm font-semibold rounded-full bg-red-600 hover:bg-red-700 text-white transition-all '>Logout</button>
                <div className='h-12 w-12 cursor-pointer relative' >
                  <img src={profile} onClick={() => setShowUser(!showUser)} className='bg-green-400 flex justify-center items-center object-fill rounded-full' />
                  {
                    showUser &&
                    <div className='h-24 w-28 p-2 rounded-md border-2 border-black/60 shadow-sm shadow-black/60 font-semibold text-sm bg-white absolute right-0' >
                      <h1 className='pb-1'>Hyy {authUser?.fullName}!</h1>
                      <Link to={'/userOrder'} onClick={() => setShowUser(false)} >My Orders</Link>
                      <h1 onClick={() => setShowUser(false)} className='text-red-600 hover:text-red-800 text-base ' >Logout</h1>
                    </div>
                  }
                </div>
              </div>
              <button onClick={() => setOpenSideBar(true)} className={`md:hidden ${openSideBar ? 'hidden' : ''}`} ><GiHamburgerMenu size={20} /></button>
            </> :
            <button onClick={() => openLoginModal()} className='h-9 w-24 text-sm font-semibold rounded-full bg-[#39DB4A] hover:bg-[#31bc3f] transition-all '>LogIn</button>
        }
      </div>

      {/* Side Bar */}
      <div className='md:hidden fixed top-0 right-0 pt-16' >
        <button onClick={() => setOpenSideBar(false)} className={`absolute z-50 top-2 right-4 text-xl text-white font-bold ${openSideBar ? '' : 'hidden'}`} >X</button>
        <div className={`transition-transform duration-300 ease-in-out fixed top-0 right-0 h-full bg-black/70 text-white ${openSideBar ? 'translate-x-0' : 'translate-x-full'}`}>
          {openSideBar && <SideBar setOpenSideBar={setOpenSideBar} />}
        </div>
      </div>

    </div >
  )
}

export default Header