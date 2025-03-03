'use client';

export default function Footer() {
  return (
    <footer className="bg-white px-8 py-12 mt-12 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div className="space-y-4 col-span-1">
          <div className="flex items-center space-x-2">
            <div className="bg-[#4FCB7E] p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-7.5 8-13a8 8 0 10-16 0c0 5.5 8 13 8 13z" />
              </svg>
            </div>
            <h2 className="font-bold text-lg text-black">Fractal Share</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Democratizing premium land investment through innovative fractional ownership technology.
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
        <p>© 2024 Fractal Share. All rights reserved.</p>
        <div className="flex space-x-6">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
