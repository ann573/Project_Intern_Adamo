import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";
import React, { useState } from "react";
import { PriceRangeSlider } from "./PriceSlideRange";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const FilterHotel = () => {
  const [open, setOpen] = React.useState(false);

  const [rangeFilter, setRangeFilter] = useState<number[]>([100, 1000]);

  // State for filters
  const [budget, setBudget] = React.useState([150, 1000]); // [min, max] price range
  const [stars, setStars] = React.useState<number[]>([]); // Array of selected star ratings (e.g., [1, 3, 5])
  const [reviewScore, setReviewScore] = React.useState<string>(); // Array of selected review score ranges (e.g., ["8.5+", "8+"])

  // Reset all filters
  const handleClear = () => {
    setBudget([150, 1000]);
    setStars([]);
    setReviewScore("");
  };

  // Toggle star rating selection
  const toggleStar = (star: number) => {
    if (stars.includes(star)) {
      setStars(stars.filter((s) => s !== star));
    } else {
      setStars([...stars, star]);
    }
  };

  // Apply filters (placeholder for your filtering logic)
  const handleApply = () => {
    console.log("Applying filters:", { budget, stars, reviewScore });

    setOpen(false);
  }; // Add missing closing brace for handleApply

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`transition-all cursor-pointer ${
            open ? "w-24 justify-between text-black bg-white" : "w-fit"
          }`}
        >
          Filter
          <X className={`w-5 h-5 ${open ? "block" : "hidden"}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-4">
        {/* Filter Header */}
        <div className="flex justify-between items-center mb-4">
          <DropdownMenuLabel className="text-lg font-semibold text-[#03387D]">
            Filter By
          </DropdownMenuLabel>
          <Button
            variant="link"
            className="text-blue-600 p-0 h-auto"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
        {/* Budget Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Budget:</h3>
          <PriceRangeSlider
            value={rangeFilter}
            onValueChange={setRangeFilter}
            min={0}
            max={2000}
            step={50}
          />
        </div>

        {/* Hotel Star Section */}
        <DropdownMenuSeparator />

        <div className="my-5">
          <h3 className="text-sm font-medium mb-2">Hotel Star:</h3>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2 my-2">
              <Checkbox
                id={`star-${star}`}
                checked={stars.includes(star)}
                onCheckedChange={() => toggleStar(star)}
              />
              <label
                htmlFor={`star-${star}`}
                className="flex items-center space-x-1"
              >
                {[...Array(star)].map((_, i) => (
                  <svg
                    key={i}
                    className="size-5 text-yellow-400 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </label>
            </div>
          ))}
        </div>

        {/* Review Score Section */}
        <DropdownMenuSeparator />

        <div className="my-6">
          <h3 className="text-sm font-medium mb-2">Review Score:</h3>
          <RadioGroup
            value={reviewScore}
            onValueChange={(value) => setReviewScore(value)}
            className="space-y-1"
          >
            {[
              { label: "Wonderful: 9.5+", value: "9.5+" },
              { label: "Very Good: 9+", value: "9+" },
              { label: "Good: 8+", value: "8+" },
              { label: "Pleasant: 7+", value: "7+" },
            ].map((score) => (
              <div key={score.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  id={`score-${score.value}`}
                  value={score.value}
                />
                <Label htmlFor={`score-${score.value}`} className="text-sm cursor-pointer">
                  {score.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Apply Filter Button */}
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-none cursor-pointer"
          onClick={handleApply}
        >
          Apply Filter
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterHotel;
