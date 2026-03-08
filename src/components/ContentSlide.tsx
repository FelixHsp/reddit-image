import React, { useLayoutEffect, useRef, useState } from 'react';
import type { ContentData, VocabItem } from '../types';

interface ContentProps {
  content: ContentData;
  index: number;
}

const SIZES = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'] as const;

// 40px 宽 = 低频波浪；height=9 确保 stroke-width 1.8 的波谷不被裁切
const wavySvg = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="9">' +
  '<path d="M0 5 C8 2 16 2 20 5 C24 8 32 8 40 5"' +
  ' fill="none" stroke="#ff4500" stroke-width="1.8" stroke-linecap="round"/>' +
  '</svg>'
);

const wavyStyle: React.CSSProperties = {
  color: '#ff4500',
  fontWeight: 700,
  backgroundImage: `url("data:image/svg+xml,${wavySvg}")`,
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'left bottom',
  backgroundSize: '40px 9px',
  paddingBottom: '9px',
  lineHeight: 'inherit',
};

function buildRegex(words: string[]): RegExp | null {
  if (!words.length) return null;
  const escaped = [...words]
    .sort((a, b) => b.length - a.length)
    .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`(${escaped.join('|')})`, 'gi');
}

function applyHighlights(text: string, regex: RegExp | null, matchSet: Set<string>): React.ReactNode {
  if (!regex) return text;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        matchSet.has(part.toLowerCase())
          ? <span key={i} style={wavyStyle}>{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}

export const ContentSlide: React.FC<ContentProps> = ({ content }) => {
  const [sizeIdx, setSizeIdx] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const vocab: VocabItem[] = content.vocab ?? [];

  const normalizedAuthor = (content.author ?? '').replace(/^\/?u\//i, '').trim();

  useLayoutEffect(() => { setSizeIdx(0); }, [content.id]);

  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    if (el.scrollHeight > el.clientHeight && sizeIdx < SIZES.length - 1) {
      setSizeIdx(i => i + 1);
    }
  });

  const textSize = SIZES[sizeIdx];

  const renderEnglish = (text: string): React.ReactNode => {
    const vocabWords = vocab.map(v => v.word);
    const vocabRegex = buildRegex(vocabWords);
    const vocabSet = new Set(vocabWords.map(w => w.toLowerCase()));

    // Split on **...** markers first
    const boldParts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {boldParts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <span key={i} style={wavyStyle}>{part.slice(2, -2)}</span>
            );
          }
          return <span key={i}>{applyHighlights(part, vocabRegex, vocabSet)}</span>;
        })}
      </>
    );
  };

  const renderChinese = (text: string): React.ReactNode => {
    const zhWords = vocab.map(v => v.wordZh).filter(Boolean);
    const zhRegex = buildRegex(zhWords);
    const zhSet = new Set(zhWords.map(w => w.toLowerCase()));
    return applyHighlights(text, zhRegex, zhSet);
  };

  const initial = normalizedAuthor?.[0]?.toUpperCase() ?? 'U';

  return (
    <div
      ref={canvasRef}
      className="w-[800px] h-[1066px] relative overflow-hidden flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif', background: '#FAFAFA' }}
    >
      {/* Orange frame */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-[#ff4500]" />
      <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-[#ff4500]" />
      <div className="absolute top-0 bottom-0 left-0 w-[6px] bg-[#ff4500]" />
      <div className="absolute top-0 bottom-0 right-0 w-[6px] bg-[#ff4500]" />

      {/* Author header */}
      <div className="flex items-center gap-4 px-10 pt-10 pb-2">
        <div className="w-12 h-12 rounded-full bg-[#ff4500] flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white font-bold text-lg">{initial}</span>
        </div>
        <div>
          <p className="font-bold text-gray-900 text-xl leading-tight">u/{normalizedAuthor}</p>
          <p className="text-sm text-gray-400 tracking-wide">Reddit 评论</p>
        </div>
        <div className="ml-auto text-[#ff4500] opacity-20">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
          </svg>
        </div>
      </div>

      {/* English section */}
      <div className="mx-10 mt-4 bg-white rounded-2xl px-10 pt-4 pb-8 relative shadow-sm" style={{ border: '1px solid #F0F0F0' }}>
        <span className="absolute top-[-18px] left-8 text-[88px] leading-none select-none font-serif" style={{ color: '#FFE8DF' }}>"</span>
        <p className={`text-gray-900 ${textSize} leading-loose relative`}>
          {renderEnglish(content.textEn)}
        </p>
      </div>

      {/* Separator */}
      <div className="flex items-center gap-4 px-10 py-5">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">对照翻译</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Chinese section */}
      <div className="mx-10 mb-10 rounded-2xl px-10 py-8" style={{ background: '#FFF7F5', border: '1px solid #FFE4DB' }}>
        <p className={`${textSize} leading-loose`} style={{ color: '#3D1A10' }}>
          {renderChinese(content.textZh)}
        </p>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-5 right-10 opacity-30">
        <img src="/reddit.svg" alt="reddit" className="h-5" />
      </div>
    </div>
  );
};
