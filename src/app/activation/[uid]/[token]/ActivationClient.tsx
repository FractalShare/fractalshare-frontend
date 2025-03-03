'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActivationMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

interface Props {
  uid: string;
  token: string;
}

export default function ActivationClient({ uid, token }: Props) {
  const router = useRouter();
  const [activation] = useActivationMutation();

  useEffect(() => {
    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast.success('Account activated');
      })
      .catch(() => {
        toast.error('Failed to activate account');
      })
      .finally(() => {
        router.push('/auth/login');
      });
  }, [activation, uid, token, router]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-center bg-[#FFFFFF]'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h1 className='text-5xl mb-6 text-primary'>
          Activating your account...
        </h1>
      </div>
    </div>
  );
}
