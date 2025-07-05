/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useInputContext } from '@/hooks/useInputContext';
import { useEffect, useRef, useState } from 'react';

export default function TwoSumVisualizer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    inputState: { twoSum },
  } = useInputContext();

  // Reset visualizer when input changes
  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [twoSum]);

  // Guard: early exit if inputs are not ready
  if (!twoSum || !twoSum.nums || !twoSum.target || !twoSum.trace?.length) {
    return null;
  }

  const { nums, target, trace } = twoSum;
  const step = trace[stepIndex] ?? trace[0];
  const foundStep = trace.find((t: any) => t.action === 'found');
  const isLastStep = stepIndex === trace.length - 1;
  const isNotFound = isLastStep && !foundStep;

  const play = () => {
    if (stepIndex >= trace.length - 1) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= trace.length - 1) {
          clearInterval(intervalRef.current as unknown as number);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const pause = () => {
    clearInterval(intervalRef.current as unknown as number);
    setIsPlaying(false);
  };

  const reset = () => {
    setStepIndex(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isPlaying ? pause() : play();
  };

  return (
    <div className="p-6 font-mono text-slate-800">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow border space-y-6">

        {/* Controls */}
        <div className="flex justify-between text-sm items-center">
          <div>
            Step: {stepIndex + 1}/{trace.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              disabled={isLastStep}
              className={`px-4 py-1 rounded text-white font-semibold shadow ${
                isPlaying ? 'bg-red-500' : 'bg-green-600'
              } ${isLastStep ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-1 rounded bg-yellow-700 text-white font-semibold shadow"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Target Info */}
        <div className="text-center text-gray-700 text-lg">
          🎯 Target: <strong>{target}</strong>
        </div>

        {/* Explanation of Current Step */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-800">
          <p>
            🔎 Checking if <strong>{step.complement}</strong> (target - current number{' '}
            <strong>{step.num}</strong>) exists in the hashmap.
          </p>
          <p>
            👉 Current index: <strong>{step.index}</strong> | Number: <strong>{step.num}</strong>
          </p>
        </div>

        {/* Number Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {nums.map((num: number, i: number) => {
            let ring = '';
            if (i === step.index) ring = 'ring-4 ring-blue-400';
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

        {/* HashMap Display */}
        <div>
          <h2 className="text-md font-semibold text-gray-800 mb-2">🧠 HashMap (Number ➜ Index)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-sm">
            {Object.entries(step.hashmap).map(([k, v]: [string, any]) => (
              <div
                key={k}
                className="bg-gray-200 px-2 py-1 rounded border border-gray-400 text-center"
              >
                <span className="font-semibold text-blue-600">{k}</span> ➜ index{' '}
                <span className="text-purple-600">{v}</span>
              </div>
            ))}
            {Object.keys(step.hashmap).length === 0 && (
              <div className="text-slate-400">Empty</div>
            )}
          </div>
        </div>

        {/* Action Display */}
        <div className="text-sm text-gray-800">
          Action:{' '}
          <span
            className={`font-semibold ${
              step.action === 'found' ? 'text-green-600' : 'text-yellow-600'
            }`}
          >
            {step.action === 'found' ? '✅ Pair Found!' : '🔍 Checking complement...'}
          </span>
        </div>

        {/* Final Results */}
        {step.result && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded border border-green-500 text-sm">
            ✅ Success: nums[{step.result[0]}] + nums[{step.result[1]}] = {target}
          </div>
        )}

        {isNotFound && (
          <div className="mt-4 bg-red-100 text-red-800 p-3 rounded border border-red-500 text-sm">
            ❌ No valid pair found that adds up to the target.
          </div>
        )}
      </div>
    </div>
  );
}
