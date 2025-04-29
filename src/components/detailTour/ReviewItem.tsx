type TProp = {
  data: {
    title: string;
    avatar: string;
    heading: string;
    comments: string;
    rate: number;
    time: number;
  };
};

const ReviewItem = ({ data }: TProp) => {
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
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <i
                className={`ri-star-fill ${
                  data.rate > index ? "text-[#FFB612]" : "text-[#888888]"
                }`}
                key={index}
              ></i>
            ))}
          </div>

          <h3 className="my-2 font-semibold">{data.heading}</h3>

          <p className="text-color-content-second">
            {data.title} · {monthName} {yearName}
          </p>
        </div>
      </div>
      <p className="mt-5 text-color-content-second">{data.comments}</p>
    </div>
  );
};

export default ReviewItem;
