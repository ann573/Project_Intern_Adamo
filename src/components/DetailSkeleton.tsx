import { Skeleton } from '@components/ui/skeleton'

const DetailSkeleton = () => {
  return (
    <main className='max-w-[1200px] mx-auto xl:px-0 px-5 mb-20 animate-pulse'>
      {/* Breadcrumb Skeleton */}
      <section className='my-10'>
        <Skeleton className='h-4 w-1/3 mb-2' />
      </section>

      {/* Title Skeleton */}
      <Skeleton className='h-8 w-2/3 mb-4' />

      {/* Location and rating */}
      <div className='flex gap-4 items-center mb-5'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-16' />
      </div>

      <div className='flex gap-5 text-sub-color-primary mb-10'>
        <Skeleton className='h-6 w-16' />
        <Skeleton className='h-6 w-24' />
      </div>

      {/* Main Content Grid */}
      <section className='grid lg:grid-cols-3 grid-cols-2 xl:gap-15 gap-5'>
        {/* Left Content */}
        <div className='col-span-2 order-2 lg:order-1'>
          {/* Image Slider Skeleton */}
          <Skeleton className='w-full h-64 mb-5 rounded-lg' />

          {/* Tabs Skeleton */}
          <div className='flex justify-between mt-5 mb-2'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-6 w-32' />
          </div>
          <Skeleton className='h-1 w-full mb-5' />

          {/* Tab Content Skeleton */}
          <Skeleton className='h-32 w-full mb-8 rounded' />
          <Skeleton className='h-32 w-full mb-8 rounded' />
          <Skeleton className='h-32 w-full mb-8 rounded' />
          <Skeleton className='h-32 w-full mb-8 rounded' />
          <Skeleton className='h-32 w-full mb-8 rounded' />
          <Skeleton className='h-32 w-full mb-8 rounded' />

          {/* Related Tours */}
          <h3 className='font-bold my-5 text-2xl text-heading'>
            <Skeleton className='h-8 w-48' />
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 3xl:xl:grid-cols-3 md:gap-5 gap-y-10'>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className='h-48 w-full rounded-lg' />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='order-1 lg:order-2 md:col-span-1 col-span-2'>
          <div className='bg-secondary sticky top-5 p-5 rounded-lg'>
            <Skeleton className='h-8 w-32 mb-4' />
            <Skeleton className='h-1 w-full mb-4' />
            <div className='mb-4'>
              <Skeleton className='h-4 w-24 mb-2' />
              <Skeleton className='h-4 w-20' />
            </div>
            <div className='mb-4'>
              <Skeleton className='h-4 w-24 mb-2' />
              <Skeleton className='h-4 w-20' />
            </div>
            {/* FormPrice Skeleton */}
            <Skeleton className='h-40 w-full rounded' />
          </div>
        </div>
      </section>
    </main>
  )
}

export default DetailSkeleton
