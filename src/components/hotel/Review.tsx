type TProp = {
  data: {
    avatar: string;
    rating: number;
    heading: string;
    name: string;
    time: number;
    comments: string;
  };
  getRatingLabel: (rating: number) => string;
};

const Review = ({ data, getRatingLabel }: TProp) => {
  if (!data) return;
  // Lấy giờ GMT +7
  const date = new Date(data.time * 1000);

  const monthName = date.toLocaleString("en-US", { month: "short" });
  const yearName = date.getFullYear();
  return (
    <div className=" border-b border-[#e5e5e59b] py-10">
      <div className="flex gap-5">
        <img
          src={data.avatar}
          alt="avt_review"
          className="w-20 rounded-full h-fit"
        />
        <div>
          <div className="flex gap-2 text-primary font-semibold">
            Rating {data.rating}{" "}
            <span className="mx-2 text-[#C4C4C4]"> • </span>
            {getRatingLabel(data.rating)}
          </div>

          <h3 className="my-2 font-semibold">{data.heading}</h3>

          <p className="text-[#4F4F4F]">
            {data.name} <span className="mx-2 text-[#C4C4C4]"> • </span>{" "}
            {monthName} {yearName}
          </p>
        </div>
      </div>
      <p className="mt-5 text-[#4F4F4F]">{data.comments}</p>
    </div>
  );
};

export default Review;
