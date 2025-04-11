import React, { useState } from "react";
import { PriceRangeSlider } from "@components/PriceSlideRange";
import { Checkbox } from "@components/ui/checkbox";
import { Button } from "@components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Filter = ({
  range,
  setRangeFilter,
  uniqueTypes,
  setRequest,
  setIsSearch,
  setPage
}) => {
  const initialRange = [0, 2000];
  const [duration, setDuration] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    queryParams.set("cost_gte", range[0]);
    queryParams.set("cost_lte", range[1]);

    if (duration) {
      if (duration === "other") queryParams.set("duration_gte", 7);
      else queryParams.set("duration_gte", duration - 2);
      queryParams.set("duration_lte", duration);
    }

    if (selectedTypes.length > 0) {
      selectedTypes.forEach((type) => {
        queryParams.append("type", type);
      });
    }

    setRequest(queryParams.toString());
    setIsSearch(true);
    setPage(1);
  };

  const isDirty =
    duration !== "" ||
    selectedTypes.length > 0 ||
    range[0] !== initialRange[0] ||
    range[1] !== initialRange[1];

  const handleClear = () => {
    setDuration("");
    setSelectedTypes([]);
    setRangeFilter(initialRange);
    
  };

  console.log(range);
  return (
    <form
      onSubmit={handleSubmit}
      className="absolute w-[250px] bg-white shadow-2xl p-3 left-full -translate-x-full top-25 z-10"
    >
      <div className="flex justify-between">
        <h3 className="text-[#03387D]">Filter By</h3>
        <p
          className={`p-[1px] select-none font-semibold ${
            isDirty
              ? `hover:underline cursor-pointer `
              : `text-sub-color-primary/60`
          }`}
          onClick={() => handleClear()}
        >
          Clear
        </p>
      </div>

      <div className="border-b pb-4 mb-5">
        <h3 className="font-semibold text-heading mt-3 mb-7">Budget: </h3>
        <PriceRangeSlider
          value={range}
          onValueChange={setRangeFilter}
          min={0}
          max={2000}
          step={50}
        />
      </div>

      <div className="border-b pb-4 mb-5">
        <h3 className="text-[18px] font-semibold text-heading mt-3 mb-4">
          Duration
        </h3>

        <RadioGroup
          name="duration"
          value={duration}
          onValueChange={setDuration}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="option-one" />
            <Label className="font-medium cursor-pointer" htmlFor="option-one">
              0 - 3 days
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="option-two" />
            <Label className="font-medium cursor-pointer" htmlFor="option-two">
              3 - 5 days
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="7" id="option-three" />
            <Label
              className="font-medium cursor-pointer"
              htmlFor="option-three"
            >
              5 - 7 days
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="option-four" />
            <Label className="font-medium cursor-pointer" htmlFor="option-four">
              Over 1 week
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-[18px] font-semibold text-heading mt-3 mb-4">
          Type
        </h3>
        <ul className="flex flex-col gap-5">
          {uniqueTypes.map((item, index) => (
            <li className="flex gap-3" key={index}>
              <Checkbox
                id={item}
                name="type"
                value={item}
                checked={selectedTypes.includes(item)}
                onCheckedChange={(checked) => {
                  setSelectedTypes((prev) =>
                    checked ? [...prev, item] : prev.filter((v) => v !== item)
                  );
                }}
              />
              <label htmlFor={item} className="font-medium cursor-pointer">
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <Button type="submit" className="w-full mt-5 mb-3" disable={isDirty}>
        Apply Filter
      </Button>
    </form>
  );
};

export default Filter;
