'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiArrowLeft, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaUniversity, FaCreditCard } from 'react-icons/fa';
import { SiBitcoin } from 'react-icons/si';
import { loadOrder } from '@/components/utils/OrderProvider';

interface OrderData {
  amount: number;
  sharePrice: number;
  estimatedShares: number;
  address: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agreeInvest, setAgreeInvest] = useState(false);
  const [agreeRisk, setAgreeRisk]     = useState(false);
  const [agreeTerms, setAgreeTerms]   = useState(false);

  useEffect(() => {
    setOrder(loadOrder());
  }, []);

  if (!order) return <p className="p-6">Loading…</p>;

  const serviceFee = +(order.amount * 0.015).toFixed(2);
  const total      = (order.amount + serviceFee).toFixed(2);

  const canInvest =
    paymentMethod !== '' &&
    agreeInvest &&
    agreeRisk &&
    agreeTerms;

  const paymentOptions = [
    { value: 'bank',   label: 'Bank Transfer', icon: <FaUniversity className="mr-2 text-gray-600" /> },
    { value: 'debit',  label: 'Debit Card',    icon: <FaCreditCard className="mr-2 text-gray-600" /> },
    { value: 'crypto', label: 'Crypto Wallet', icon: <SiBitcoin className="mr-2 text-gray-600" /> },
  ];

  const selectedOption = paymentOptions.find(o => o.value === paymentMethod);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 w-full">
        <Image src="/images/fs.svg" alt="Fractal Share" width={150} height={150} />
      </header>

        {/* Back link */}
        <div
            className="flex text-primary mt-4 ml-8"
            onClick={() => router.back()}
        >
            <div className='hover:scale-105 flex items-center cursor-pointer space-x-2 transition'>
                <FiArrowLeft className="h-5 w-5" />
                <h1 className="text-lg">Back</h1>
            </div>
        </div>

      <main className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left column */}
        <div className="space-y-2 border border-gray-200 rounded-3xl p-6 divide-y divide-gray-200 space-y-6">

          {/* Order summary + checkboxes */}
          <div className="bg-white space-y-4">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <p className="text-sm text-gray-700">
              You are placing an order to invest <strong>${order.amount}</strong> into{' '}
              <strong>{order.address}</strong>. At the current price of{' '}
              <strong>${order.sharePrice}</strong> per share, you are estimated to receive{' '}
              <strong>{order.estimatedShares.toFixed(2)} shares</strong>. Upon confirmation,
              your order will be processed and recorded in your portfolio. Final share allocation
              may vary slightly due to rounding. Review all property and risk details before
              placing your order.
            </p>
          </div>

          <div className="space-y-2 text-sm accent-primary pt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreeInvest}
                onChange={() => setAgreeInvest(prev => !prev)}
                className="mr-2"
              />
              I agree to the{' '}
              <a href="#" className="font-semibold ml-1">
                Investment Agreement
              </a>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreeRisk}
                onChange={() => setAgreeRisk(prev => !prev)}
                className="mr-2"
              />
              I agree to the{' '}
              <a href="#" className="font-semibold ml-1">
                Property Risk Disclosure
              </a>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(prev => !prev)}
                className="mr-2"
              />
              I agree to the{' '}
              <a href="#" className="font-semibold ml-1">
                Platform Terms & Services
              </a>
            </label>
          </div>

          {/* Payment method (custom dropdown) */}
          <div className="bg-white space-y-4 pt-4">
            <h2 className="text-lg font-semibold">Payment method</h2>
            <div className="relative inline-block w-full rounded-full">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="w-full flex items-center justify-between border rounded-2xl border-gray-300 p-2 py-4 text-sm"
              >
                <div className="flex items-center px-2">
                  {selectedOption
                    ? selectedOption.icon
                    : <span className="text-gray-500">Select your payment method</span>
                  }
                  {selectedOption && <span className="text-gray-800">{selectedOption.label}</span>}
                </div>
                {dropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {dropdownOpen && (
                <ul className="absolute w-full bg-white border px-2 border-gray-300 rounded-2xl shadow z-10">
                  {paymentOptions.map(opt => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        setPaymentMethod(opt.value);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {opt.icon}
                      <span className="text-sm text-gray-800">{opt.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Invest button */}
          <button
            disabled={!canInvest}
            onClick={() => router.push("/property-details/1233/confirmation")}
            className={`w-full py-3 rounded-2xl text-white font-medium transition ${
              canInvest ? 'bg-primary hover:scale-105' : 'bg-primary opacity-35 cursor-not-allowed'
            }`}
          >
            Invest
          </button>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Property card */}
          <div className='border border-gray-200 rounded-3xl px-6'>
            <div className="flex flex-row rounded-sm bg-white overflow-hidden py-4">
                <Image
                  src="/images/land.jpg"
                  alt={order.address}
                  width={120}
                  height={100}
                  className="object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{order.address}</h3>
                  <p className="text-sm">Farmland</p>
                  <p className="text-sm mt-1">25 Acres • 28% remaining</p>
                </div>
            </div>

            <hr />

            {/* Total summary */}
            <div className="rounded-xl bg-white py-6 space-y-3">
                <h2 className="text-lg font-semibold">Your total</h2>
                <div className="flex justify-between">
                  <span>${order.sharePrice.toFixed(2)} × {order.estimatedShares.toFixed(2)} shares</span>
                  <span>${order.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Total (USD)</span>
                  <span>${total}</span>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
