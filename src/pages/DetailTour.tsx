import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import DetailSkeleton from "@/components/DetailSkeleton";
import AdditionalInfo from "@/components/detailTour/AdditionalInfo";
import Description from "@/components/detailTour/Description";
import FormPrice from "@/components/detailTour/FormPrice";
import ImageSlider from "@/components/detailTour/ImageSlide";
import Reviews from "@/components/detailTour/Reviews";
import Card from "@/components/listTour/Card";
import { getDetailTour, getTours } from "@/features/tour/tourAction";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { useTranslation } from "react-i18next";

const DetailTour = () => {
  const { t } = useTranslation("tour");
  const id = useParams().id;

  const [choose, setChoose] = useState(1);
  const { tour, tours, isLoading } = useAppSelector((state) => state.tours);
  const dispatch = useAppDispatch();

  const heading = [`${t("descriptions")}`, `${t("add")}`, `${t("review")}`];

  const totalRating =
    tour &&
    (
      tour?.rating?.reduce((acc, cur) => acc + cur.rate, 0) /
      tour?.rating?.length
    ).toFixed(2);

  useEffect(() => {
    if (!id) return;
    dispatch(getDetailTour({ id }));
    if (tour)
      dispatch(
        getTours({ page: 1, limit: 6, request: `type_like=${tour?.type}` })
      );
  }, [dispatch, id, tour?.type]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  return (
    <main className="max-w-[1200px] mx-auto xl:px-0 px-5 mb-20">
      <section className="my-10 text-content xl:px-0 md:px-10">
        <p className="flex justify-start gap-5">
          <Link to={"/"} className="hover:underline">
            {t("bread_cum.home")}
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <Link to={"/tours"} className="hover:underline">
            {t("bread_cum.tour")}
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <span className="select-none">{t("bread_cum.detail")}</span>
        </p>
      </section>

      <h1 className="md:text-4xl text-3xl font-semibold md:w-2/3">
        {tour?.title}
      </h1>

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

        <p>
          {tour?.rating?.length || 0} {t("reviews")} ({tour?.rating.length})
        </p>
      </div>

      {/* ========================thumbnail========================= */}
      <section className="grid lg:grid-cols-3 grid-cols-2 xl:gap-15 gap-5">
        <div className="col-span-2 order-2 lg:order-1">
          <ImageSlider />

          <section>
            <div className="flex justify-between mt-5">
              {heading.map((item, index) => (
                <h2
                  key={index}
                  className={`md:text-xl font-semibold py-5 cursor-pointer ${
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
            <h3 className="font-bold my-5 text-2xl text-heading">
              {t("related")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 3xl:xl:grid-cols-3 md:gap-5 gap-y-10 ">
              {tours &&
                tours?.map((item) => <Card data={item} key={item.id} />)}
            </div>
          </section>
        </div>

        <div className="order-1 lg:order-2 md:col-span-1 col-span-2">
          <form className="bg-secondary dark:bg-secondary  sticky top-5">
            <h2 className="py-7 px-5 font-medium text-xl">
              <span className="text-sm font-light">{t("from_price.from")}</span>{" "}
              ${tour?.cost.toFixed(2)}
            </h2>
            <hr />
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <span className="text-sub-color-primary text-xs">
                    {t("from_price.duration")}
                  </span>
                  <p className="font-semibold text-sm">
                    {tour?.duration} {t("from_price.days")} -{" "}
                    {tour?.duration && tour?.duration - 1}{" "}
                    {t("from_price.night")}
                  </p>
                </div>
                <div>
                  <span className="text-sub-color-primary text-xs">
                    {t("from_price.type")}
                  </span>
                  <p className="font-semibold text-sm">{tour?.type}</p>
                </div>
              </div>
              <FormPrice />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default DetailTour;
