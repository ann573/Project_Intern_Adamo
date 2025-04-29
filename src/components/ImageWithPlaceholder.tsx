import { Skeleton } from '@/components/ui/skeleton'
import { useState, ImgHTMLAttributes } from 'react'

interface ImageWithPlaceholderProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({ src, alt, className, ...rest }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className='relative'>
      {!loaded && <Skeleton className={`absolute top-0 left-0 w-full h-full ${className}`} />}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </div>
  )
}

export default ImageWithPlaceholder
