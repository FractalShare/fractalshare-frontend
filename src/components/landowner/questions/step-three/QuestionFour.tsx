'use client';

import { useEffect, useRef, useState } from 'react';
import type { Answerable } from '@/types/QuestionContracts';

/**
 * Description input (0–500 chars) + “AI generate” checkbox.
 * When the box is checked, the textarea becomes disabled and the answer is
 * `"Generating with AI"`.
 */
export default function QuestionFour({
  value,
  onAnswered,
}: Answerable<string | null>) {
  const MAX = 500;

  /* initialise from parent value */
  const [text, setText] = useState(
    value && value !== 'Generating with AI' ? value : '',
  );
  const [useAI, setUseAI] = useState(value === 'Generating with AI');

  /* ---------- stable callback ref ---------- */
  const cbRef = useRef<typeof onAnswered | null>(null);
  useEffect(() => {
    cbRef.current = onAnswered;
  }, [onAnswered]);

  /* send answer whenever text / useAI changes */
  useEffect(() => {
    if (useAI) cbRef.current?.('Generating with AI');
    else cbRef.current?.(text.trim() === '' ? null : text.trim());
  }, [useAI, text]);

  /* handlers */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value.slice(0, MAX));

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setUseAI(checked);
    if (checked) setText(''); // optional: clear manual text
  };

  /* ------------------ UI ------------------ */
  return (
    <section className="mx-auto max-w-xl px-4">
      <h2 className="mb-1 text-2xl font-extrabold">
        How would you like to describe your property?
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Short titles work best. Be creative – you can always change it later
      </p>

      <textarea
        rows={6}
        value={text}
        onChange={handleChange}
        disabled={useAI}
        placeholder={useAI ? 'AI will craft a description for you' : ''}
        className={`w-full resize-none rounded-lg border p-3 text-sm focus:ring-0 ${
          useAI
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 focus:border-primary'
        }`}
      />

      <span className="mt-1 block text-xs text-gray-500">
        {text.length}/{MAX}
      </span>

      <hr className="my-6 border-gray-300" />

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={useAI}
          onChange={handleCheckbox}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary accent-primary focus:ring-primary"
        />
        <span>Or let AI generate it for me</span>
      </label>
    </section>
  );
}
