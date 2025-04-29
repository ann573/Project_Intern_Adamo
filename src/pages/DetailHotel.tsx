import CardSkeleton from "@/components/CardSkeleton";
import DetailSkeleton from "@/components/DetailSkeleton";
import ImageSlider from "@/components/detailTour/ImageSlide";
import AdditionalInfoHotel from "@/components/hotel/AdditionalInfoHotel";
import DescriptionHotel from "@/components/hotel/DescriptionHotel";
import FormPriceHotel from "@/components/hotel/FormPriceHotel";
import Reviews from "@/components/hotel/Reviews";
import { useDetailHotels, useRelatedHotels } from "@/hooks/hotels";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import CardHotel from "./../components/hotel/CardHotel";

const HotelDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("hotel");
  const { data, isLoading } = useDetailHotels(id as string);
  const { data: dataRelated, isLoading: isLoadingRelated } = useRelatedHotels(
    data?.typeroom as number
  );
  const [choose, setChoose] = useState(1);

  const totalRating =
    data &&
    (
      data.description.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
      data.description.reviews.length
    ).toFixed(2);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  const heading = [
    `${t("selectRoom")}`,
    `${t("description")}`,
    `${t("review")}`,
  ];

  return (
    <main className="max-w-[1200px] mx-auto xl:px-0 px-5 mb-20">
      <section className="my-10 text-content xl:px-0 md:px-10">
        <p className="flex justify-start gap-5">
          <Link to={"/"} className="hover:underline">
            {t("breadCum.home")}
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <Link to={"/hotels"} className="hover:underline">
            {t("breadCum.hotel")}
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <span className="select-none">{t("breadCum.detail")}</span>
        </p>
      </section>

      <section>
        <h1 className="md:text-4xl text-3xl font-semibold md:w-2/3">
          {data?.name}
        </h1>

        {/* ====================================== */}
        <p className="flex gap-4 items-center text-sub-color-primary my-5">
          <i className="ri-map-pin-line text-orange"></i>
          {data?.location}
        </p>

        <div className="flex gap-5 text-sub-color-primary mb-10 ">
          <div className="flex gap-2 items-center">
            <p className="bg-[#FF7B42] text-white center py-1 px-2 font-semibold">
              <span className="text-sm mr-1 font-light">{t("rating")}</span>{" "}
              {totalRating}
            </p>
            <span className="text-sub-color-primary">
              ({data?.description?.reviews.length || 0} {t("reviews")})
            </span>
          </div>

          <p className=" text-[#FFAD32] w-fit center py-1 px-3 gap-3 text-sm">
            {Array.from({ length: data?.typeroom || 0 }).map((_, index) => {
              return <i key={index} className="ri-star-fill"></i>;
            })}
          </p>
        </div>
      </section>

      {/* ================================================== */}
      <section className="grid lg:grid-cols-3 grid-cols-2 xl:gap-15 gap-5">
        <div className="col-span-2 order-2 lg:order-1">
          <ImageSlider />

          {/* ===================================================== */}
          <div>
            <div className="flex justify-between mt-5">
              {heading.map((item, index) => (
                <h2
                  key={index}
                  className={`md:text-xl font-semibold py-5 cursor-pointer ${
                    choose === index + 1 ? "text-orange" : "text-heading-second"
                  }`}
                  onClick={() => setChoose(index + 1)}
                >
                  {item}
                </h2>
              ))}
            </div>
            <hr />
            {choose === 1 && <DescriptionHotel id={id as string} />}
            {choose === 2 && <AdditionalInfoHotel id={id as string} />}
            {choose === 3 && <Reviews id={id as string} />}
          </div>
        </div>

        <div className="order-1 lg:order-2 md:col-span-1 col-span-2">
          <div className="order-1 lg:order-2 md:col-span-1 col-span-2">
            <div className="bg-secondary dark:bg-secondary sticky top-5">
              <h2 className="p-5 font-medium text-xl">
                <span className="text-sm font-light">{t("from")}</span> $
                {data?.cost.toFixed(2)}
              </h2>
              <hr />
              <div className="p-5">
                <FormPriceHotel id={id as string} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      <section className="my-20">
        <h3 className="text-heading-second mt-5 text-3xl font-bold mb-5">
          {t("related")}
        </h3>
        {isLoadingRelated ? (
          <CardSkeleton />
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
            {dataRelated?.map((item, index) => (
              <CardHotel data={item} key={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HotelDetail;
