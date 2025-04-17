import FilterHotel from "@/components/FilterHotel";
import FormSearchBanner from "@/components/FormSearchBanner";
import { useHotels } from "@/hooks/hotels";
import { useState } from "react";
import { Link } from "react-router-dom";
import  Pagination  from '@/components/Pagination';

const HotelPage = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [page, setPage] = useState(1)

  const {data} = useHotels()
  const toltalItems = data?.items || 0
  return (
    <>
      <section className="text-center grid sm:grid-cols-12 grid-col-2 xl:gap-0 gap-5 banner_hotel max-w-[2000px] mx-auto xl:px-0 px-10">
        <div className="lg:col-span-7 sm:col-span-5 flex flex-col justify-end ">
          <div className="my-auto xl:pl-40 sm:block hidden">
            <p className="text-[#FFF2CF] text-left">
              Search hundreds of tours and more
            </p>
            <h1 className=" text-[#ffffff] font-medium xl:text-6xl text-3xl top-1/2 mt-5 text-left">
              From cozy country <br className="md:block hidden" /> homes to
              funky city <br className="lg:block hidden" /> apartments
            </h1>
          </div>

          <div className="w-full h-20 bg-white pb-5 pt-10 relative xl:block hidden"></div>
        </div>

        {/* ================= second col ================= */}
        <div className="sm:col-span-5 self-end justify-self-start w-full">
          <FormSearchBanner date={date} setDate={setDate} />
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto my-5 text-content xl:px-0 px-10">
        <p className="flex justify-start gap-5">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          <Link to={"/hotels"} className="hover:underline">
            Hotel
          </Link>
        </p>
      </div>

      <section className="max-w-[1200px] mx-auto my-5">
        <div className="flex justify-between items-center relative xl:px-0 px-10">
          <h2 className="text-heading md:text-[40px] text-2xl font-medium">
            Hotels
          </h2>
          <FilterHotel />
        </div>
      </section>

      <Pagination page={page} setPage={setPage} total={data?.items} />
      {/* {data} */}
    </>
  );
};

export default HotelPage;
