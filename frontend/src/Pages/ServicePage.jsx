import food1 from '../assets/food1.png'

function ServicePage() {
    return (
        <div>
            <div className='h-[93vh] w-full lg:w-[90%] m-auto flex flex-col lg:flex-row justify-between mb-10 pt-16' >
                <div className='h-[50%] md:h-[60%] lg:h-full w-full lg:w-[60%] relative flex justify-center items-center ' >
                    <img src={food1} className='h-full lg:h-[90%] w-[90%] rounded-md rounded-tr-full object-cover ' />
                </div>

                <div className='h-[50%] md:h-[40%] lg:h-full w-full lg:w-[40%] px-4 md:px-10 flex flex-col lg:justify-center justify-start items-start ' >
                    <h1 className='text-red-600 font-semibold py-2 md:py-4' >Testimonials</h1>
                    <h1 className='w-full sm:w-[90%] text-3xl lg:text-5xl font-bold ' >What Our Customers Say About Us</h1>
                    <p className='w-full sm:w-[80%] lg:w-[70%] py-2 md:py-4 font-semibold text-black/70 '>“I had the pleasure of dining at Foodi last night, and I'm still raving about the experience! The attention to detail in presentation and service was impeccable”</p>
                    <div className='w-full flex gap-4 mt-2 ' >
                        <div className='flex justify-center items-center' >
                            <img src={food1} className='h-10 w-10 object-cover rounded-full' />
                            <img src={food1} className='h-10 w-10 object-cover rounded-full' />
                            <img src={food1} className='h-10 w-10 object-cover rounded-full' />
                        </div>
                        <div>
                            <h1 className='font-bold' >Customer Feedback</h1>
                            <div className='font-bold' >* 4.9 <span className='text-black/60 text-sm font-semibold' >{`(18.6k Reviews)`}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePage