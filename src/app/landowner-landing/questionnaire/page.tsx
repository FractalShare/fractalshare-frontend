'use client';

import {
  StepOne,
  StepOneOne,
  StepOneTwo,
  StepOneThree,
  StepOneFour,
  StepOneFive,
  StepOneSix,
  StepOneSeven,
  StepTwo,
  StepTwoOne,
  StepTwoTwo,
  StepTwoThree,
  StepTwoFour,
  StepThree,
  StepThreeOne,
  StepThreeTwo,
  StepThreeThree,
  StepThreeFour,
  StepThreeFive,
} from '@/components/landowner';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Answerable } from '@/types/QuestionContracts';
import type { AddressForm } from '@/components/landowner/questions/step-one/QuestionThree'; // ✅ used for type checking
import Image from 'next/image';

const NAV_H = 64;
const FOOT_H = 80;

const STEPS_GROUP_1 = 7;
const STEPS_GROUP_2 = 4;
const STEPS_GROUP_3 = 5;

const steps = [
  { element: <StepOne />, counts: false },
  { element: <StepOneOne />, counts: true },
  { element: <StepOneTwo />, counts: true },    // ✅ QuestionTwo
  { element: <StepOneThree />, counts: true },  // ✅ QuestionThree
  { element: <StepOneFour />, counts: true },
  { element: <StepOneFive />, counts: true },
  { element: <StepOneSix />, counts: true },
  { element: <StepOneSeven />, counts: true },

  { element: <StepTwo />, counts: false },
  { element: <StepTwoOne />, counts: true },
  { element: <StepTwoTwo />, counts: true },
  { element: <StepTwoThree />, counts: true },
  { element: <StepTwoFour />, counts: true },

  { element: <StepThree />, counts: false },
  { element: <StepThreeOne />, counts: true },
  { element: <StepThreeTwo />, counts: true },
  { element: <StepThreeThree />, counts: true },
  { element: <StepThreeFour />, counts: true },

  { element: <StepThreeFive onChange={() => {}} />, counts: true },
] as const;

const TOTAL_STEPS = steps.length;
const completedCount = (idx: number) =>
  steps.slice(0, idx).filter((s) => s.counts).length;

export default function Questionnaire() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, unknown>>({});
  const [finalReady, setFinalReady] = useState(false);

  const CurrentStep = (() => {
    const { element, counts } = steps[step];

    if (step === TOTAL_STEPS - 1) {
      return {
        ...element,
        props: { ...element.props, onChange: setFinalReady },
      };
    }

    if (counts) {
      const props: Answerable = {
        value:
          step === 3 && answers[2]               // ✅ if we're on Step 3 (QuestionThree), use Step 2's answer
            ? (answers[2] as AddressForm)        // ✅ use structured address from QuestionTwo
            : answers[step] ?? null,             // otherwise use answer for current step
        onAnswered: (ans: unknown) =>
          setAnswers((prev) => ({ ...prev, [step]: ans })),
      };
      return { ...element, props: { ...element.props, ...props } };
    }

    return element;
  })();

  const done = completedCount(step);
  const bar1Fill = Math.min(done, STEPS_GROUP_1);
  const bar2Fill = Math.max(Math.min(done - STEPS_GROUP_1, STEPS_GROUP_2), 0);
  const bar3Fill = Math.max(
    Math.min(done - STEPS_GROUP_1 - STEPS_GROUP_2, STEPS_GROUP_3),
    0
  );

  const next = () => {
    if (step === TOTAL_STEPS - 1 && finalReady) {
      console.log('ALL ANSWERS', answers);
      router.push('/home');
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const isLast = step === TOTAL_STEPS - 1;
  const requiresAnswer = steps[step].counts;
  const answerForStep = answers[step];

  const nextDisabled = isLast
    ? !finalReady
    : requiresAnswer && (answerForStep === null || answerForStep === undefined);

  const nextLabel = isLast ? 'Create Listing' : 'Next';

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header
        className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur"
        style={{ height: NAV_H }}
      >
        <nav className="mx-auto flex h-full w-full items-center justify-between px-6">
          <Image src="/images/fs.svg" alt="Fractal Share" width={150} height={150} />
          <div className="flex items-center gap-4">
            <Link
              href="/home"
              className="rounded-full border border-gray-300 px-6 py-1.5 text-sm font-medium text-primary transition hover:scale-105"
            >
              Exit
            </Link>
            <Link
              href="/home"
              className="rounded-full border border-gray-300 px-6 py-1.5 text-sm font-medium text-primary transition hover:scale-105"
            >
              Save&nbsp;&amp;&nbsp;Exit
            </Link>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main
        className="overflow-y-auto px-4"
        style={{
          marginTop: NAV_H,
          marginBottom: FOOT_H,
          height: `calc(100vh - ${NAV_H + FOOT_H}px)`,
        }}
      >
        <div className="mx-auto max-w-7xl py-10">{CurrentStep}</div>
      </main>

      {/* FOOTER */}
      <footer
        className="fixed inset-x-0 bottom-0 z-50 bg-white"
        style={{ height: FOOT_H }}
      >
        <div className="flex gap-2 px-4 pt-2">
          {[STEPS_GROUP_1, STEPS_GROUP_2, STEPS_GROUP_3].map((len, g) => {
            const fill = g === 0 ? bar1Fill : g === 1 ? bar2Fill : bar3Fill;
            return (
              <div key={g} className="flex h-[4px] w-full">
                {Array.from({ length: len }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${
                      i < fill ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            );
          })}
        </div>

        <div className="mx-auto flex h-[calc(100%-4px)] items-center justify-between px-6">
          <button
            onClick={back}
            disabled={step === 0}
            className={`rounded-xl border-2 px-8 py-2 text-sm font-medium transition ${
              step === 0
                ? 'cursor-not-allowed border-gray-300 text-gray-400'
                : 'cursor-pointer border-primary text-primary hover:scale-105'
            }`}
          >
            Back
          </button>

          <button
            onClick={next}
            disabled={nextDisabled}
            className={`rounded-xl px-8 py-2 text-sm font-medium transition ${
              nextDisabled
                ? 'cursor-not-allowed bg-gray-300 text-white'
                : 'cursor-pointer bg-primary text-white hover:scale-105'
            }`}
          >
            {nextLabel}
          </button>
        </div>
      </footer>
    </div>
  );
}
