import React from 'react';
import type { ThreadData } from '../types';
import { MessageSquare, ArrowUp, Share } from 'lucide-react';

interface CoverProps {
  data: ThreadData;
}

export const Cover: React.FC<CoverProps> = ({ data }) => {
  return (
    <div 
      className="w-[800px] h-[1066px] bg-[#ff4500] relative overflow-hidden flex flex-col items-center"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top Header */}
      <div className="mt-16 flex items-center gap-3">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-[3px] border-white shadow-sm">
          {/* Simple Reddit Logo Approximation using CSS shapes */}
          <div className="relative w-full h-full bg-[#ff4500] flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-9 h-9 text-white fill-current">
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-3.5 6a3.5 3.5 0 0 1-3.3-2.3.5.5 0 1 1 .9-.4 2.5 2.5 0 0 0 4.8 0 .5.5 0 1 1 .9.4A3.5 3.5 0 0 1 10 15z" />
            </svg>
          </div>
        </div>
        <div className="text-white text-3xl font-medium tracking-wide flex items-center gap-2">
          <span>reddit</span>
          <span className="font-bold">高赞问答</span>
        </div>
      </div>

      {/* Main Chinese Title */}
      <div className="mt-20 px-12 text-center w-full">
        <h1 className="text-white text-6xl font-bold leading-[1.3] drop-shadow-md">
          {data.mainQuestionZh}
        </h1>
      </div>

      {/* Reddit Post Card */}
      <div className="absolute bottom-16 w-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
        {/* Post Meta */}
        <div className="flex items-center gap-3 text-gray-500 text-lg mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <div className="w-full h-full bg-[#ff4500]"></div>
          </div>
          <span className="font-medium text-gray-800">{data.subreddit}</span>
          <span>•</span>
          <span>{data.time}</span>
          <span className="ml-auto text-gray-400">...</span>
        </div>

        {/* Author */}
        <div className="text-gray-500 text-lg mb-6">
          {data.author}
        </div>

        {/* English Title */}
        <h2 className="text-[#1A1A1B] text-4xl font-bold leading-snug mb-6">
          {data.titleEn}
        </h2>

        {/* Quote if exists */}
        {data.quoteEn && (
          <div className="text-xl text-gray-700 italic mb-8 font-serif leading-relaxed">
            {data.quoteEn}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center gap-6 mt-8">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <ArrowUp className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700 font-bold text-lg">{data.upvotes}</span>
            <ArrowUp className="w-6 h-6 text-gray-500 rotate-180" />
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <MessageSquare className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700 font-medium text-lg">{data.comments}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 ml-auto">
            <Share className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700 font-medium text-lg">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};
