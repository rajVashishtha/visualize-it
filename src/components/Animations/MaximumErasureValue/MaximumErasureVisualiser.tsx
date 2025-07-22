"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInputContext } from "@/hooks/useInputContext";
import { generateMaxErasureTraces } from "./utils";
import { motion, AnimatePresence } from "framer-motion";
import isEqual from "lodash.isequal";

interface TraceStep {
  left: number;
  right: number;
  window: number[];
  currSum: number;
  maxSum: number;
  action: string;
  hashState: number[];
}

export default function MaximumErasureValueVisualizer() {
  const { inputState } = useInputContext();
  const nums = inputState?.maximumErasureValue?.inputArray ?? [4, 2, 4, 5, 6];

  const [traces, setTraces] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [lastInput, setLastInput] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate traces on input change
  useEffect(() => {
    if (!isEqual(nums, lastInput)) {
      const generated = generateMaxErasureTraces(nums);
      setTraces(generated);
      setCurrentStep(0);
      setIsPlaying(false);
      setLastInput(nums);
    }
  }, [nums, lastInput]);

  // Handle autoplay logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < traces.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPlaying, traces]);

  const current = traces[currentStep] ?? {};

  const handleNext = () => {
    if (currentStep < traces.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto bg-slate-800 text-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-orange-400">
        Maximum Erasure Value – Sliding Window
      </h2>

      {current?.action && (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center text-lg text-green-400"
        >
          {current.action}
        </motion.div>
      )}

      {/* Sliding window visualization */}
      <div className="flex justify-center gap-4 flex-wrap">
        {nums.map((num: number, idx: number) => {
          const inWindow = current?.left <= idx && idx <= current?.right;
          return (
            <motion.div
              key={idx}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`text-lg w-12 h-12 flex items-center justify-center rounded-full border-2 
                ${
                  idx === current.left
                    ? "border-yellow-400"
                    : idx === current.right
                    ? "border-orange-500"
                    : "border-gray-500"
                }
                ${inWindow ? "bg-blue-600" : "bg-gray-700"}
              `}
            >
              {num}
            </motion.div>
          );
        })}
      </div>

      {/* Hash Set */}
      <div>
        <h3 className="text-xl font-semibold text-center mb-2">Hash Set</h3>
        <motion.div
          layout
          className="flex justify-center gap-4 flex-wrap min-h-[3rem]"
        >
          <AnimatePresence>
            {current?.hashState?.map((val) => (
              <motion.div
                key={val}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-lg"
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Step History */}
      <div className="bg-gray-800 p-4 rounded max-h-64 overflow-y-auto">
        <h4 className="text-orange-300 font-semibold mb-2">Step History</h4>
        <ol className="space-y-1 text-sm">
          {traces.map((trace, idx) => (
            <li
              key={idx}
              className={`p-2 rounded border cursor-pointer ${
                idx === currentStep
                  ? "bg-orange-600 border-orange-300 text-white"
                  : "bg-gray-700 border-gray-600 text-gray-300"
              }`}
              onClick={() => setCurrentStep(idx)}
            >
              <b>Step {idx + 1}</b>: {trace.action}
            </li>
          ))}
        </ol>
      </div>

      {/* Controls */}
      <div className="flex justify-between flex-wrap gap-2 pt-4">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 disabled:opacity-30"
        >
          Previous
        </button>

        {isPlaying ? (
          <button
            onClick={() => setIsPlaying(false)}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={() => {
              if (currentStep === traces.length - 1) setCurrentStep(0);
              setIsPlaying(true);
            }}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Play
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400"
        >
          Reset
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === traces.length - 1}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 disabled:opacity-30"
        >
          Next
        </button>
      </div>
      <div>
        {/* ✅ Final Answer */}
        {currentStep === traces.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl text-lime-400 font-bold border-t border-gray-700 pt-4"
          >
            ✅ Final Max Sum: {current.maxSum}
          </motion.div>
        )}
      </div>
    </div>
  );
}
