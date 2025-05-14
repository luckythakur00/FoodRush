import { useAuthStore } from '../../Store/useAuthStore';
import { useFoodStore } from '../../Store/useFoodStore';
import food1 from '../../assets/food1.png'
import { FaUser } from 'react-icons/fa';

function Dashboard() {
  const { allUsers } = useAuthStore();
  const { allFoodItems } = useFoodStore();

  const recentFoods = allFoodItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className='h-full w-full px-6 m-auto overflow-hidden' >
      <h1 className="text-lg md:text-3xl font-semibold text-center my-4 md:my-6">Admin Dashboard</h1>

      <div className="h-full w-full flex flex-wrap gap-4 justify-center items-center mb-8">
        <div className="h-14 w-28 sm:h-20 sm:w-40 lg:h-24 lg:w-52 md:p-6 flex justify-between items-center rounded-md shadow-md shadow-black/40 cursor-pointer bg-white">
          <div className='w-[30%] flex justify-center' >
            <FaUser className='size-4 sm:size-5 lg:size-6' />
          </div>
          <div className='w-[70%] text-center' >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">Total Foods</h2>
            <p className="sm:text-lg lg:text-xl font-bold text-green-600">{allFoodItems?.length}</p>
          </div>
        </div>
        <div className="h-14 w-28 sm:h-20 sm:w-40 lg:h-24 lg:w-52 md:p-6 flex justify-between items-center rounded-md shadow-md shadow-black/40 cursor-pointer bg-white">
          <div className='w-[30%] flex justify-center' >
            <FaUser className='size-4 sm:size-5 lg:size-6' />
          </div>
          <div className='w-[70%] text-center' >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">Total Users</h2>
            <p className="sm:text-lg lg:text-xl font-bold text-blue-600">{allUsers?.length}</p>
          </div>
        </div>
        <div className="h-14 w-28 sm:h-20 sm:w-40 lg:h-24 lg:w-52 md:p-6 flex justify-between items-center rounded-md shadow-md shadow-black/40 cursor-pointer bg-white">
          <div className='w-[30%] flex justify-center' >
            <FaUser className='size-4 sm:size-5 lg:size-6' />
          </div>
          <div className='w-[70%] text-center' >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">New Orders</h2>
            <p className="sm:text-lg lg:text-xl font-bold text-yellow-600">12</p>
          </div>
        </div>
        <div className=" h-14 w-28 sm:h-20 sm:w-40 lg:h-24 lg:w-52 md:p-6 flex justify-between items-center rounded-md shadow-md shadow-black/40 cursor-pointer bg-white">
          <div className='w-[30%] flex justify-center' >
            <FaUser className='size-4 sm:size-5 lg:size-6' />
          </div>
          <div className='w-[70%] text-center' >
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold">New Orders</h2>
            <p className="sm:text-lg lg:text-xl font-bold text-yellow-600">12</p>
          </div>
        </div>
      </div>

      {/* Recently added foods */}
      <h1 className='text-lg md:text-2xl mb-4 text-center font-semibold' >Recently added foods</h1>
      <div className='h-64 w-full p-2 m-auto flex gap-4 overflow-x-scroll' >
        {
          recentFoods.map(val => (
            <div key={val._id} className='h-52 min-w-36 sm:min-w-40 md:h-60 md:min-w-48 relative rounded-2xl overflow-hidden bg-[#d8d8d844] shadow-md shadow-black/40' >
              <div className='h-[70%] flex justify-center items-center' >
                <img src={val.image || food1} className='h-full w-full object-cover' />
              </div>
              <div className='h-[30%] px-2 pt-2 ' >
                <div className='flex justify-between items-start pb-1 font-semibold' >
                  <h1 className='text-xs sm:text-sm' >{val.name.length < 10 ? val.name : val.name.slice(0, 10) + '..'}</h1>
                  <h1 className='text-xs text-black/70' >{val.type}</h1>
                </div>
                <div className='flex justify-between items-center text-xs sm:text-sm font-bold' >
                  <h1>${val.price}</h1>
                  <h1 className=' text-black/75' >* {val.rating}</h1>
                </div>
              </div>
              <div className='h-8 w-10 rounded-bl-2xl flex justify-center items-center absolute top-0 right-0 bg-red-500 ' >
                <h1 className='text-xs text-white font-semibold' >New</h1>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard