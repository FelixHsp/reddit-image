import React, { useLayoutEffect, useRef, useState } from 'react';
import type { VocabItem } from '../types';

interface VocabSlideProps {
  vocab: VocabItem[];
  subreddit: string;
}

const CANVAS_H = 1066;
const BORDER = 6;
const MIN_SCALE = 0.75; // 低于此比例文字过小，超出部分截断
const MAX_WORDS = 16;   // 对应 MIN_SCALE 下的安全上限

export const VocabSlide: React.FC<VocabSlideProps> = ({ vocab: vocabRaw, subreddit }) => {
  const vocab = vocabRaw.slice(0, MAX_WORDS);
  const truncated = vocabRaw.length > MAX_WORDS;
  const [scale, setScale] = useState(1);
  const innerRef = useRef<HTMLDivElement>(null);
  // Flag prevents the effect from running again after scale is already applied
  const applied = useRef(false);

  // Reset whenever vocab changes
  useLayoutEffect(() => {
    applied.current = false;
    setScale(1);
  }, [vocab]);

  // After each render, measure and shrink once if needed
  useLayoutEffect(() => {
    if (applied.current) return;
    const el = innerRef.current;
    if (!el) return;
    const available = CANVAS_H - BORDER * 2;
    if (el.scrollHeight > available) {
      applied.current = true;
      setScale(Math.max(MIN_SCALE, available / el.scrollHeight));
    } else {
      applied.current = true;
    }
  });

  return (
    <div
      className="w-[800px] h-[1066px] relative overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif', background: '#FAFAFA' }}
    >
      {/* Orange frame */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#ff4500]" />
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#ff4500]" />
      <div className="absolute top-0 bottom-0 left-0 w-[6px] bg-[#ff4500]" />
      <div className="absolute top-0 bottom-0 right-0 w-[6px] bg-[#ff4500]" />

      {/* Scalable inner content */}
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '100%',
        }}
      >
        {/* Header */}
        <div className="px-10 pt-10 pb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-[#ff4500] uppercase mb-1">{subreddit}</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">学学词汇</h2>
            <p className="text-gray-400 text-lg mt-1">Vocabulary of the Week</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-[#ff4500] flex items-center justify-center shadow-md flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
              <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
            </svg>
          </div>
        </div>

        <div className="mx-10 h-px bg-gray-200 mb-5" />

        {/* Vocab grid */}
        <div className="px-10 pb-10 grid grid-cols-2 gap-4">
          {vocab.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 flex flex-col gap-2 shadow-sm"
              style={{ border: '1px solid #F0F0F0' }}
            >
              {/* Row 1: index badge + English word + phonetic */}
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4500] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#ff4500] font-black text-lg leading-tight break-words">{item.word}</p>
                  {item.phonetic && (
                    <p className="text-gray-400 text-xs mt-0.5 font-mono">{item.phonetic}</p>
                  )}
                </div>
              </div>

              {/* trans — full meaning */}
              <p className="pl-8 text-gray-700 font-medium text-base leading-snug">{item.trans}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Truncation hint */}
      {truncated && (
        <div className="absolute bottom-5 left-10 text-xs text-gray-400">
          仅展示前 {MAX_WORDS} 个词汇（共 {vocabRaw.length} 个）
        </div>
      )}

      {/* Bottom branding */}
      <div className="absolute bottom-5 right-10 opacity-30">
        <img src="/reddit.svg" alt="reddit" className="h-5" />
      </div>
    </div>
  );
};
