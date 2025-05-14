import { useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import MenuPage from './Pages/MenuPage.jsx'
import ServicePage from './Pages/ServicePage'
import FoodCart from './Pages/FoodCart.jsx'
import ContactPage from './Pages/ContactPage.jsx'
import NotFoundPage from './Pages/NotFoundPage.jsx'
import { useAuthStore } from './Store/useAuthStore.js'
import { useFoodStore } from './Store/useFoodStore.js'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from './Pages/Admin/AdminPage.jsx'
import AddFood from './Pages/Admin/AddFood.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx'
import FoodBoard from './Pages/Admin/FoodBoard.jsx'
import UserBoard from './Pages/Admin/UserBoard.jsx'
import FoodPage from './Pages/FoodPage.jsx'
import Footer from './Components/Footer.jsx'
import LogInModel from './Components/Modals/LogInModel.jsx'
import SignUpModel from './Components/Modals/SignUpModel.jsx'
import { useModalStore } from './Store/useModalStore.js'
import InfoModel from './Components/Modals/InfoModel.jsx'
import UserOrderPage from './Pages/UserOrderPage.jsx'
import OrderModel from './Components/Modals/OrderModel.jsx'

function App() {
  const { authUser, checkAuth } = useAuthStore();
  const { getAllItems } = useFoodStore();
  const { loginModal, signUpModal, infoModal, orderModel } = useModalStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <Header />
      <div className='h-full w-full m-auto text-sm md:text-base'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/service' element={<ServicePage />} />
          <Route path='/contact' element={authUser ? <ContactPage /> : <Navigate to={'/'} />} />
          {
            authUser && (
              <Route path='/adminPage/*' element={authUser?.isAdmin ? <AdminPage /> : <Navigate to="/*" />}>
                <Route path='' element={<Dashboard />} />
                <Route path='foodBoard' element={<FoodBoard />} />
                <Route path='addFood' element={<AddFood />} />
                <Route path='userBoard' element={<UserBoard />} />
              </Route>
            )
          }
          <Route path='/foodPage' element={<FoodPage />} />
          <Route path='/foodCart' element={authUser ? <FoodCart /> : <Navigate to={'/'} />} />
          <Route path='/userOrder' element={authUser ? <UserOrderPage /> : <Navigate to={'/'} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {loginModal && <LogInModel />}
      {signUpModal && <SignUpModel />}
      {infoModal && <InfoModel />}
      {orderModel && <OrderModel />}
      {!window.location.pathname.startsWith('/adminPage') && <Footer />}
    </>
  )
}

export default App