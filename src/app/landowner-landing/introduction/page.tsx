/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function OfferLandIntro() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* logo */}
        <Image src="/images/fs.svg" alt="Fractal Share logo" width={150} height={150} />

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
            <h1 className="text-5xl font-semibold leading-snug pt-8 lg:pt-0">
            The simplest way to offer land for investment.
            </h1>
        </div>

        {/* right column (steps) */}
        <ol className="w-1/2 gap-6 flex flex-col">
          {/* step 1 */}
          <li className="flex gap-6 items-center">
            <div className="flex flex-row gap-2 w-3/4">
              <h2 className="font-semibold text-xl">1.</h2>
              <div className="flex-1">
                <h2 className="font-semibold text-xl">Tell us about your land</h2>
                <p className="mt-1 text-basetext">
                  Share basic details like where your property is, how big it is,
                  and what kind of land it is.
                </p>
              </div>
            </div>

            <div className="w-1/4 flex justify-center">
              <Image
                src="/images/stepone.png"
                alt=""
                width={150}
                height={150}
                className=""
              />
            </div>
          </li>

          <hr />

          {/* step 2 */}
          <li className="flex items-center gap-6">
            <div className="flex flex-row gap-2 w-3/4">
              <h2 className="font-semibold text-xl">2.</h2>
              <div className="flex-1">
                <h2 className="font-semibold text-xl">Upload & verify</h2>
                <p className="mt-1 text-basetext">
                  Easily upload ownership and zoning documents. We will help you
                  validate everything and keep it secure.
                </p>
              </div>
            </div>

            <div className="w-1/4 flex justify-center">
              <Image
                src="/images/steptwo.png"
                alt=""
                width={100}
                height={100}
                className=""
              />
            </div>
          </li>

          <hr />

          {/* step 3 */}
          <li className="flex items-center gap-6">
            <div className="flex flex-row gap-2 w-3/4">
              <h2 className="font-semibold text-xl">3.</h2>
              <div className="flex-1">
                <h2 className="font-semibold text-xl">Set terms & publish</h2>
                <p className="mt-1 text-basetext">
                  Choose your asking price, funding type, and how much of your
                  land you want to tokenize.
                </p>
              </div>
            </div>

            <div className="w-1/4 flex justify-center">
              <Image
                src="/images/stepthree.png"
                alt=""
                width={100}
                height={100}
                className=""
              />
            </div>
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
