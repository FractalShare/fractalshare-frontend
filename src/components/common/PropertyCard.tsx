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
            {isActive ? (
              <div className="flex items-center gap-2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span>Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-black/80 text-white text-sm px-3 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span>Inactive</span>
              </div>
            )}
          </div>
        </div>
      <div className="p-4 text-left space-y-1">
        <p className="text-[14px] font-bold">From ${pricePerShare} per share</p>
        <p className="text-xs font-semibold">Values at ${valuation}</p>
        <p className="text-xs text-[#333333]">{numOfAcres} acres • {typeOfLand} • {percentRemaining}% remaining</p>
        <p className="text-xs text-[#333333]">{location}</p>
      </div>
    </div>
  );
}
