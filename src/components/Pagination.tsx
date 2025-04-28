import React from "react";

// asset
import leftArrow from "@assets/icons/arrow-left.svg";
import rightArrow from "@assets/icons/arrow-right.svg";
import { useTranslation } from "react-i18next";

type TProps = {
  page: number;
  total: number;
  limit?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
const Pagination = ({ page, limit = 9, setPage, total }: TProps) => {
  const { t } = useTranslation("home");

  const arr = Array.from({ length: Math.ceil(total / limit) }, (_, i) => i);
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-center items-center gap-10 sm:gap-0 sm:justify-end w-full col-span-3 mt-10 mb-20">
        <p className="text-[#8E8E93] font_apercu flex items-center sm:gap-5 gap-1">
          {t("panigation")}{" "}
          <span>
            {page} / {Math.ceil(total / limit)}
          </span>
        </p>
        <div className="flex gap-4 lg:ml-70 sm:ml-30 item-center">
          <div
            className="sm:size-9 size-7 bg-[#E8E9EA] p-2 center cursor-pointer"
            onClick={() =>
              setPage((prev) => {
                if (prev === 1) return arr.length;
                return prev - 1;
              })
            }
          >
            <img src={leftArrow} alt="arrow_left " />
          </div>

          {arr.map((_, index) => (
            <div
              key={index}
              className={`sm:size-9 size-7 bg-[#E8E9EA] p-2 center cursor-pointer ${
                page === index + 1 ? "bg-black text-white" : "text-content"
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </div>
          ))}
          <div
            className="sm:size-9 size-7 bg-[#E8E9EA] p-2 center cursor-pointer"
            onClick={() =>
              setPage((prev) => {
                if (prev === arr.length) return 1;
                return prev + 1;
              })
            }
          >
            <img src={rightArrow} alt="arrow_right" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
