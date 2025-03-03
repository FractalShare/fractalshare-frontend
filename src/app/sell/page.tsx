'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { NavbarSearch } from "@/components/common";
import { FiFilter } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";
import { FaChevronUp } from "react-icons/fa";
import { saveSell } from "@/components/utils/OrderProvider";

type Row = {
  name: string;
  shares: number;
  acquisitionPrice: number;
  currentPrice: number;
  priceChange: "up" | "flat";
  sellLabel: string;
  sellVariant: "green" | "yellow" | "red";
  marketStatus: string;
};

const rows: Row[] = [
  {
    name: "Blue Ridge Valley Lot",
    shares: 254,
    acquisitionPrice: 156,
    currentPrice: 198,
    priceChange: "up",
    sellLabel: "Open Market",
    sellVariant: "green",
    marketStatus: "Fully funded. You may list at custom price or accept bids.",
  },
  {
    name: "Pine Grove Farmland",
    shares: 25,
    acquisitionPrice: 102,
    currentPrice: 102,
    priceChange: "flat",
    sellLabel: "Current Price Only",
    sellVariant: "yellow",
    marketStatus: "Still funding. Sell at current platform price only.",
  },
  {
    name: "Sierra Timber Parcel",
    shares: 125,
    acquisitionPrice: 196,
    currentPrice: 201,
    priceChange: "up",
    sellLabel: "Current Price Only",
    sellVariant: "yellow",
    marketStatus: "Still funding. Sell at current platform price only.",
  },
  {
    name: "Sunrise Meadow",
    shares: 20,
    acquisitionPrice: 120,
    currentPrice: 120,
    priceChange: "flat",
    sellLabel: "Not Available",
    sellVariant: "red",
    marketStatus: "Still funding. Resales not allowed at this time.",
  },
];
  
