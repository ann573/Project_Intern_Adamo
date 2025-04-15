import * as Slider from "@radix-ui/react-slider";

type TProp = {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}
export function PriceRangeSlider({
  value,
  onValueChange,
  min = 0,
  max = 1000,
  step = 10,
}: TProp) {
  return (
    <div className="w-full px-4">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
          <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white border border-orange-500 rounded-full shadow-md focus:outline-none cursor-pointer" />
        <Slider.Thumb className="block w-4 h-4 bg-white border border-orange-500 rounded-full shadow-md focus:outline-none cursor-pointer" />
      </Slider.Root>
      <div className="text-sm mt-2 text-gray-600 flex justify-between">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}
