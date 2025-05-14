import { Link } from 'react-router-dom';

function AdminSideBar({ menu, setMenu }) {

    return (
        <div className='h-full w-full pt-8 sm:pt-6 ' >
            <h1 className='sm:text-lg md:text-xl lg:text-2xl pl-6 font-semibold mt-2' >Food Management</h1>
            <div className='w-full mt-6 lg:mt-10 flex flex-col text-xs sm:text-sm lg:text-base font-semibold' >
                <Link to={'/adminPage/'} onClick={() => setMenu('dashBoard')} className={`h-8 sm:h-11 p-2.5 pl-6 ${menu === 'dashBoard' ? 'bg-gray-200' : ''} hover:bg-gray-200 cursor-pointer`} >Dashboard</Link>
                <Link to={'/adminPage/foodBoard'} onClick={() => setMenu('foodBoard')} className={`h-8 sm:h-11 p-2.5 pl-6 ${menu === 'foodBoard' ? 'bg-gray-200' : ''} hover:bg-gray-200 cursor-pointer`} >Manage Food Items</Link>
                <Link to={'/adminPage/addFood'} onClick={() => setMenu('addFood')} className={`h-8 sm:h-11 p-2.5 pl-6 ${menu === 'addFood' ? 'bg-gray-200' : ''} hover:bg-gray-200 cursor-pointer`} >Add New Food</Link>
                <Link to={'/adminPage/userBoard'} onClick={() => setMenu('userBoard')} className={`h-8 sm:h-11 p-2.5 pl-6 ${menu === 'userBoard' ? 'bg-gray-200' : ''} hover:bg-gray-200 cursor-pointer`} >View Users</Link>
                <Link to={'/adminPage/userBoard'} onClick={() => setMenu('userBoard')} className={`h-8 sm:h-11 p-2.5 pl-6 ${menu === 'userBoard' ? 'bg-gray-200' : ''} hover:bg-gray-200 cursor-pointer`} >Order Lists</Link>
            </div>
        </div>
    )
}

export default AdminSideBar