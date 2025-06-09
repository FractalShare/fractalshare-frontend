/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { Footer, LearnCard, Spinner } from '@/components/common';
import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { NavbarSearch } from '@/components/common';
import USMap from '@/components/common/USMap';
import { FaChevronUp } from "react-icons/fa";
import PropertyCard from '@/components/common/PropertyCard';
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaHeart, FaRegEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const sampleListings = [
	{
	  imageSrc: '/images/land.jpg',
	  pricePerShare: 102,
	  valuation: 102000,
	  numOfAcres: 25,
	  typeOfLand: 'Farmland',
	  percentRemaining: 28,
	  isActive: true,
	  location: 'Mayslick, KY, 41055, Mason County',
	},
	{
	  imageSrc: '/images/land2.jpg',
	  pricePerShare: 120,
	  valuation: 320000,
	  numOfAcres: 25,
	  typeOfLand: 'Land',
	  percentRemaining: 45,
	  isActive: true,
	  location: 'Alpharetta, GA, 30005, Forsyth County',
	},
	{
	  imageSrc: '/images/ranch.jpg',
	  pricePerShare: 95,
	  valuation: 250000,
	  numOfAcres: 40,
	  typeOfLand: 'Ranch',
	  percentRemaining: 60,
	  isActive: true,
	  location: 'Bozeman, MT, 59718, Gallatin County',
	}
  ];

  const cards = [
	{
	  title: 'What is investing?',
	  imgSrc: '/images/learn1.png',
	  bgClass: 'bg-[#FEF9F4]',
	},
	{
	  title: 'Why invest in land?',
	  imgSrc: '/images/learn2.png',
	  bgClass: 'bg-[#FEF9F4]',
	},
	{
	  title: 'How land is valued',
	  imgSrc: '/images/learn3.png',
	  bgClass: 'bg-[#FAF6EC]',
	},
	{
	  title: 'How shares are priced',
	  imgSrc: '/images/learn4.png',
	  bgClass: 'bg-[#FFE8BF]',
	},
  ];

  
type ListItem = {
	id: number;
	title: string;
	leftPercent: number;   // e.g. 12
	roi: string;           // e.g. '+7–9%'
	price: string;         // e.g. '$123.00'
  };
  
  type List = {
	id: string;
	label: string;
	icon: React.ReactNode;
	items: ListItem[];
  };

  type ChatItem = {
	id: number;
	user: {
	  name: string;
	  avatar: string;
	};
	message?: string;
	timestamp: string;
	actionLink?: {
	  text: string;
	  href: string;
	}
  };

  type GroupSection = {
	id: string;
	label: string;
	icon: React.ReactNode;
	chats: ChatItem[];
  };
  
  const sampleLists: List[] = [
	{
	  id: 'watch',
	  label: 'First Watchlist',
	  icon: <FaRegEye className="w-5 h-5 text-gray-600" />,
	  items: Array.from({ length: 4 }).map((_, i) => ({
		id: i,
		title: 'Blue Ridge Valley Lot',
		leftPercent: i * 15,
		roi: '+7-9%',
		price: '$123.00',
	  })),
	},
	{
	  id: 'favorites',
	  label: 'Favorites',
	  icon: <FaHeart className="w-5 h-5 text-gray-600" />,
	  items: [], // could be filled similarly
	},
	{
	  id: 'others',
	  label: 'These look good',
	  icon: <FaRegEye className="w-5 h-5 text-gray-600" />,
	  items: [],
	},
  ];

  const sampleGroups: GroupSection[] = [
	{
	  id: 'ballers',
	  label: 'Atlanta Ballers',
	  icon: (
		<Image
		  src="/icons/basketball.svg"
		  alt=""
		  width={20}
		  height={20}
		  className="object-contain"
		/>
	  ),
	  chats: [
		{
		  id: 1,
		  user: {
			name: 'Abagail Adams',
			avatar: '/images/person.jpg',
		  },
		  message:
			'I really like this, this seems like a great investment and I look forward on this…',
		  timestamp: '6m ago',
		},
		{
		  id: 2,
		  user: {
			name: 'Micheal Marks',
			avatar: '/images/person.jpg',
		  },
		  message:
			'This is amazing it looks like its near an oil rig.',
		  timestamp: '8m ago',
		},
		{
		  id: 3,
		  user: {
			name: 'John Doe',
			avatar: '/images/person.jpg',
		  },
		  timestamp: '10m ago',
		  actionLink: {
			text: 'Blue Ridge Valley Lot',
			href: '/property/blue-ridge-valley-lot',
		  },
		},
	  ],
	},
	{
	  id: 'farmers',
	  label: 'Farm Searchers',
	  icon: (
		<Image
		  src="/icons/farm.svg"
		  alt=""
		  width={20}
		  height={20}
		  className="object-contain"
		/>
	  ),
	  chats: [],
	},
  ];

  type Row = {
	name: string;
	sharesListed: number
	totalShares: number;
	pricePerShare: number;
	status: "green" | "yellow" | "red";
  };
  
  const rows: Row[] = [
	{
	  name: "Blue Ridge Valley Lot",
	  sharesListed: 25,
	  totalShares: 254,
	  pricePerShare: 198.00,
	  status: "green",
	}
  ];

