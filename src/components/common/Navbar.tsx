'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BiBell } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const { data: user } = useRetrieveUserQuery();

  const isInvest = pathname === '/explore';
  const isSell   = pathname === '/sell';

  return (
    <>
      {/* NAVBAR */}
      <nav
        className='w-full bg-white border-b border-gray-200'
      >
        {/* TOP ROW */}
        <div className="flex items-center justify-between h-16 px-8">
          {/* Logo */}
          <div className="w-1/3">
            <Image className='cursor-pointer' onClick={() => router.push('/home')} src="/images/fs.svg" alt="Fractal Share" width={150} height={150} />
          </div>

          <div className="w-1/3 flex items-center justify-center space-x-10 text-sm font-medium">
        {/* Invest */}
        <Link
            href="/explore"
            className={`
              flex group items-center space-x-2 pb-1 transition-colors hover:text-[#1F4F36]
              ${isInvest ? 'border-b-2 border-black' : ''}
            `}
          >
            <div className="relative w-10 h-10">
              <Image
                src="/images/upprice.png"
                alt="Growth arrows"
                fill
                priority
                className="object-contain"
              />

              <Image
                src="/images/coin.png"
                alt="Coin"
                width={23}
                height={23}
                className="absolute -top-2 left-1/2 group-hover:animate-spin-slow"
              />
            </div>
            <span className="text-lg font-medium">Invest</span>
        </Link>


        {/* Sell */}
        <Link
          href="/sell"
          className={`
            group
            flex items-center space-x-2 pb-1
            transition-colors hover:text-[#1F4F36]
            ${isSell ? 'border-b-2 border-black' : ''}
          `}
        >
          {/* post + hanging sign */}
          <div className="relative w-10 h-10">
            {/* wooden post & arm */}
            <Image
              src="/images/stand.png"
              alt="Sign post"
              fill
              className="object-contain z-20"
            />

            {/* hanging sign — pivots from the top‑left corner */}
            <Image
              src="/images/sign.png"
              alt="For Sale"
              width={26}
              height={26}
              className="
                absolute top-[6px] left-[9px]
                origin-top-left
                group-hover:animate-swing
              "
            />
          </div>

          <span className="text-lg font-medium">Sell</span>
        </Link>

      </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center text-sm space-x-6 w-1/3 justify-end relative">
            <Link
              href="/landowner-landing"
              className='hover:bg-gray-200 hover:scale-105 rounded-full p-2
                         transition-transform duration-300 ease-in-out'
            >
              Are you a Land Owner?
            </Link>

            <Link
              href="/notifications"
              className="bg-gray-200 p-2 rounded-full hover:scale-110 transition"
            >
              <BiBell size={25} />
            </Link>

            <Link href="/account" className="hover:scale-110 transition">
              {user?.photoUrl ? (
                <Image
                  src={user.photoUrl}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="text-gray-300" size={40} />
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
