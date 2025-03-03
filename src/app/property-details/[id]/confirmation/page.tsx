'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadOrder } from '@/components/utils/OrderProvider';

interface BuyData {
  amount: number;
  sharePrice: number;
  estimatedShares: number;
  address: string;
}

export default function SellConfirmation() {
  const router = useRouter();
  const [buy, setBuy] = useState<BuyData | null>(null);

  useEffect(() => {
    setBuy(loadOrder());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col w-2/5 items-center text-center space-y-6 px-6 py-8 border bg-white shadow-lg rounded-3xl">
        <p className="text-2xl font-semibold">Investment Successful!</p>
        <p className="text-lg">
          You have successfully invested ${buy?.amount} and received {buy?.estimatedShares} shares on {buy?.address}
        </p>
        <p className="text-gray-400">
          Funds are being processed and your shares will be finalized within 1-3 business days
        </p>
        <div className="flex flex-col items-center w-full space-y-4">
          <button
            onClick={() => router.push('/home')}
            className="w-1/2 py-3 bg-primary text-white rounded-2xl hover:scale-105 transition"
          >
            View Portfolio
          </button>
          <button
            onClick={() => router.push('/explore')}
            className="w-1/2 py-3 border border-primary text-primary rounded-2xl hover:scale-105 transition"
          >
            Explore more properties
          </button>
        </div>
      </div>
    </div>
  );
}
