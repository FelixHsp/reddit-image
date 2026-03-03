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
      <div className="mt-16 flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-md">
        <img src="/reddit.svg" alt="reddit" className="h-10" />
        <span className="text-[#ff4500] text-3xl font-bold tracking-wide">高赞问答</span>
      </div>

      {/* Main Chinese Title */}
      <div className="mt-20 px-12 text-center w-full">
        <h1 className="text-white text-6xl font-bold leading-[1.3] drop-shadow-md">
          {data.mainQuestionZh.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h1>
      </div>

      {/* Reddit Post Card */}
      <div className="absolute bottom-16 w-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
        {/* Post Meta */}
        <div className="flex items-center gap-3 text-gray-500 text-lg mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src="/ask.webp" alt="subreddit" className="w-full h-full object-cover" />
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
