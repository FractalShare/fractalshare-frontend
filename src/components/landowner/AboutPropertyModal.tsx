'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition, DialogTitle, TransitionChild, DialogPanel } from '@headlessui/react';
import { PiXLight } from 'react-icons/pi';
import { BiMap } from "react-icons/bi";

export interface AboutPropertyValues {
  location: string;
  type: 'Undeveloped' | 'Farmland';
  acres: number | '';
}

interface AboutPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AboutPropertyValues) => void;
  initial: AboutPropertyValues;
}

export default function AboutPropertyModal({
  open,
  onClose,
  onSubmit,
  initial,
}: AboutPropertyModalProps) {
  const [values, setValues] = useState<AboutPropertyValues>(initial);

  // 🔄 Sync local state when initial prop changes
  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleChange = <K extends keyof AboutPropertyValues>(
    field: K,
    value: AboutPropertyValues[K]
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-black/30" />
        </TransitionChild>

        {/* Modal panel */}
        <TransitionChild
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 translate-y-10"
          enterTo="opacity-100 translate-y-0"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-10"
        >
          <div className="absolute inset-0 flex items-start justify-center pt-16 lg:pt-24">
            <DialogPanel className="w-[420px] rounded-3xl bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <button onClick={onClose} className="text-lg leading-none text-black">
                  <PiXLight />
                </button>
                <DialogTitle className="text-center flex-1 font-semibold">
                  Tell us about your property
                </DialogTitle>
              </div>

              {/* Body */}
              <div className="divide-y divide-gray-200 px-6">
                {/* Location input */}
                <div className='py-6'>
                  <label className="block mb-3 font-medium text-sm font-semibold">
                    Address or area
                  </label>

                  <div className="relative">
                    <BiMap size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                    <input
                      type="text"
                      placeholder="Place"
                      value={values.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 placeholder-black focus:border-[#1F4F36] focus:ring-0"
                    />
                  </div>
                </div>

                {/* Type selector */}
                <div className='py-6'>
                  <label className="block mb-3 font-medium text-sm font-semibold">
                    Type of property
                  </label>

                  <div className="flex items-center border border-gray-300 rounded-full p-1">
                    {(['Undeveloped', 'Farmland'] as const).map((id) => (
                      <button
                        key={id}
                        onClick={() => handleChange('type', id)}
                        className={`flex-1 rounded-full px-2 py-2 text-sm font-medium
                          ${
                            values.type === id
                              ? 'bg-primary text-white border-primary'
                              : 'text-black hover:bg-gray-50'
                          }`}
                      >
                        {id === 'Undeveloped' ? 'Undeveloped land' : 'Farmland'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Acres input */}
                <div className='flex flex-row items-center justify-between py-6'>
                  <label className="block mb-3 font-medium text-sm font-semibold">Acres</label>
                  <input
                    type="text"
                    value={values.acres}
                    onChange={e => {
                      const num = parseInt(e.target.value, 10);
                      handleChange('acres', Number(isNaN(num) ? 0 : num));
                    }}
                    className="border border-gray-300 rounded-lg p-2 text-sm text-center w-20"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-8">
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white hover:scale-105 transition"
                >
                  Update your estimate
                </button>
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
