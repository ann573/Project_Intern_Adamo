import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <Skeleton className={"w-full h-50"} />
              <Skeleton className={"w-full h-10 mt-5"} />
              <div className="flex justify-between">
                <Skeleton className={"w-1/3 h-10 mt-5"} />
                <Skeleton className={"w-1/3 h-10 mt-5"} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CardSkeleton;
