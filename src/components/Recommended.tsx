type TProp = {
  thumb: string
  title: string
  experience?: string | undefined
}
const Recomended = ({ data }: { data: TProp }) => {
  return (
    <>
      <div>
        <div className='h-fit overflow-hidden'>
          <img
            src={data.thumb}
            alt={data.title}
            className='w-full hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer'
          />
        </div>
        <h3 className='text-heading font-medium text-xl mt-5 mb-1'>{data.title}</h3>
        <p className='text-sub-color-primary text-sm'>{data.experience}</p>
      </div>
    </>
  )
}

export default Recomended
