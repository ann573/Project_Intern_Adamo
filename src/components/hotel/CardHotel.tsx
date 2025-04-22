import { IHotel } from "@/interfaces/IHotel";
import BlurImage from "@/components/ImageWithPlaceholder";
import { Link } from "react-router-dom";
import like from "@assets/images/like.png";
import unLike from "@assets/images/no_like.png";
import { useEffect, useState } from "react";

const CardHotel = ({ data }: { data: IHotel }) => {
  const [totalRating, setTotalRating] = useState<number>(0);
  useEffect(() => {
    const total = data.description.reviews.reduce(
      (acc, cur) => (acc += cur.rating),
      0
    );
    setTotalRating(
      Number((total / data.description.reviews.length).toFixed(2))
    );
  }, [totalRating, data]);
  return (
    <div className={`relative`}>
      <BlurImage
        src={data.description.thumbnail}
        className="w-full h-[250px]"
        alt="thumbnail_tours"
      />

      <div className="flex gap-1 my-3">
        <i className="ri-map-pin-line text-orange"></i>
        <p className="text-sub-color-primary line-clamp-1 ">{data.location}</p>
      </div>

      <h3 className="text-heading text-lg font-medium hover:text-orange transition-colors cursor-pointer min-h-[56px] line-clamp-2">
        <Link to={`/hotel/${data.id}`}>{data.name}</Link>
      </h3>

      <div className="mt-3 flex flex-wrap sm:justify-between">
        <div className="flex gap-2 items-center ">
          <p className="text-white bg-primary px-2 py-1 text-sm">
            Rating: <span className="font-semibold">{totalRating}</span>
          </p>
          <span className="text-xs text-sub-color-primary">
            ({data.description.reviews.length} reviews)
          </span>
        </div>

        <p className="text-sm text-sub-color-primary ml-auto">
          from{" "}
          <span className="text-heading text-xl font-medium">
            ${data.cost.toFixed(2)}
          </span> /night
        </p>
      </div>

      <div className=" w-fit text-white px-4 center gap-1 py-[2px] absolute top-6/12">
        {[...Array(data.typeroom)].map((_, i) => (
          <svg
            key={i}
            className="size-5 text-yellow-400 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {data.featured ? (
        <img src={like} className="absolute top-0 right-4 -translate-y-[1px]" />
      ) : (
        <img
          src={unLike}
          className="absolute top-0 right-4 -translate-y-[1px]"
        />
      )}
    </div>
  );
};

export default CardHotel;
