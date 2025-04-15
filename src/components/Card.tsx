import like from "@assets/images/like.png";
import unLike from "@assets/images/no_like.png";

import BlurImage from "@/components/ImageWithPlaceholder";
import { Link } from "react-router-dom";
import ITour from "../interfaces/ITour";

const Card = ({
  data,
  className = "",
}: {
  data: ITour;
  className?: string;
}) => {
  const totalRating =
    data &&
    (data?.rating?.reduce((acc, cur) => acc + cur.rate, 0) /
    data?.rating?.length).toFixed(2);
  return (
    <>
      <div className={`relative  ${className || ""}`}>
        <BlurImage
          src={data.thumb}
          className="w-full h-[250px]"
          alt="thumbnail_tours"
        />

        <div className="flex gap-1 my-3">
          <i className="ri-map-pin-line text-orange"></i>
          <p className="text-sub-color-primary">{data.location}</p>
        </div>

        <h3 className="text-heading text-lg font-medium hover:text-orange transition-colors cursor-pointer min-h-[56px] line-clamp-2">
          <Link to={`/tour/${data.id}`}>{data.title}</Link>
        </h3>

        <div className="mt-3 flex justify-between">
          <div className="flex gap-2 items-center">
            <i className="ri-calendar-schedule-line text-orange"></i>
            <p className="text-sub-color-primary text-sm">
              {typeof data.duration === "number"
                ? `${data.duration} days ${data.duration - 1} nights`
                : `${data.duration} `}
            </p>
          </div>

          <p className="text-sm text-sub-color-primary">
            from{" "}
            <span className="text-heading text-xl font-medium">
              ${data.cost.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="bg-orange w-fit text-white px-4 center gap-1 py-[2px] absolute top-6/12">
          <i className="ri-star-fill text-sm"></i>
          <span className="text-sm">{totalRating}</span>
        </div>

        {data.featured ? (
          <img
            src={like}
            className="absolute top-0 right-4 -translate-y-[1px]"
          />
        ) : (
          <img
            src={unLike}
            className="absolute top-0 right-4 -translate-y-[1px]"
          />
        )}
      </div>
    </>
  );
};

export default Card;
