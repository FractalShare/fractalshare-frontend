'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-[#FFFFFF] flex flex-col'>
			<header className="fixed top-5 left-0 flex items-center px-6">
				<Image src="/fs.png" alt="Fractal Share Logo" width={100} height={100} priority />
				<p className="text-2xl font-semibold text-[#1F4F36]">Fractal Share</p>
			</header>

			<div className="flex-grow flex items-center justify-center min-h-screen">
				<div className='bg-[#FFFFFF] p-8 w-full max-w-xl text-center'>
					<h1 className='text-6xl text-[#244E3B] mb-4'>
						Page Not Found
					</h1>
					<p className='text-gray-400 text-lg my-12'>
						The page you are looking for does not exist or has been moved.
					</p>
					<button
						onClick={() => router.push('/')}
						className='w-full px-6 py-3 text-white font-medium rounded-lg bg-[#244E3B] hover:scale-105 transition'
					>
						Back to Home
					</button>
				</div>
			</div>
		</div>
	);
}
