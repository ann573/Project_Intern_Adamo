import { useAppSelector } from "@/hooks/app";
import { useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import "@/style/imageSlider.css";
import { Skeleton } from "@/components/ui/skeleton";

const ImageSlider = () => {
  const { tour, isLoading } = useAppSelector((state) => state.tours);
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
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
      return (
        <div className="custom-dot">
          <img
            src={tour?.image[i]}
            alt={`thumbnail-${i}`}
            onClick={() => sliderRef?.current?.slickGoTo(i)}
            className={`transition-all duration-300 ${
              currentSlide === i ? "" : "opacity-45"
            }`}
            style={{
              width: "100%",
              height: "100px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </div>
      );
    },
    dotsClass: "slick-dots custom-dots",
  };

  if (!tour?.image || tour?.image.length === 0) {
    return <div>No images available</div>;
  }

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-full h-[400px]" />
        <div className="flex justify-between gap-5 my-5">
          <Skeleton className="w-1/3 h-[100px]" />
          <Skeleton className="w-1/3 h-[100px]" />
          <Skeleton className="w-1/3 h-[100px]" />
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto mb-30">
      <Slider ref={sliderRef} {...settings}>
        {tour.image?.map((image, index) => (
          <div key={index} className="mb-5">
            <img
              src={image}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
