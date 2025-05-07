import { useAppSelector } from '@/hooks/app'
import Camera from '@assets/icons/camera.tsx'
import React, { useRef, useState } from 'react'
import Slider from 'react-slick'

import { useDetailHotels } from '@/hooks/hotels'
import '@/style/imageSlider.css'
import { Skeleton } from '@components/ui/skeleton'
import { useLocation, useParams } from 'react-router-dom'

import Lightbox from 'yet-another-react-lightbox'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

const ImageSlider = React.memo(() => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const isHotel = location.pathname.includes('hotel')

  const { tour, isLoading } = useAppSelector((state) => state.tours)
  const { data, isFetching } = useDetailHotels(id as string)
  const sliderRef = useRef<Slider | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openLightbox, setOpenLightbox] = useState(false)

  const images = isHotel ? data?.description.image : tour?.image
  const totalImages = images?.length || 0
  const hiddenCount = totalImages - 3

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => {
      if (!images) return <></>
      const isLastVisible = totalImages > 4 && i === 3

      return (
        <div className='custom-dot'>
          {isLastVisible ? (
            <div
              className='relative cursor-pointer opacity-80'
              onClick={() => {
                setOpenLightbox(true)
              }}
            >
              <img
                src={images[i]}
                alt={`thumbnail-${i}`}
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  opacity: 0.5
                }}
                onClick={() => sliderRef.current?.slickGoTo(0)}
              />
              <div className='absolute inset-0 flex gap-2 justify-center items-center sm:text-2xl text-base font-bold text-sub-color-primary'>
                <Camera />
                <span>{hiddenCount}+</span>
              </div>
            </div>
          ) : (
            <img
              src={images[i]}
              alt={`thumbnail-${i}`}
              onClick={() => sliderRef.current?.slickGoTo(1)}
              className={`transition-all duration-300 ${currentSlide === i ? '' : 'opacity-45'}`}
              style={{ width: '100%', height: '100px', objectFit: 'cover', cursor: 'pointer' }}
            />
          )}
        </div>
      )
    },
    dotsClass: 'slick-dots custom-dots'
  }

  if (!images || images.length === 0) {
    return <div>No images available</div>
  }

  if (isLoading || isFetching) {
    return (
      <>
        <Skeleton className='w-full h-[400px]' />
        <div className='flex justify-between gap-5 my-5'>
          <Skeleton className='w-1/3 h-[100px]' />
          <Skeleton className='w-1/3 h-[100px]' />
          <Skeleton className='w-1/3 h-[100px]' />
        </div>
      </>
    )
  }

  return (
    <div className='mx-auto mb-30'>
      <Slider ref={sliderRef} {...settings}>
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className='mb-5'>
            <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={images.map((src) => ({ src }))}
        plugins={[Thumbnails, Zoom]}
        zoom={{ maxZoomPixelRatio: 5 }}
        thumbnails={{ border: 0, gap: 0, width: 100 }}
        carousel={{ preload: 10 }}
        index={3}
      />
    </div>
  )
})

export default ImageSlider
