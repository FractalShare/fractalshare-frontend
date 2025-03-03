'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadSell } from '@/components/utils/OrderProvider';

interface SellData {
  shares: number;
  name: string;
  sharePrice: number;
}

export default function SellConfirmation() {
  const router = useRouter();
  const [sell, setSell] = useState<SellData | null>(null);

  useEffect(() => {
    setSell(loadSell());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col w-2/5 items-center text-center space-y-6 px-6 py-8 border bg-white shadow-lg rounded-3xl">
        <p className="text-2xl font-semibold">Listing Successful!</p>
        <p className="text-lg">
          You have listed {sell?.shares} shares of {sell?.name} at ${sell?.sharePrice}
          per share. Your listing is now visible in the marketplace.
        </p>
        <p className="text-gray-400">
          Funds will be deposited once your shares are matched with a buyer.
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
            View Listing
          </button>
        </div>
      </div>
    </div>
  );
}
