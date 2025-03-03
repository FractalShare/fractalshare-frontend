import ActivationClient from './ActivationClient';

type Props = {
  params: Promise<{ uid: string; token: string }>;
};

// Server component receives resolved params
export default async function Page({ params }: Props) {
	const { uid, token } = await params;
  return <ActivationClient uid={uid} token={token} />;
}
