/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Button from "@/components/Button";
import React, { useState, useEffect, useRef } from "react";
import { useInputContext } from "@/hooks/useInputContext";

export default function MinimumSubarrayVisualizer() {
  const { inputState } = useInputContext();
  const nums = inputState.minSumSubarray?.nums || [];
  const trace = inputState.minSumSubarray?.trace || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < trace.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1200);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, trace.length]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [trace]);

  if (!nums.length || !trace.length) {
    return (
      <div className="p-6 text-center text-lg text-red-400">
        Please enter an input and click Animate to see the visualization.
      </div>
    );
  }

  const { start, end, sum, minLength, action, description } = trace[currentStep];

  const handlePlay = () => {
    if (currentStep === trace.length - 1) setCurrentStep(0);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="text-xl font-semibold text-center">
        Minimum Size Subarray Sum Visualizer
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-300 rounded" /> Start of window
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-300 rounded" /> End of window
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-200 rounded" /> Current window range
        </div>
      </div>

      {/* Array display */}
      <div className="flex flex-wrap gap-3 justify-center text-slate-800">
        {nums.map((num: number, index: number) => {
          let highlight = "bg-gray-100";

          if (index >= start && index <= end) {
            highlight = "bg-yellow-200"; // entire window
          }
          if (index === start) {
            highlight = "bg-green-300"; // start
          }
          if (index === end) {
            highlight = "bg-red-300"; // end
          }

          return (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center border border-slate-600 rounded-xl text-lg font-medium ${highlight}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Summary info */}
      <div className="space-y-2 text-center">
        <div><strong>Current Window Sum:</strong> {sum}</div>
        <div><strong>Minimum Length Found:</strong> {minLength === Infinity ? "-" : minLength}</div>
        <div>
          <strong>Last Action:</strong>{" "}
          <span className={
            action === 'expand' ? 'text-blue-600' :
            action === 'shrink' ? 'text-yellow-600' :
            'text-green-600'
          }>
            {action}
          </span>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="bg-gray-200 p-4 rounded text-slate-800 text-base whitespace-pre-wrap">
        <strong>Step {currentStep + 1}:</strong> {description}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        <Button variant="default" onClick={handlePlay}>Play</Button>
        <Button variant="secondary" onClick={handlePause}>Pause</Button>
        <Button variant="destructive" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}
