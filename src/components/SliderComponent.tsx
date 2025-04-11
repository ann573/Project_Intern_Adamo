import React, { useRef } from "react";
import Slider from "react-slick";
import Card from "@/components/Card";
import Recommended from "@components/Recommended"

function SliderComponent({ data, show, isCard = true }) {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: show,
    slidesToScroll: 1,
    arrows: false, // Tắt arrow mặc định
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      // { breakpoint: 785, settings: { slidesToShow: 1 } },
      { breakpoint: 630, settings: { slidesToShow: 1, dots: true } },
    ],
  };

  return (
    <div className="flex items-center gap-2 relative">
      {/* === Mũi tên trái === */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="text-2xl cursor-pointer hover:text-black text-black absolute -left-8 sm:block hidden"
      >
        <i className="ri-arrow-left-line" />
      </button>

      {/* === Slider content === */}
      <div className="w-full">
        <Slider {...settings} ref={sliderRef}>
          {data.map((item) => (
            <div key={item.id} className="px-3 py-5 md:py-0">
              {isCard ? <Card data={item} /> : <Recommended data={item} />}
            </div>
          ))}
        </Slider>
      </div>

      {/* === Mũi tên phải === */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="text-2xl cursor-pointer hover:text-black text-black sm:block hidden"
      >
        <i className="ri-arrow-right-line" />
      </button>
    </div>
  );
}

export default SliderComponent;
