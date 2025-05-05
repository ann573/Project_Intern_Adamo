import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center mt-10 select-none px-5 md:px-0'>
        <h1 className='md:text-[200px] text-[100px] font-bold'>404</h1>
        <p className='md:text-5xl text-5xl text-center font-bold my-5'>Sorry!!!! This Page Not Found</p>
        <p className='text-2xl font-semiblod italic'>
          Return to{' '}
          <Link to='/' className='text-orange  hover:underline'>
            Home
          </Link>
        </p>
      </div>
    </>
  )
}

export default NotFoundPage
