'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import { useSocialAuth } from '@/hooks';
import { Spinner } from '@/components/common';

export default function Page() {
    const [googleAuthenticate] = useSocialAuthenticateMutation();
    useSocialAuth(googleAuthenticate, 'google-oauth2');

    return (
        <div className='flex my-8 justify-center'>
            <Spinner lg />
        </div>
    );
}