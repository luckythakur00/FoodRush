import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="min-h-52 px-6 lg:px-20 mt-4 bg-green-200">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Section */}
        <div className="w-full md:w-1/2 md:pt-4">
          <h1 className="text-base md:text-lg lg:text-xl mt-2 sm:mt-4 font-semibold">FoodRush</h1>
          <p className="text-xs md:text-sm font-semibold text-black/60 mt-2">At <span className="text-black/80">FoodRush</span>, we believe great food brings people together. From fresh ingredients to fast delivery, every meal is crafted with care to brighten your day. Thank you for trusting us to serve you delicious moments. Stay hungry, stay happy! © 2025 FoodRush</p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex flex-row sm:flex-row justify-between gap-2 sm:gap-6 md:pt-4">
          <div >
            <h1 className="text-sm md:text-base lg:text-lg font-semibold pb-2">Quick Links</h1>
            <ul className="space-y-1 text-xs md:text-sm text-black/60 font-semibold">
              <li>Home</li>
              <li>Best Product</li>
              <li>Offers & Deals</li>
              <Link to={'/contact'}>Contact Us</Link>
            </ul>
          </div>

          <div>
            <h1 className="text-sm md:text-base lg:text-lg font-semibold pb-2">Need Help?</h1>
            <ul className="space-y-1 text-xs md:text-sm text-black/60 font-semibold">
              <li>Delivery Information</li>
              <li>Return & Refund Policy</li>
              <li>Payment Methods</li>
              <li>Track your Order</li>
            </ul>
          </div>

          <div>
            <h1 className="text-sm md:text-base lg:text-lg font-semibold pb-2">Follow Us</h1>
            <ul className="space-y-1 text-xs md:text-sm text-black/60 font-semibold">
              <li>Instagram</li>
              <li>Twitter</li>
              <a href="https://lucky00/linkedin.com">LinkedIn</a>
              <li>Facebook</li>
              <a href="https://github.com/luckythakur00">GitHub</a>
            </ul>
          </div>
        </div>
      </div>

      <h1 className="text-xs text-center font-semibold py-4 text-black/60 md:text-black/90">Copyright 2025 © FoodRush. Thank you for letting us be part of your delicious journey. Fresh meals, happy moments!</h1>
    </div>
  );

}

export default Footer