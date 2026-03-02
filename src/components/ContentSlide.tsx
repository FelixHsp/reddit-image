import React from 'react';
import type { ContentData } from '../types';

interface ContentProps {
  content: ContentData;
  index: number;
}

const getTextSize = (enLen: number, zhLen: number): string => {
  const total = enLen + zhLen;
  if (total < 100) return 'text-5xl';
  if (total < 300) return 'text-4xl';
  if (total < 700) return 'text-3xl';
  if (total < 1000) return 'text-2xl';
  return 'text-lg';
};

export const ContentSlide: React.FC<ContentProps> = ({ content }) => {
  const textSize = getTextSize(content.textEn.length, content.textZh.length);

  // Simple function to parse bold text (surrounded by **) and apply highlight
  const renderHighlightedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const innerText = part.slice(2, -2);
        return (
          <span key={i} className="bg-orange-100 text-orange-900 px-1 rounded mx-0.5">
            {innerText}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div 
      className="w-[800px] h-[1066px] bg-[#f9fafb] relative overflow-hidden flex flex-col items-center"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Orange Top and Bottom Bars to match original image style */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#ff4500]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#ff4500]"></div>
      <div className="absolute top-0 bottom-0 left-0 w-4 bg-[#ff4500]"></div>
      <div className="absolute top-0 bottom-0 right-0 w-4 bg-[#ff4500]"></div>

      <div className="w-full flex-1 p-8 flex flex-col gap-6 pt-12">
        {/* Author Label */}
        <div className="self-start bg-[#ff4500] text-white px-4 py-2 rounded-lg font-bold text-xl">
          {content.author}
        </div>

        {/* English Text Box */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mt-4">
          <p className={`text-[#1A1A1B] ${textSize} leading-relaxed`}>
            {renderHighlightedText(content.textEn)}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-2"></div>

        {/* Chinese Translation Box */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <p className={`text-gray-800 ${textSize} leading-relaxed`}>
            {content.textZh}
          </p>
        </div>
      </div>
    </div>
  );
};
