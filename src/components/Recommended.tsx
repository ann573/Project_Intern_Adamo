import React from "react";

const Recomended = ({ data }) => {
  return (
    <>
      <div >
        <div className="h-fit overflow-hidden">
          <img
            src={data.thumbnail}
            alt={data.name}
            className="w-full hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
          />
        </div>
        <h3 className="text-heading font-medium text-xl mt-5 mb-1">
          {data.name}
        </h3>
        <p className="text-sub-color-primary text-sm">{data.experience}</p>
      </div>
    </>
  );
};

export default Recomended;
