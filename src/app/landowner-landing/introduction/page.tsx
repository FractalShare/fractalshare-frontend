/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function OfferLandIntro() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* logo */}
        <img src="/images/logo.png" alt="Fractal Share logo" className="h-9 w-auto" />

        {/* exit */}
        <Link
          href="/"
          className="rounded-full border border-gray-300 px-6 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Exit
        </Link>
      </nav>

      <section className="flex flex-1 flex-col w-full lg:flex-row lg:items-center px-6 lg:px-16 gap-12">
        {/* left column (headline) */}
        <div className='w-1/2'>
            <h1 className="text-[clamp(28px,4vw,36px)] font-extrabold leading-snug pt-8 lg:pt-0">
            The simplest way to offer land for investment.
            </h1>
        </div>

        {/* right column (steps) */}
        <ol className="w-1/2">
          {/* step 1 */}
          <li className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="font-semibold">1. Tell us about your land</h2>
              <p className="mt-1 text-sm text-gray-600">
                Share basic details like where your property is, how big it is,
                and what kind of land it is.
              </p>
            </div>

            <Image
              src="/images/stepone.png"
              alt=""
              width={150}
              height={150}
              className=""
            />
          </li>

          <hr />

          {/* step 2 */}
          <li className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="font-semibold">2. Upload & verify</h2>
              <p className="mt-1 text-sm text-gray-600">
                Easily upload ownership and zoning documents. We will help you
                validate everything and keep it secure.
              </p>
            </div>

            <Image
              src="/images/steptwo.png"
              alt=""
              width={100}
              height={150}
              className=""
            />
          </li>

          <hr />

          {/* step 3 */}
          <li className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="font-semibold">3. Set terms & publish</h2>
              <p className="mt-1 text-sm text-gray-600">
                Choose your asking price, funding type, and how much of your
                land you want to tokenize.
              </p>
            </div>

            <Image
              src="/images/stepthree.png"
              alt=""
              width={100}
              height={150}
              className=""
            />
          </li>
        </ol>
      </section>

      <footer className="border-t border-gray-200 px-6 py-4 flex justify-end">
        <Link
          href="/landowner-landing/questionnaire"
          className="rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-white hover:scale-105 transition"
        >
          Start now
        </Link>
      </footer>
    </main>
  );
}
