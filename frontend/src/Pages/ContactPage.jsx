import { useState } from 'react'
import { toast } from 'react-toastify'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function ContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submited, setSubmited] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.warn("All fields are required!");
            return;
        }
        setSubmited(true);

        const apiKey = import.meta.env.VITE_API_KEY;
        const userData = {
            access_key: apiKey,
            name: name,
            email: email,
            message: message
        };

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(userData)
        }).then((res) => res.json());

        if (res.success) {
            toast.success("Message sent successfully");
        } else {
            toast.error("Server Error");
        }
        setName("");
        setEmail("");
        setMessage("");
        setSubmited(false);
    };

    return (
        <div className='pt-16 w-[90%] m-auto'>
            <div id='contact' className='h-full w-full m-auto text-center'>
                <h1 className='text-xl md:text-5xl font-semibold'>Contact Us</h1>
                <h1 className='mb-2 md:mb-0 md:my-4 text-sm md:text-base'>If you have any questions, feel free to reach out to us.</h1>
            </div>

            <div className='flex flex-col sm:flex-row justify-between md:px-10 '>
                {/* left side */}
                <div className='h-full w-full sm:w-3/5 lg:w-1/2 sm:pt-8 text-start '>
                    <p className='w-full sm:w-[90%] lg:w-[75%] py-4 text-xs md:text-sm' > <span className='font-bold text-base md:text-lg' >Hyy there!</span><br />Thank you so much for visiting <span className='font-bold' >Hungerzz</span> and taking time to explore it. If you have any thoughts, querys or feedback, I'd love to hear them! Your suggestions would be incredibly helpful and means a lot to us. <br /> Feel free to drop us a message anytime! <br /> <span className='text-base md:text-lg font-bold'>Thanks for visiting!😊</span></p>
                    <div className='flex justify-start items-center gap-2 mb-2 sm:my-2 ' >
                        <MdEmail />
                        <p className='sm:px-2 text-sm cursor-pointer '>luckythakur13709@gmail.com  </p>
                    </div>
                    <div className='flex justify-start items-center gap-2 my-2 sm:my-2 ' >
                        <MdPhone />
                        <p className='sm:px-2 text-sm  cursor-pointer'>+91-7807294285  </p>
                    </div>
                    <div className='flex justify-start items-center gap-2 sm:my-2 ' >
                        <MdLocationOn />
                        <p className='sm:px-2 text-sm  cursor-pointer'>Pinjore, Panchkula Haryana  </p>
                    </div>
                </div>

                {/* Right Side */}
                <form onSubmit={onSubmit} className='h-full w-full sm:w-2/5 lg:w-1/2 mt-10 sm:mt-0 '>
                    <div className='flex flex-col'>
                        <label htmlFor='' className='sm:py-4 text-sm md:text-base font-semibold' >Your Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' className='h-10 md:h-12 w-full lg:w-[80%] pl-2 shadow-md shadow-black/40 text-black outline-none rounded' />
                    </div>
                    <div className='flex flex-col' >
                        <label htmlFor='' className='pt-4 text-sm md:text-base font-semibold sm:pb-2'>Your Email</label>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter you email' className='h-10 md:h-12 w-full lg:w-[80%] pl-2 shadow-md shadow-black/40 text-black outline-none rounded' />
                    </div>
                    <div className='flex flex-col' >
                        <label htmlFor='' className='pt-4 text-sm md:text-base font-semibold sm:pb-2'>Write Your message here</label>
                        <textarea type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter your Message' className='h-40 md:h-52 w-full lg:w-[80%] pt-4 pl-2 shadow-md shadow-black/40 text-sm outline-none text-black rounded overflow-hidden' />
                    </div>
                    <div className='mt-4 sm:my-8 ' >
                        <button type="submit" disabled={submited ? true : false} className={`h-8 w-28 md:h-10 md:w-36 text-sm md:text-base font-semibold rounded-md bg-[#39DB4A] hover:bg-[#31bc3f]`} >Submit Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactPage