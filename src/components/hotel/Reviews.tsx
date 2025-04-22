import { useDetailHotels } from "@/hooks/hotels";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReviewForm, reviewSchema } from "@/schema/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Reviews = ({ id }: { id: string }) => {
  const { data, isLoading } = useDetailHotels(id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      heading: "",
      rating: 5,
      comment: "",
    },
  });

  const totalRating =
    data &&
    data.description.reviews.reduce((acc, item) => acc + item.rating, 0) /
      data.description.reviews.length;

  const getRatingLabel = (rating: number) => {
    if (rating > 9) return "Wonderful";
    if (rating > 8) return "Excellent";
    if (rating > 7) return "Very Good";
    return "Good";
  };

  const watchedRating = watch("rating");

  const onSubmit = (values: ReviewForm) => {
    // handle submit logic here
    console.log(values);
    reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Errorr!!!!</div>;
  }

  return (
    <>
      <section className="flex gap-10">
        <div className="bg-[#FF7B42] w-60">{totalRating}</div>
        <div>
          <h4 className="text-[#2A2A2A] font-semibold text-4xl">
            {getRatingLabel(totalRating as number ?? 0)}{" "}
          </h4>
          <p className="my-5">
            Based on{" "}
            <span className="text-[#4F4F4F] font-bold">
              {data.description.reviews.length} reviews
            </span>
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-primary rounded-none text-primary hover:text-white hover:bg-primary"
              >
                Write a review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Leave us your opinion</DialogTitle>
                <DialogDescription>
                  We would love to hear your experience.
                </DialogDescription>
              </DialogHeader>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Leave us your opinion</DialogTitle>
                  <DialogDescription>
                    We would love to hear your experience.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="heading">Heading</Label>
                    <Input
                      id="heading"
                      {...register("heading")}
                      placeholder="Enter heading"
                    />
                    {errors.heading && (
                      <p className="text-red-500 text-sm">
                        {errors.heading.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <input
                      id="rating"
                      type="range"
                      min={1}
                      max={10}
                      step={0.5}
                      {...register("rating", { valueAsNumber: true })}
                      className="w-full"
                    />
                    <div className="text-center mt-1 font-semibold">
                      {watchedRating ?? 5} / 10
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Comment</Label>
                    <textarea
                      id="comment"
                      {...register("comment")}
                      rows={4}
                      className="w-full border rounded p-2"
                      placeholder="Write your comment..."
                    />
                    {errors.comment && (
                      <p className="text-red-500 text-sm">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default Reviews;
