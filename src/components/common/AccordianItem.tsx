'use client';

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type AccordionItemProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function AccordionItem({ title, icon, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 focus:outline-none"
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-4 text-newblack font-semibold text-md">{title}</span>
        </div>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-basetext" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-basetext" />
        )}
      </button>
      {isOpen && <div className="px-6 pb-4">{children}</div>}
    </div>
  );
};