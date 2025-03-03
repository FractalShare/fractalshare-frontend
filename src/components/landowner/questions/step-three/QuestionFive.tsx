'use client';

import { useState } from 'react';

/**
 * Final confirmation checklist.
 * Provides six check‑boxes; parent can read `allChecked` via `onChange`.
 */
export default function QuestionFive({
  onChange,
}: {
  onChange?: (allChecked: boolean) => void;
}) {
  /* checklist statements ---------------------------------------- */
  const items = [
    'I confirm that I am the rightful owner of this land or a legally authorized representative.',
    'I confirm that the deed, zoning, and parcel documents I uploaded are accurate and belong to this land.',
    'I confirm that all photos uploaded are of this exact property and reflect its current condition.',
    'I understand that Fractal Share may verify this submission using public records, geolocation data, and photo metadata.',
    'I understand that knowingly providing false or misleading information may result in listing removal and legal consequences.',
    'I understand that I am legally responsible for the accuracy of this submission and all information provided.',
  ] as const;

  /* state for each box ------------------------------------------ */
  const [checked, setChecked] = useState<boolean[]>(
    () => Array(items.length).fill(false),
  );

  const toggle = (idx: number) => {
    const next = checked.map((c, i) => (i === idx ? !c : c));
    setChecked(next);
    onChange?.(next.every(Boolean));
  };

  return (
    <section className="mx-auto max-w-lg px-4">
      {/* heading & helper */}
      <h2 className="mb-1 text-2xl font-extrabold">Confirm your submission</h2>
      <p className="mb-6 text-sm text-gray-600">
        By checking the boxes below, you confirm that all the information and
        documents you’ve submitted are accurate, truthful, and legally valid.
      </p>

      {/* checklist */}
      <ul className="space-y-4">
        {items.map((text, idx) => (
          <li key={idx} className="flex items-start gap-3 border-b pb-2 last:border-none">
            <input
              type="checkbox"
              checked={checked[idx]}
              onChange={() => toggle(idx)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary"
            />
            <span className="text-sm">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
