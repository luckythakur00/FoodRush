import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className='h-screen w-[90%] m-auto flex justify-center items-center' >
            <div className='h-[40%] w-[60%] flex flex-col justify-center items-center rounded-[90%] border-t-2 border-t-black ' >
                <h1 className='text-9xl' >404</h1>
                <h1 className='text-xl font-semibold' >Opps! Page not found </h1>
                <Link to={'/'}>
                    <button className='h-10 px-6 mt-4 text-lg font-semibold rounded-full bg-[#39DB4A]/50 hover:bg-[#39DB4A]/70 transition-all text-[#27682e] border-2 border-green-800'>Go Back</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage