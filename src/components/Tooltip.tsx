import React from 'react';

interface TooltipProps {
  message: string;
}

export default function Tooltip({ message }: TooltipProps) {
  return (
    <span className="group relative cursor-help ml-1 text-blue-500 text-sm">
      ⓘ
      <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded shadow-lg w-64 top-6 left-1/2 -translate-x-1/2 z-10">
        {message}
      </div>
    </span>
  );
}