export default function Sell() {
  const router = useRouter();

  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [sharesToSell, setSharesToSell] = useState<number>(0);
  const [pricePerShare, setPricePerShare] = useState<number>(0);

  const [centsStr, setCentsStr] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const clean = raw.slice(0, 9);
    setCentsStr(clean);

    const cents = parseInt(clean || '0');
    setPricePerShare(cents / 100);
  };

  const handleFormattedValue = () => {
    const cents = centsStr.padStart(3, '0');
    const dollars = cents.slice(0, -2);
    const centsPart = cents.slice(-2);
    return `$${Number(dollars)}.${centsPart}`;
  };

  const total = (sharesToSell * pricePerShare).toFixed(2);

  const [isSelling, setIsSelling] = useState(false);

  const handleSell = () => {
    saveSell({ shares: sharesToSell, name: selectedProperty, sharePrice: pricePerShare });
    localStorage.setItem("showSell", 'true');
    router.push(`/sell/confirmation`);
  }

  const pillClasses = {
    up: "bg-primary text-white",
    flat: "bg-[#636363] text-white",
  };

  const sellBtnClasses = {
    green:
      "border border-[#6BBF6B] text-[#6BBF6B]",
    yellow:
      "border border-[#FFCC02] text-[#FFCC02]",
    red:
      "border border-[#BE3E3E] text-[#BE3E3E]",
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <NavbarSearch />

      <div className="flex w-full mt-6 mx-auto gap-8 p-4">
        {/* Left: table */}
        <div className="flex flex-col w-3/4 rounded-lg p-6">
          <div className="flex items-start justify-between border-b border-gray-300 pb-4 mb-4">
            <div>
              <p className="text-2xl font-bold">Selling Portfolio</p>
              <p className="text-sm text-gray-600">
                View your properties, check current prices, and list shares for sale.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="border border-gray-300 flex items-center gap-1 px-2 py-1 rounded-full hover:scale-105 transition duration-200 text-xs">
                <FiFilter size={16} /> Filters
              </button>
              <button className="border border-gray-300 flex items-center gap-1 px-2 py-1 rounded-full hover:scale-105 transition duration-200 text-xs">
                <MdOutlineSort size={16} /> Sort
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  {[
                    "Property Name",
                    "Shares Owned",
                    "Acquisition Price",
                    "Current Price",
                    "Sell Availability",
                    "Market Status",
                  ].map((hdr) => (
                    <th key={hdr} className="py-4 px-4 text-xs">
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className="border-b h-32">
                    <td className="py-4 px-4 text-xs">{r.name}</td>

                    <td className="py-4 px-4 text-xs">
                      <div className="w-24 text-center inline-block bg-primary text-white p-2 rounded-3xl">
                        {r.shares}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs">
                      ${r.acquisitionPrice.toFixed(2)}
                    </td>

                    <td className="py-4 px-4 text-xs">
                      <div
                        className={`w-24 inline-flex items-center justify-center p-2 rounded-3xl ${pillClasses[r.priceChange]}`}
                      >
                        {r.priceChange === "up" ? (
                          <FaChevronUp className="mr-1" />
                        ) : (
                          <span className="mr-1">~</span>
                        )}
                        ${r.currentPrice.toFixed(2)}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs">
                      <button
                        className={`w-28 text-center p-2 rounded-3xl hover:scale-105 transition font-medium ${sellBtnClasses[r.sellVariant]}`}
                      >
                        {r.sellLabel}
                      </button>
                    </td>

                    <td className="py-4 px-4 text-xs text-gray-700">
                      {r.marketStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: placeholder */}
        <div className="flex flex-col w-1/4">
          <div className="border border-gray-300 rounded-3xl shadow-md p-4">
            {/* Title */}
            <h2 className="text-lg font-semibold border-b border-gray-300 pb-3 mb-4">
              Sell
            </h2>

            {/* Form fields */}
            <div className="space-y-4 text-sm">
              {/* Select property */}
              <div className="flex justify-between items-center">
                <label className="font-medium">Select a property</label>
                <select
                  value={selectedProperty}
                  onChange={e => setSelectedProperty(e.target.value)}
                  onClick={() => setIsSelling(false)}
                  className="border border-gray-300 bg-white rounded p-2 text-sm"
                >
                  <option value="">Select</option>
                  {rows.map(r => (
                    <option key={r.name} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shares to sell */}
              <div className="flex justify-between items-center w-full">
                <div className='w-2/3'>
                    <label className="font-medium">Shares to sell</label>
                </div>
                <div className='w-1/3'>
                    <input
                        type="text"
                        value={sharesToSell}
                        min={0}
                        onChange={e => {
                            const num = parseInt(e.target.value, 10);
                            setSharesToSell(isNaN(num) ? 0 : num);
                        }}
                        onClick={() => setIsSelling(false)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm text-right"
                    />
                </div>
              </div>

              {/* Price per share */}
              <div className="flex justify-between items-center">
                <div className='w-2/3'>
                    <label className="font-medium">Price per share</label>
                </div>
                <div className="w-1/3">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={handleFormattedValue()}
                    onChange={handleChange}
                    onClick={() => setIsSelling(false)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm text-right"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-4" />

            {/* Total */}
            <div className='flex flex-col space-y-4'>
                <div className="flex justify-between items-center text-sm font-medium">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
                {isSelling &&
                        <div className='space-y-4 text-sm'>
                            <span className='font-bold'>Order Summary</span>
                            <p>You are placing an order to sell <b>{sharesToSell}</b> shares of <b>{selectedProperty}</b> at the current platform price of <b>${pricePerShare}</b> per share. Your order will be matched at the primary market rate and processed into your linked account. Share sale proceeds will be reflected in your portfolio once the transaction is complete. Final amounts may be adjusted slightly due to rounding. Share pricing is fixed while the property is still in funding.</p>
                        </div>
                    }
            </div>

            {/* Review Order */}

            {!isSelling &&
                <button disabled={!selectedProperty || sharesToSell <= 0 || pricePerShare <= 0} className={`mt-4 w-full py-3 rounded-full text-white font-medium transition ${
                    selectedProperty && sharesToSell > 0 && pricePerShare > 0
                      ? 'bg-primary hover:scale-105'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`} onClick={() => setIsSelling(true)}>
                    Review Order
                </button>
            }
            {isSelling &&
                <div className='space-y-4 mt-4'>
                    <button className="w-full bg-primary text-white py-4 rounded-full font-medium hover:scale-105 transition" onClick={() => handleSell()}>
                        Sell
                    </button>
                </div>
            }
</div>
        </div>
      </div>
    </div>
  );
}
