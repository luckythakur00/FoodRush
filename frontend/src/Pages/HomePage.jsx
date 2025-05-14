import food1 from '../assets/food1.png'
import MenuPage from './MenuPage'
import { useModalStore } from '../Store/useModalStore'
import { useAuthStore } from '../Store/useAuthStore'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const { openInfoModal } = useModalStore();
    const { authUser } = useAuthStore();

    const navigate = useNavigate();

    return (
        <>
            <div className='h-full sm:min-h-screen md:h-screen w-full lg:w-[90%] p-4 lg:p-0 m-auto pt-16 flex flex-col-reverse md:flex-row justify-between overflow-hidden ' >
                <div className='h-[50%] md:h-full w-full md:w-[40%] pt-4 md:pt-0 flex flex-col md:justify-center items-start ' >
                    <h1 className='w-[80%] sm:w-[70%] md:w-[90%] text-2xl md:text-5xl font-bold ' >Dive into Delights Of Delectable <span className='text-[#39DB4A]' >Food</span></h1>
                    <p className='w-[80%] sm:w-[70%] md:w-[90%] text-base md:text-xl py-4 md:py-10 font-semibold '>Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                    <div className='flex gap-4' >
                        <button onClick={() => !authUser ? openInfoModal() : navigate('/foodCart')} className='h-9 w-28 sm:h-11 sm:w-32 rounded-full text-sm sm:text-base font-semibold bg-[#39DB4A] hover:bg-[#2fb83d] transition-all' >Order Now</button>
                        <button onClick={() => !authUser ? openInfoModal() : navigate('/menu')} className='h-9 w-28 sm:h-11 sm:w-32 rounded-full text-sm sm:text-base font-semibold border-2 border-black/40 hover:border-black/80 transition-all ' >View Menu</button>
                    </div>
                </div>

                <div className='h-[50%] md:h-full w-full md:w-[60%] relative flex justify-center items-center ' >
                    <img src={food1} className='h-full w-full md:h-[70%] rounded-md rounded-tl-full object-cover ' />
                    <div className='h-8 md:h-9 px-2 md:px-4 animate-bounce flex justify-center items-center rounded-l-md rounded-tr-3xl absolute top-16 left-0 md:top-44 md:left-14 bg-gray-200' >
                        <h1 className='text-xs md:text-sm font-bold text-red-600' >Hot spicy Food 🌶</h1>
                    </div>
                </div>
            </div>
            <MenuPage />
        </>
    )
}

export default HomePage