export default function Dashboard() {
	const { data: user, isLoading, isFetching } = useRetrieveUserQuery();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showSell, setShowSell] = useState<boolean>(false);

	useEffect(() => {
		setShowSell(localStorage.getItem("showSell") === 'true');
	}, []);

	const [logout] = useLogoutMutation();

	const [openLists, setOpenLists] = useState<Record<string, boolean>>({
		favorites: true,
		watch: false,
	  });

	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
		ballers: true,
		farmers: false,
	});

	const toggleSection =
		(setter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) =>
		(id: string) => {
			setter(prev => ({ ...prev, [id]: !prev[id] }));
	};

	const toggleList = toggleSection(setOpenLists);
	const toggleGroup = toggleSection(setOpenGroups);

	const config = [
		{
			label: 'First Name',
			value: user?.first_name,
		},
		{
			label: 'Last Name',
			value: user?.last_name,
		},
		{
			label: 'Email',
			value: user?.email,
		},
	];

	const sellBtnClasses = {
		green:
		  "border border-[#6BBF6B] text-[#6BBF6B]",
		yellow:
		  "border border-[#FFCC02] text-[#FFCC02]",
		red:
		  "border border-[#BE3E3E] text-[#BE3E3E]",
	  };

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

    const handleLogout = () => {
        console.log("logged out")
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};

    return (
        <div>
          {/* <header className='bg-white shadow'>
            <div className='flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                Home
              </h1>
              <button onClick={handleLogout} className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'>
                Logout
              </button>
            </div>
          </header> */}
		  <NavbarSearch />
		  <p className='text-[32px] font-bold mt-4 ml-4'>Welcome back, {user?.first_name}!</p>
      
          <div className='flex flex-row w-full p-6 gap-14 items-start'>
            {/* <List config={config} /> */}
			<div className='flex flex-col w-3/4 ml-8'>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row justify-between items-center'>
						<p className='text-[28px]'>My Portfolio</p>
						<button className='border border-gray-300 py-1 px-4 rounded-full text-sm text-gray-400 hover:scale-105 transition'>View all</button>
					</div>
					<p className='text-[28px] text-primary'>$21,200.00</p>
					<div className='flex flex-row items-center gap-2'>
						<FaChevronUp className='text-[#6BBF6B]'/>
						<p className='text-[#6BBF6B]'>$2,700 (14.6%)</p>
						<p>All Time</p>
					</div>
				</div>
				<USMap />
				{showSell &&
				<><div className='flex flex-row justify-between border-b border-gray-200 pb-4 items-center'>
					<p className='text-[20px]'>Listed Shares</p>
					<button className='border border-gray-300 py-1 px-2 rounded-full text-sm text-gray-400 hover:scale-105 transition'>Edit Listings</button>
				</div>
				<div className='mb-12'>
					<table className="w-full text-left">
						<thead>
							<tr className="border-b">
								{[
								"Property Name",
								"Shares Listed",
								"Price Per Share",
								"Ownership Listed",
								"Status",
								].map((hdr) => (
								<th key={hdr} className="py-4 px-4 text-xs">
									{hdr}
								</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map((r, idx) => (
								<tr key={idx} className="border-b last:border-b-0 h-16">
									<td className="py-4 px-4 text-sm">{r.name}</td>

									<td>
										<div className="relative w-40 h-8 bg-primary rounded-full overflow-hidden">
											<div
												className="absolute left-0 top-0 h-full bg-secondary"
												style={{ width: `${(r.sharesListed / r.totalShares) * 100}%` }}
											/>
											<span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
												{r.sharesListed} of {r.totalShares}
											</span>
										</div>
									</td>

									<td className="py-4 px-4 text-sm">${r.pricePerShare}</td>

									<td>
										<div className="relative w-40 h-8 bg-primary rounded-full overflow-hidden">
											<div
												className="absolute left-0 top-0 h-full bg-secondary"
												style={{ width: `${(r.sharesListed / r.totalShares) * 100}%` }}
											/>
											<span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
												{(r.sharesListed/r.totalShares * 100).toFixed(2)}%
											</span>
										</div>
									</td>

									<td className="py-4 px-4 text-xs">
										<button
											className={`w-full text-center p-2 rounded-3xl hover:scale-105 transition font-medium ${sellBtnClasses[r.status]}`}
										>
											Open Market
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div></>}
				<div className='flex flex-row justify-between border-b border-gray-200 pb-4 mb-6 items-center'>
					<p className='text-[20px]'>Trending Properties</p>
					<button className='border border-gray-300 py-1 px-2 rounded-full text-sm text-gray-400 hover:scale-105 transition'>View More</button>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{sampleListings.map((listing, index) => (
						<div key={index} className="min-w-[30px] max-w-[300px] flex-shrink-0">
							<PropertyCard {...listing} />
						</div>
					))}
				</div>
				<div className='flex flex-row justify-between border-b border-gray-200 pb-4 mt-14 items-center'>
					<p className='text-[20px]'>Learn</p>
					<button className='border border-gray-300 py-1 px-2 rounded-full text-sm text-gray-400 hover:scale-105 transition'>View More</button>
				</div>
				<div className='flex flex-row justify-between gap-4 mt-4'>
					{cards.map(c => (
						<LearnCard
							key={c.title}
							title={c.title}
							imgSrc={c.imgSrc}
							bgClass={c.bgClass}
						/>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-4 w-1/4 border border-gray-200 rounded-2xl mr-6'>
				{/* Badges */}
				<div className="border-b border-gray-200 p-4 flex justify-between items-center">
					<h2 className="text-lg font-semibold">Badges</h2>
					<button className="text-sm text-gray-500 hover:text-gray-700">View All</button>
				</div>
				<div className="flex justify-center">
					<Image
						src="/images/badge_i.png"
						alt="First Investment"
						width={200}
						height={200}
					/>
				</div>

				{/* Lists */}
				<div className="border-t border-gray-200">
					<h3 className="px-4 py-3 text-lg font-semibold">Lists</h3>
					{sampleLists.map(list => (
					<div key={list.id} className="border-t border-gray-100">
						<button
						onClick={() => toggleList(list.id)}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
						>
						<div className="flex items-center space-x-2">
							{list.icon}
							<span className="font-medium">{list.label}</span>
						</div>
						<div className="flex items-center space-x-1">
							<AiOutlinePlus className="w-4 h-4 text-gray-500 hover:text-gray-700" />
							{openLists[list.id] ? (
							<FiChevronUp className="w-5 h-5 text-gray-500" />
							) : (
							<FiChevronDown className="w-5 h-5 text-gray-500" />
							)}
						</div>
						</button>
						{openLists[list.id] && list.items.length > 0 && (
						<div className="px-4 pb-3 space-y-8">
							{list.items.map(item => (
							<div
								key={item.id}
								className="flex items-center justify-between text-xs"
							>
								<span className="w-1/4">{item.title}</span>
								<div className="relative w-1/4 h-5 bg-secondary rounded-full overflow-hidden">
									<div
										className="absolute left-0 top-0 h-full bg-primary"
										style={{ width: `${100-item.leftPercent}%` }}
									/>
									<span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
										{item.leftPercent}% left
									</span>
								</div>
								<div className="flex space-x-3 text-right">
									<div className='flex flex-col text-xs'>
										<span>{item.price}</span>
										<span className="text-[#6BBF6B]">{item.roi} Annual ROI</span>
									</div>
								</div>
							</div>
							))}
						</div>
						)}
					</div>
					))}
				</div>

				{/* Groups */}
				<div className="border-t border-gray-200 mt-2">
					<h3 className="px-4 py-3 text-lg font-semibold flex items-center justify-between">
					Groups
					<AiOutlinePlus className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
					</h3>
					{sampleGroups.map(group => (
					<div key={group.id} className="border-t border-gray-100">
						<button
						onClick={() => toggleGroup(group.id)}
						className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
						>
						<div className="flex items-center space-x-2">
							{group.icon}
							<span className="font-medium">{group.label}</span>
						</div>
						{openGroups[group.id] ? (
							<FiChevronUp className="w-5 h-5 text-gray-500" />
						) : (
							<FiChevronDown className="w-5 h-5 text-gray-500" />
						)}
						</button>
						{openGroups[group.id] && group.chats.length > 0 && (
						<div className="px-4 pb-4 space-y-4">
							{group.chats.map(chat => (
							<div key={chat.id}>
								<div className="flex items-start space-x-3">
								<Image
									src={chat.user.avatar}
									alt={chat.user.name}
									width={32}
									height={32}
									className="rounded-full"
								/>
								<div>
									<p className="font-medium text-sm">{chat.user.name}</p>
									{chat.message && (
									<p className="text-xs text-gray-600 mt-1">
										{chat.message}
									</p>
									)}
									{chat.timestamp && (
									<p className="text-[12px] text-gray-400 mt-1">
										{chat.timestamp}
									</p>
									)}
									{chat.actionLink && (
									<div className="mt-2 flex space-x-2">
										<button
										onClick={() =>
											router.push(chat.actionLink!.href)
										}
										className="px-3 py-2 text-xs bg-primary text-white rounded hover:scale-105 transition"
										>
										View Property
										</button>
										<button className="px-3 py-2 text-xs text-primary border border-primary rounded hover:scale-105 transition">
										Dismiss
										</button>
									</div>
									)}
								</div>
								</div>
							</div>
							))}
						</div>
						)}
					</div>
					))}
				</div>

			</div>
          </div>
		  <Footer />
		</div>
      );
}