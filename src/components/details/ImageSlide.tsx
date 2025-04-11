import { useRef } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const CustomSlider = () => {
  const { tour, isLoading } = useSelector((state) => state.tours);
  const sliderRef = useRef(null);
    console.log(tour);
  // Cài đặt cho slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    customPaging: (i) => (
      <div className="custom-dot">
        <img
          src={tour?.image[i].src}
          alt={`thumbnail-${i}`}
          onClick={() => sliderRef.current.slickGoTo(i)}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            cursor: "pointer",
            border: "2px solid transparent",
          }}
        />
      </div>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  if (!tour?.image || tour?.image.length === 0) {
    return <div>No images available</div>;
  }
  return (
    <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
      <Slider ref={sliderRef} {...settings}>
        {tour.image?.map((image) => (
          <div key={image.id}>
            <img
              src={image.src}
              alt={`slide-${image.id}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        .custom-dots {
          display: flex !important;
          justify-content: center;
          gap: 10px;
          padding: 10px 0;
        }

        .custom-dot img:hover {
          border-color: #007bff;
        }

        .slick-active .custom-dot img {
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default CustomSlider;
