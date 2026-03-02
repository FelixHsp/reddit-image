import React, { useState } from 'react';
import type { ThreadData } from '../types';

interface JSONInputProps {
  onDataLoaded: (data: ThreadData) => void;
  defaultData: ThreadData;
}

export const JSONInput: React.FC<JSONInputProps> = ({ onDataLoaded, defaultData }) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultData, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onDataLoaded(parsed);
      setError(null);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Input Data (JSON)</h2>
      <textarea
        className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff4500] focus:border-transparent outline-none"
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      <button
        onClick={handleLoad}
        className="mt-4 bg-[#171717] hover:bg-[#404040] text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer"
      >
        Load Data
      </button>
    </div>
  );
};
