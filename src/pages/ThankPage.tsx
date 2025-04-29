import { useOrderStore } from '@/zusTand/orderStore'
import { useRoomStore } from '@/zusTand/roomStore'
import banner from '@assets/images/banner.png'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const ThankPage = () => {
  const nav = useNavigate()
  const { clearOrderTour, clearOrderRoom } = useOrderStore()

  const { clearRoom } = useRoomStore()
  useEffect(() => {
    clearOrderRoom()
    clearRoom()
    clearOrderTour()
  }, [])
  return (
    <>
      <section className='relative min-h-screen flex items-center justify-center'>
        <img src={banner} className='absolute inset-0 w-full h-full object-cover' alt='' />
        <div className='relative z-10 flex items-center justify-center w-full h-full px-10'>
          <div className='bg-background bg-opacity-95 rounded-lg shadow-lg px-4 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 max-w-full sm:max-w-md md:max-w-lg w-full flex flex-col items-center'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 text-center'>Thank You!</h1>
            <p className='text-content text-center mb-2 text-sm sm:text-base md:text-lg'>
              Your order has been successfully ordered.
              <br />
              Order information has been emailed to you. Thank you!
            </p>
            <button
              className='mt-8 px-6 py-2 sm:px-8 sm:py-3 bg-primary text-white font-semibold rounded transition hover:bg-orange-600 text-sm sm:text-base cursor-pointer'
              onClick={() => nav('/')}
            >
              Back to our home
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default ThankPage
