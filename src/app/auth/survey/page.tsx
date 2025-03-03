'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  {
    id: 'role',
    title: 'How would you like to use Fractal Share?',
    options: [
      { label: 'I am an Investor - I want to invest in land', value: 'investor' },
      { label: 'I am a Landowner - I want to list my property', value: 'landowner' },
    ],
    type: 'multi',
  },
  {
    id: 'goals',
    title: 'What are your goals for investing in land?',
    options: [
      { label: 'Grow long-term wealth', value: 'wealth' },
      { label: 'Earn passive income', value: 'income' },
      { label: 'Diversify my investment portfolio', value: 'diversify' },
      { label: 'Eventually build or develop', value: 'develop' },
      { label: 'Learn about alternative investments', value: 'alt' },
      { label: 'Hedge against inflation', value: 'hedge' },
      { label: 'Support sustainable land use', value: 'sustain' },
      { label: 'Other', value: 'other' },
    ],
    type: 'multi',
  },
  {
    id: 'budget',
    title: 'How much do you plan to invest each week?',
    options: [
      { label: 'Less than $25', value: '<25' },
      { label: '$25-$100', value: '25-100' },
      { label: '$100-$250', value: '100-250' },
      { label: '$250-$500', value: '250-500' },
      { label: '$500+', value: '500+' },
      { label: 'I will decide as I go', value: 'flexible' },
    ],
    type: 'single',
  },
];

export default function Survey() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const currentStep = steps[stepIndex];

  const handleToggle = (value: string) => {
    const currentAnswers = answers[currentStep.id] || [];

    const updated =
      currentStep.type === 'multi'
        ? currentAnswers.includes(value)
          ? currentAnswers.filter((v) => v !== value)
          : [...currentAnswers, value]
        : [value];

    setAnswers({ ...answers, [currentStep.id]: updated });
  };

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      console.log('Submit:', answers);
      router.push('/auth/login');
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const isSelected = (value: string) =>
    (answers[currentStep.id] || []).includes(value);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-4 pb-20 bg-white overflow-hidden">
      <div className="flex items-center self-start">
        <Image src="/images/fs.svg" alt="Fractal Share Logo" width={150} height={150} />
      </div>

      <div className="max-w-5xl w-full mt-20 space-y-6 relative">

        <div>
          <h1 className="text-[36px] font-semibold text-gray-900">{currentStep.title}</h1>
          <div className="w-full mt-2 h-1.5 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-[14px] text-gray-500">
          {currentStep.type === 'multi'
            ? 'Select all that apply'
            : 'Select one option'}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`grid gap-3 ${
              currentStep.options.length > 2 ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {currentStep.options.map(({ label, value }) => (
              <label
                key={value}
                className="flex items-center px-4 py-4 border rounded-2xl bg-gray-50 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type={currentStep.type === 'single' ? 'radio' : 'checkbox'}
                  name={currentStep.id}
                  value={value}
                  className="form-checkbox accent-primary h-4 w-4"
                  checked={isSelected(value)}
                  onChange={() => handleToggle(value)}
                />
                <span className="ml-3 text-[18px] text-gray-800">{label}</span>
              </label>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className={`flex ${stepIndex === 0 ? 'justify-end' : 'justify-between'} gap-4 pt-4`}>
          {stepIndex > 0 && (
            <button
              onClick={handleBack}
              className="w-full py-3 border border-primary text-primary font-medium rounded-2xl hover:scale-105 transition"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={(answers[currentStep.id] || []).length === 0}
            className={`${
              stepIndex === 0 ? 'w-full' : 'w-full'
            } text-white py-3 rounded-2xl font-medium transition 
            ${
              (answers[currentStep.id] || []).length > 0
                ? 'bg-primary hover:scale-105 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
