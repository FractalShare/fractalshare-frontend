'use client';

import { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import PropertyCard from './PropertyCard';

interface PropertySectionHeaderProps {
  title: string;
  subtitle: string;
  listings: Array<{
    imageSrc: string;
    pricePerShare: number;
    valuation: number;
    numOfAcres: number;
    typeOfLand: string;
    percentRemaining: number;
    isActive: boolean;
    location: string;
  }>;
  filter?: React.ReactNode;
}

export default function PropertySection({
  title,
  subtitle,
  listings,
  filter,
}: PropertySectionHeaderProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState(0);

  const cardWidth = 300 + 16; // 300px card + 16px spacing

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = visibleCards * cardWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const fullCards = Math.floor(width / cardWidth);
        setVisibleCards(fullCards);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => scrollContainer.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-newblack">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 border rounded-full transition-transform shadow-md ${
              canScrollLeft
                ? 'hover:scale-110 text-primary'
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <FaArrowLeft size={25} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 border rounded-full transition-transform shadow-md ${
              canScrollRight
                ? 'hover:scale-110 text-primary'
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>
      {filter}
      <div ref={containerRef}>
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth snap-x snap-mandatory"
        >
          {listings.map((listing, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-start"
            >
              <PropertyCard {...listing} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}