import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../../Store/useAuthStore';
import AdminSideBar from './AdminSideBar';
import { GiHamburgerMenu } from 'react-icons/gi';

function AdminPage() {
    const [menu, setMenu] = useState('dashBoard');
    const { getAllUsers } = useAuthStore();
    const [showSideBar, setShowSideBar] = useState(false);

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div className='min-h-screen w-full m-auto pt-14' >
            <div className='h-full w-full flex relative justify-between items-start overflow-hidden ' >
                <div className={`h-full w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%] fixed md:relative top-0 left-0 z-20 pt-10 md:pt-0 transition-transform duration-300 ${showSideBar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-white`}>
                    <AdminSideBar menu={menu} setMenu={setMenu} />
                    <button onClick={() => setShowSideBar(false)} className='block md:hidden absolute z-30 top-14 right-1 text-xl font-bold '>X</button>
                </div>

                <div className='h-full w-full md:w-[75%] lg:w-[80%] ' >
                    <Outlet />
                </div>
                {
                    !showSideBar &&
                    <button onClick={() => setShowSideBar(true)} className='block md:hidden absolute z-10 top-2 left-2'><GiHamburgerMenu size={25} /> </button>
                }
            </div >

        </div >
    )
}

export default AdminPage