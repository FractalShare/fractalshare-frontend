'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';

interface PropertyCardProps {
  imageSrc: string;
  pricePerShare: number;
  valuation: number;
  numOfAcres: number;
  typeOfLand: string;
  percentRemaining: number;
  isActive: boolean;
  location: string;
}

export default function PropertyCard({
  imageSrc,
  pricePerShare,
  valuation,
  numOfAcres,
  typeOfLand,
  percentRemaining,
  isActive,
  location,
}: PropertyCardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden cursor-pointer"
         onClick={() => router.push("/property-details/1234")}>
        <div className="w-full h-32 relative rounded-t-3xl overflow-hidden">
          <Image
            src={imageSrc}
            alt="Land Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
          <div className="absolute top-2 left-2 z-20">
              <div className="flex items-center gap-2 bg-white/80 text-white text-xs px-3 py-1 rounded-full">
                {/* <span className="h-2 w-2 rounded-full bg-red-500" /> */}
                <span className='text-newblack font-medium'>{percentRemaining}% remaining</span>
              </div>
          </div>
        </div>
      <div className="p-4 text-left space-y-1">
        <div>
          <p className="text-sm font-semibold">From ${pricePerShare} per share</p>
        </div>
        <p className="text-xs font-medium">Valued at ${valuation.toLocaleString()}</p>
        <p className="text-xs text-basetext font-medium">{numOfAcres} acres • {typeOfLand}</p>
        <p className="text-xs text-basetext">{location}</p>
      </div>
    </div>
  );
}
