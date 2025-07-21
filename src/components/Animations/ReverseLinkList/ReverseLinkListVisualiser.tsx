import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateReverseLinkedListTrace, parseAndValidateInput, TraceStep } from "./utils";
import { useInputContext } from "@/hooks/useInputContext";

// Styled node
function NodeCircle({ val, highlight }: { val: number; highlight?: string }) {
  const base = "w-14 h-14 flex items-center justify-center rounded-full text-slate text-xl font-bold";
  const color =
    highlight === "curr"
      ? "bg-blue-500"
      : highlight === "prev"
      ? "bg-green-500"
      : highlight === "next"
      ? "bg-yellow-400 text-black"
      : "bg-gray-300";
  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 1 }}
      className={base + " " + color}
    >
      {val}
    </motion.div>
  );
}

// Arrow with animation
function Arrow() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center"
    >
      <div className="w-8 h-1 bg-black relative" />
      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-black" />
    </motion.div>
  );
}

export default function ReverseLinkedListVisualizer() {
  const { inputState } = useInputContext();
  const rawInput = inputState?.reverseLinklist?.inputArray ?? "1, 2, 3, 4, 5";

  // Memoize parsing, so not recomputed every render
  const { valid, data, error } = useMemo(
    () => parseAndValidateInput(rawInput),
    [rawInput]
  );
  const inputArray = useMemo(() => data ?? [1, 2, 3, 4, 5], [data]);

  const [trace, setTrace] = useState<TraceStep[]>(() =>
    generateReverseLinkedListTrace(inputArray)
  );
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [allSteps, setAllSteps] = useState<string[]>([]);

  // Trace update
  useEffect(() => {
    setTrace(generateReverseLinkedListTrace(inputArray));
    setStep(0);
    setIsPlaying(false);
  }, [inputArray]);

  // Animation for Play button
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStep((prev) => {
          if (prev + 1 < trace.length) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, trace.length]);

  const handlePlayPause = () => {
    if (step === trace.length - 1) setStep(0);
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const { values, highlights, stepDescription } = trace[step];

  useEffect(() => {
    setAllSteps([...allSteps, stepDescription]);
  }, [stepDescription])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reverse Linked List Visualizer</h2>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-slate-800 min-h-[96px]">
        {valid ? (
          <AnimatePresence>
            {values.map((val, i) => {
              let hl: string | undefined;
              if (highlights.curr === i) hl = "curr";
              else if (highlights.prev === i) hl = "prev";
              else if (highlights.next === i) hl = "next";
              return (
                <React.Fragment key={val + "-" + i + "-" + step}>
                  <NodeCircle val={val} highlight={hl} />
                  {i < values.length - 1 && <Arrow />}
                </React.Fragment>
              );
            })}
          </AnimatePresence>
        ) : (
          <h4 className="text-red-600">{error}</h4>
        )}
      </div>
      {valid && (
        <div className="text-center text-gray-600 space-y-2">
          <p>🔵 Current | 🟢 Previous | 🟡 Next</p>
          <div className="max-w-2xl mx-auto my-4">
            {trace.map((t, idx) => (
              <div
                key={t.stepDescription + idx}
                className={`
                  font-mono px-3 py-2 my-1 rounded transition
                  ${idx === step
                    ? "bg-blue-500 text-white font-bold ring-2 ring-blue-200"
                    : "bg-gray-800 text-gray-300"}
                `}
              >
                {t.stepDescription}
              </div>
            ))}
          </div>
          <p>Step: {step + 1} / {trace.length}</p>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0 || isPlaying}
              className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-2xl flex items-center justify-center ${step === 0 || isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Previous step"
              title="Previous step"
            >
              &#8592;
            </button>
            <button
              onClick={handlePlayPause}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Reset
            </button>
            <button
              onClick={() => setStep((s) => Math.min(s + 1, trace.length - 1))}
              disabled={step === trace.length - 1 || isPlaying}
              className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-2xl flex items-center justify-center ${step === trace.length - 1 || isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Next step"
              title="Next step"
            >
              &#8594;
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
