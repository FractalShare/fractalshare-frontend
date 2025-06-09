'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white px-8 py-12 mt-12 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div className="space-y-4 col-span-1">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl">
              <Image src="/images/fs.svg" alt="Fractal Share Logo" width={150} height={150} priority />
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Land Ownership. Reimagined.
          </p>
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <h3 className="font-bold">Platform</h3>
          <ul className="text-gray-400 space-y-1 text-sm">
            <li>How it Works</li>
            <li>Properties</li>
            <li>Returns</li>
            <li>Security</li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <h3 className="font-bold">Company</h3>
          <ul className="text-gray-400 space-y-1 text-sm">
            <li>About Us</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-2">
          <h3 className="font-bold">Support</h3>
          <ul className="text-gray-400 space-y-1 text-sm">
            <li>Help Center</li>
            <li>Contact</li>
            <li>Legal</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 space-y-4 md:space-y-0">
        <p>© 2025 Fractal Share. All rights reserved.</p>
        <div className="flex space-x-6">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
