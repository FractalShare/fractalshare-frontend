'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className='min-h-screen bg-white flex flex-col'>
			<header className="fixed top-5 left-0 flex items-center px-6">
				<Image src="/images/fs.svg" alt="Fractal Share Logo" width={150} height={150} priority />
			</header>

			<div className="flex-grow flex items-center justify-center min-h-screen">
				<div className='bg-white p-8 w-full max-w-xl text-center'>
					<h1 className='text-6xl text-primary mb-4'>
						Page Not Found
					</h1>
					<p className='text-basetext text-lg my-12'>
						The page you are looking for does not exist or has been moved.
					</p>
					<button
						onClick={() => router.push('/')}
						className='w-full px-6 py-3 text-white font-medium rounded-lg bg-primary hover:scale-105 transition'
					>
						Back to Home
					</button>
				</div>
			</div>
		</div>
	);
}
