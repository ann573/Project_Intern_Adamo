import { useDetailHotels, useUpdateData } from "@/hooks/hotels";

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
import { useAuthStore } from "@/zusTand/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "sonner";
import LoadingSpinner from "../LoadingSpinner";
import Pagination from "../Pagination";
import Review from "./Review";

const Reviews = ({ id }: { id: string }) => {
  const { t } = useTranslation("hotel");
  const { data, isLoading } = useDetailHotels(id);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const { mutateAsync, isPending } = useUpdateData();
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
      rating: 8,
      comments: "",
    },
  });

  const totalRating =
    data &&
    data.description.reviews.reduce((acc, item) => acc + item.rating, 0) /
      data.description.reviews.length;

  const count = data?.description.reviews.length;
  const getRatingLabel = (rating: number) => {
    if (rating > 9) return t("rv.score.wonderful");
    if (rating > 8) return t("rv.score.pleasant");
    if (rating > 7) return t("rv.score.vGood");
    return t("rv.score.good");
  };

  const watchedRating = watch("rating");

  const onSubmit = async (values: ReviewForm) => {
    if (!user) {
      toast.error("Please login to leave a review", {
        style: {
          background: "#FF4747",
          color: "white",
        },
      });
      return;
    }
    const day = new Date();
    const newReview = {
      ...values,
      name: user?.name,
      time: Math.floor(day.getTime() / 1000),
      avatar:
        "https://kenh14cdn.com/cPLqMkXoPs3Tkua5x0JnElZd2udVtV/Image/2015/03/updates/150330dep03-7ef68.jpg",
    };
    data?.description.reviews.unshift(newReview);
    if (!data) return;
    await mutateAsync(data);
    setOpen(false);

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
      {isPending && <LoadingSpinner />}
      <section className="flex gap-10 my-5">
        <div className="bg-[#FF7B42] w-52 center text-white text-5xl font-bold">
          {totalRating?.toFixed(2)}
        </div>

        <div>
          <h4 className="text-[#2A2A2A] font-semibold text-4xl">
            {getRatingLabel((totalRating as number) ?? 0)}{" "}
          </h4>
          <p className="my-5">
            <Trans i18nKey="rv.basedOnReviews" count={count} ns={"hotel"}>
              Based on <span className="text-[#4F4F4F] font-bold">{count}</span>{" "}
              reviews
            </Trans>
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-primary px-10 rounded-none text-primary hover:text-white hover:bg-primary"
              >
                {t("rv.write")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("rv.form.heading")}</DialogTitle>
                <DialogDescription>{t("rv.form.sub")}</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="heading" className="mb-3">
                    {t("rv.form.label_head")}
                  </Label>
                  <Input
                    id="heading"
                    {...register("heading")}
                    placeholder={t("rv.form.place_heading")}
                  />
                  {errors.heading && (
                    <p className="text-red-500 text-sm">
                      {errors.heading.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="rating" className="mb-3">
                    {t("rv.form.label_rating")}
                  </Label>
                  <div className="flex justify-between">
                    <input
                      id="rating"
                      type="range"
                      min={1}
                      max={10}
                      step={0.5}
                      {...register("rating", { valueAsNumber: true })}
                      className="w-2/3 accent-orange-500 bg-gray-200 cursor-pointer"
                    />
                    <div className="text-center mt-1 font-semibold">
                      {watchedRating ?? 5} / 10
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment" className="mb-3">
                    {t("rv.form.label_cmt")}
                  </Label>
                  <textarea
                    id="comment"
                    {...register("comments")}
                    rows={4}
                    className="w-full border rounded p-2 focus:outline-none resize-none"
                    placeholder={t("rv.form.place_cmt")}
                  />
                  {errors.comments && (
                    <p className="text-red-500 text-sm">
                      {errors.comments.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">{t("rv.form.btn")}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section>
        {data?.description.reviews
          .slice((page - 1) * 2, page * 4)
          .map((item, index) => {
            return (
              <Review key={index} data={item} getRatingLabel={getRatingLabel} />
            );
          })}

        {
          <Pagination
            page={page}
            setPage={setPage}
            limit={4}
            total={data.description.reviews.length}
          />
        }
      </section>
    </>
  );
};

export default Reviews;
