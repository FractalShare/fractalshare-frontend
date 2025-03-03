'use client';

import { Suspense } from 'react';
import SocialAuthHandler from './SocialAuthHandler';

export default function Page() {
	return (
		<Suspense>
			<SocialAuthHandler />
		</Suspense>
	);
}
