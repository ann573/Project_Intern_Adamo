import ImageSlider from "@/components/details/ImageSlide";
import { getDetailTour } from "@/features/tour/tourAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const DetailTour = () => {
  const id = useParams().id;

  const { tour, isLoading } = useSelector((state) => state.tours);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  const totalRating =
    tour?.rating?.reduce((acc, cur) => acc + cur.rate, 0) /
    tour?.rating?.length;

  useEffect(() => {
    dispatch(getDetailTour({ id }));
    setData(tour);
  }, [dispatch, id, tour]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="max-w-[1200px] mx-auto xl:px-0 px-5">
      <div className="my-10 text-content xl:px-0 px-10">
        <p className="flex justify-start gap-5">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <Link to={"/tours"} className="hover:underline">
            Tours
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <span className="select-none">Detail tour</span>
        </p>
      </div>

      <h1 className="text-4xl font-semibold w-2/3">{tour?.title}</h1>

      {/* ====================================== */}
      <p className="flex gap-4 items-center text-sub-color-primary my-5">
        <i className="ri-map-pin-line text-orange"></i>
        {tour?.location}
      </p>

      {/* =========================================== */}
      <div className="flex gap-5 text-sub-color-primary mb-10">
        <p className="bg-orange text-white w-fit center py-1 px-3 gap-3 text-sm">
          <i className="ri-star-fill"></i>
          {totalRating?.toFixed(1) || 0}{" "}
          {/* Nếu totalRating là null hoặc undefined, thì hiển thị 0 */}
        </p>

        <p>{tour?.rating?.length || 0} reviews</p>
      </div>

      {/* ========================thumbnail========================= */}
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <ImageSlider thumbnail={data?.thumb} image={data?.image} />
        </div>
      </div>
    </section>
  );
};

export default DetailTour;
