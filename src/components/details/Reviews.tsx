import { useAppSelector } from "@/hooks/app";
import { Button } from "@components/ui/button";
import { useState } from "react";
import ReviewItem from "./ReviewItem";
import Pagination from "@/components/Pagination";

const Reviews = () => {
  const { tour } = useAppSelector((state) => state.tours);

  const [page, setPage] = useState(1);
  const rateCount: Record<string, number> = {};
  let totalRating = 0;

  if (tour) {
    totalRating =
      tour?.rating.reduce((acc, cur) => acc + cur.rate, 0) /
      tour?.rating.length;

    for (const review of tour?.rating || []) {
      const rate = review.rate.toString();
      rateCount[rate] = (rateCount[rate] || 0) + 1;
    }
  }
  return (
    <>
      <section className="bg-[#F4F4F4] grid grid-cols-5 items-center gap-5 my-10 rounded-2xl py-8">
        {/* ==================== first col ============================== */}
        <div className="center flex-col gap-5 col-span-2 px-5 border-r">
          <span className="text-[#2A2A2A] text-5xl font-bold">
            {totalRating}/5
          </span>
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="text-[#2A2A2A] text-3xl font-bold">
                <i
                  className={`ri-star-fill ${
                    totalRating && index < totalRating
                      ? "text-[#FFB13C]"
                      : "text-[#888888]"
                  }`}
                ></i>
              </span>
            ))}
          </div>
          <p>
            Based on{" "}
            <span className="text-[#2d2c2c] font-bold">
              {tour?.rating.length} reviews
            </span>
          </p>
        </div>

        {/* ==================== second col ============================== */}
        <div className="col-span-3 px-5 flex flex-col-reverse gap-y-3">
          {Array.from({ length: 5 }).map((_, index) => {
            const width =
              tour &&
              `${(rateCount[index + 1] / tour?.rating.length || 0) * 100}%`;
            return (
              <div className="flex items-center gap-5">
                <div key={index} className="flex items-center gap-2">
                  <span className="w-4 text-right font-semibold text-lg">
                    {index + 1}
                  </span>
                  <svg
                    className="w-4 h-4 text-[#C4C4C4]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.965c.3.922-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.782.57-1.837-.196-1.538-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                </div>
                <div className="min-w-[250px] h-2 bg-[#E5E5E5] rounded-4xl relative">
                  <div
                    className={`h-2 bg-[#FFB13C] rounded-4xl`}
                    style={{ width: width || "0%" }}
                  ></div>
                </div>
                <p className="flex gap-1">
                  <span className="min-w-5 ">{rateCount[index + 1] || 0}</span>{" "}
                  reviews
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <hr />

      <div className="my-10 px-5 ">
        <form>
          <div className="flex gap-7">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              className="max-w-20 h-fit rounded-full"
            />
            <textarea
              className="resize-none w-full border p-5 focus:outline-none"
              rows={5}
            ></textarea>
          </div>

          <div className="flex">
            <Button className="px-10 py-5 rounded-none ml-auto mt-5 cursor-pointer">
              Comment
            </Button>
          </div>
        </form>
      </div>

      <hr />

      <section>
        {tour &&
          tour?.rating.slice((page - 1) * 2, page * 2).map((item, index) => {
            return <ReviewItem key={index} data={item} />;
          })}

        {tour && (
          <Pagination
            page={page}
            setPage={setPage}
            limit={2}
            total={tour?.rating.length}
          />
        )}
      </section>
    </>
  );
};

export default Reviews;
