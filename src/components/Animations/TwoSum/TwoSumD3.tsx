'use client';

import { useRef, useState } from 'react';

type TraceStep = {
  index: number;
  num: number;
  complement: number;
  hashmap: Record<number, number>;
  action: 'check' | 'found';
  result?: [number, number];
};

interface VisualizerProps {
  nums: number[];
  target: number;
  trace: TraceStep[];
}

export default function TwoSumVisualizer({ nums, target, trace }: VisualizerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>(null);

  const step = trace[stepIndex];

  const play = () => {
    if (stepIndex >= trace.length - 1) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= trace.length - 1) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isPlaying ? pause() : play();
  };

  return (
    <div className="p-6 font-mono">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow border space-y-6">

        <div className="flex justify-between text-sm">
          <div>
            Step: {stepIndex + 1}/{trace.length}
          </div>
          <button
            onClick={togglePlay}
            className={`px-4 py-1 rounded text-white font-semibold shadow ${
              isPlaying ? 'bg-red-500' : 'bg-green-600'
            }`}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

        <div className="text-center text-gray-700 text-sm">
          🎯 Target: <strong>{target}</strong> | Looking for complement: <strong>{step.complement}</strong>
        </div>

        {/* Number grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {nums.map((num, i) => {
            let ring = '';
            if (i === step.index) ring = 'ring-4 ring-blue-400';
            else if (num === step.complement) ring = 'ring-4 ring-yellow-400';
            if (step.result?.includes(i)) ring = 'ring-4 ring-green-500';

            return (
              <div
                key={i}
                className={`w-16 h-16 bg-indigo-100 flex items-center justify-center text-xl font-bold border border-indigo-300 rounded transition-all duration-300 ${ring}`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* HashMap display */}
        <div>
          <h2 className="text-md font-semibold text-gray-800 mb-2">HashMap</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-sm">
            {Object.entries(step.hashmap).map(([k, v]) => (
              <div
                key={k}
                className="bg-gray-200 px-2 py-1 rounded border border-gray-400 text-center"
              >
                {k} ➜ index {v}
              </div>
            ))}
            {Object.keys(step.hashmap).length === 0 && (
              <div className="text-slate-400">Empty</div>
            )}
          </div>
        </div>

        {/* Action + Result */}
        <div className="text-sm text-gray-800">
          Action:{' '}
          <span
            className={`font-semibold ${
              step.action === 'found' ? 'text-green-600' : 'text-yellow-600'
            }`}
          >
            {step.action}
          </span>
        </div>

        {step.result && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded border border-green-500 text-sm">
            ✅ Pair Found: {step.result[0]} + {step.result[1]} = {target}
          </div>
        )}
      </div>
    </div>
  );
}
