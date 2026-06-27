import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export default function Accordion({ steps }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border border-[var(--color-brand-border)] rounded-lg overflow-hidden bg-[var(--color-brand-card)]">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full px-5 py-4 flex items-center justify-between bg-black/20 hover:bg-black/40 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-bold text-sm border border-blue-500/20">
                  {idx + 1}
                </span>
                <span className="font-semibold text-gray-200">{step.title}</span>
              </div>
              <ChevronDown className={clsx("w-5 h-5 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            <div
              className={clsx(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-5 text-gray-400 text-sm border-t border-[var(--color-brand-border)]">
                {step.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
