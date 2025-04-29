import Card from '@/components/listTour/Card'
import ITour from '@/interfaces/ITour'
// import TTour from "@/types/TSlider";
import Recommended from '@components/Recommended'
import { useRef } from 'react'
import Slider from 'react-slick'
type RecommendedData = {
  id: number
  thumb: string
  title: string
  experience?: string
}
type TProps =
  | {
      isCard: true
      data: ITour[]
      show: number
    }
  | {
      isCard?: false
      data: RecommendedData[]
      show: number
    }

function SliderComponent(props: TProps) {
  const sliderRef = useRef<Slider>(null)

  const settings = {
    infinite: true,
    slidesToShow: props.show,
    slidesToScroll: 1,
    arrows: false, // Tắt arrow mặc định
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      // { breakpoint: 785, settings: { slidesToShow: 1 } },
      { breakpoint: 630, settings: { slidesToShow: 1, dots: true } }
    ]
  }

  return (
    <div className='flex items-center gap-2 relative'>
      {/* === Mũi tên trái === */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className='text-2xl cursor-pointer hover:text-black text-black absolute -left-8 sm:block hidden'
      >
        <i className='ri-arrow-left-line' />
      </button>

      {/* === Slider content === */}
      <div className='w-full'>
        {/* <Slider {...settings} ref={sliderRef}>
          {props.data.map((item) => (
            <div key={item.id} className="px-3 py-5 md:py-0">
              {props.isCard ? (
                <Card data={item} />
              ) : (
                <Recommended data={item} />
              )}
            </div>
          ))}
        </Slider> */}

        <Slider {...settings} ref={sliderRef}>
          {props.isCard
            ? (props.data as ITour[]).map((item) => (
                <div key={item.id} className='px-3 py-5 md:py-0'>
                  <Card data={item} />
                </div>
              ))
            : (
                props.data as {
                  id: number
                  thumb: string
                  title: string
                  experience: string
                }[]
              ).map((item) => (
                <div key={item.id} className='px-3 py-5 md:py-0'>
                  <Recommended data={item} />
                </div>
              ))}
        </Slider>
      </div>

      {/* === Mũi tên phải === */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className='text-2xl cursor-pointer hover:text-black text-black sm:block hidden'
      >
        <i className='ri-arrow-right-line' />
      </button>
    </div>
  )
}

export default SliderComponent
