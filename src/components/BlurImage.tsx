import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const ImageWithPlaceholder = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      {!loaded && (
        <Skeleton className={`absolute top-0 left-0 w-full h-full ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
