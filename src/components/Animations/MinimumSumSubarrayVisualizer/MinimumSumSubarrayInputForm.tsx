'use client';

import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { generateMinSumCase, validateMinSumInputs, generateMinSubarrayTraces } from './utils';
import { useInputContext } from '@/hooks/useInputContext';

export default function MinSubarraySumInputForm() {
  const [arrayInput, setArrayInput] = useState('2, 3, 1, 2, 4, 3');
  const [targetInput, setTargetInput] = useState('7');
  const [selectedSize, setSelectedSize] = useState('');

  const { setInputState } = useInputContext();

  useEffect(() => {
    const result = validateMinSumInputs(arrayInput, targetInput);
    const trace = generateMinSubarrayTraces(result.array, result.target);
    setInputState({
      minSumSubarray: {
        nums: result.array,
        target: result.target,
        trace: trace
      }
    });
  }, [arrayInput, setInputState, targetInput]);

  const handleSubmit = () => {
    const result = validateMinSumInputs(arrayInput, targetInput);

    if (!result.valid) {
      console.error(result.errors);
      alert(
        Object.values(result.errors).join('\n') ||
        'Invalid input, please check your entries.'
      );
      return;
    }

    const trace = generateMinSubarrayTraces(result.array, result.target);
    setInputState({
      minSumSubarray: {
        nums: result.array,
        target: result.target,
        trace: trace
      }
    });
  };

  const navigateToLeetcode = () => {
    window.open("https://leetcode.com/problems/minimum-size-subarray-sum/", "_blank");
  }

  return (
    <div className="mx-auto p-6 shadow space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-orange-100">
          Choose a test case size:
          <select
            value={selectedSize}
            onChange={(e) => {
              const size = parseInt(e.target.value);
              setSelectedSize(e.target.value);

              const generated = generateMinSumCase(size, Number(targetInput || 100));
              setArrayInput(generated.join(', '));
            }}
            className="mt-1 w-full px-4 py-2 border border-orange-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none text-slate-800"
          >
            <option value="">Custom</option>
            <option value="20">Small (20 elements)</option>
            <option value="50">Medium (50 elements)</option>
            <option value="100">Large (100 elements)</option>
            <option value="200">Very Large (200 elements)</option>
          </select>
        </label>

        {/* Array Input */}
        <label className="block text-sm font-lg">
          Array (comma-separated):
          <textarea
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            rows={3}
            className="text-slate-800 mt-1 w-full px-4 py-2 border border-orange-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none resize-y overflow-auto break-words"
            placeholder="e.g. 2, 3, 1, 2, 4, 3"
          />
        </label>

        {/* Target Input */}
        <label className="block text-sm font-lg">
          Target:
          <input
            type="number"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-orange-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none text-slate-800"
            placeholder="e.g. 7"
          />
        </label>
      </div>

      <div className="mt-10 pt-10 flex justify-end space-x-3 text-lg">
        <button
          className="inline-flex items-center gap-x-1 bg-orange-100 text-slate-800 px-4 py-2 rounded shadow"
          onClick={navigateToLeetcode}
        >
          Solve on Leetcode
          <ExternalLink className="w-4 h-4" />
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Animate
        </button>
      </div>
    </div>
  );
}
