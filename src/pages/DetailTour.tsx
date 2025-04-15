import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import FormPrice from "@/components/details/FormPrice";
import ImageSlider from "@/components/details/ImageSlide";
import { getDetailTour, getTours } from "@/features/tour/tourAction";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import Description from "@/components/details/Description";
import AdditionalInfo from "@/components/details/AdditionalInfo";
import Reviews from "@/components/details/Reviews";
import Card from "@/components/Card";

const DetailTour = () => {
  const id = useParams().id;

  const [choose, setChoose] = useState(1);
  const { tour, tours, isLoading } = useAppSelector((state) => state.tours);
  const dispatch = useAppDispatch();

  const heading = ["Descriptions", "Additional Info", "Reviews"];

  const totalRating =
    tour &&
    (tour?.rating?.reduce((acc, cur) => acc + cur.rate, 0) /
    tour?.rating?.length).toFixed(2);

  useEffect(() => {
    if (!id) return;
    dispatch(getDetailTour({ id }));
    if (tour)
      dispatch(
        getTours({ page: 1, limit: 6, request: `type_like=${tour?.type}` })
      );
  }, [dispatch, id, tour?.type]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <section className="max-w-[1200px] mx-auto xl:px-0 px-5 mb-20">
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
          {totalRating || 0}{" "}
        </p>

        <p>{tour?.rating?.length || 0} reviews ({tour?.rating.length})</p>
      </div>

      {/* ========================thumbnail========================= */}
      <div className="grid grid-cols-3 gap-15">
        <div className="col-span-2">
          <ImageSlider />

          <section>
            <div className="flex justify-between mt-5">
              {heading.map((item, index) => (
                <h2
                  key={index}
                  className={`text-xl font-semibold py-5 cursor-pointer ${
                    choose === index + 1 ? "text-orange" : "text-[#888888]"
                  }`}
                  onClick={() => setChoose(index + 1)}
                >
                  {item}
                </h2>
              ))}
            </div>
            <hr />
            {choose === 1 && <Description />}
            {choose === 2 && <AdditionalInfo />}
            {choose === 3 && <Reviews />}
          </section>

          <section className="w-full">
            <h3 className="font-bold my-5 text-2xl text-heading">Related tours</h3>
            <div className="grid grid-cols-2 3xl:xl:grid-cols-3 gap-5">
              {tours &&
                tours?.map((item) => <Card data={item} key={item.id} />)}
            </div>
          </section>
        </div>

        <div>
          <form className="bg-[#F4F4F4] sticky top-5">
            <h2 className="py-7 px-5 font-medium text-xl">
              <span className="text-sm font-light">from</span> $
              {tour?.cost.toFixed(2)}
            </h2>
            <hr />
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <span className="text-sub-color-primary text-xs">
                    Duration:
                  </span>
                  <p className="font-semibold text-sm">
                    {tour?.duration} days -{" "}
                    {tour?.duration && tour?.duration - 1} nights
                  </p>
                </div>
                <div>
                  <span className="text-sub-color-primary text-xs">
                    Tour type:
                  </span>
                  <p className="font-semibold text-sm">{tour?.type}</p>
                </div>
              </div>
              <FormPrice />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DetailTour;
