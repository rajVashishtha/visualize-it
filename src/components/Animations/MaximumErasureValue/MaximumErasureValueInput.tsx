"use client";

import { useInputContext } from "@/hooks/useInputContext";
import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function MaximumErasureValueInput() {
  const { setInputState } = useInputContext();
  const [inputStr, setInputStr] = useState("4, 2, 4, 5, 6");
  const [error, setError] = useState("");
  const [testSize, setTestSize] = useState(5);

  // Validate as user types
  useEffect(() => {
    const trimmed = inputStr.trim();

    if (trimmed === "") {
      setError("Input cannot be empty.");
      return;
    }

    const arr = trimmed
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (arr.length === 0) {
      setError("Please enter at least one number.");
      return;
    }

    if (arr.some((s) => isNaN(Number(s)) || !Number.isFinite(Number(s)))) {
      setError("Please enter only valid integers separated by commas.");
      return;
    }

    setError(""); // valid input
  }, [inputStr]);

  const handleSubmit = () => {
    if (error) return;

    try {
      const arr = inputStr
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map(Number);

      setInputState({
        maximumErasureValue: {
          inputArray: arr,
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError("An unexpected error occurred while parsing input." + err);
    }
  };

  const generateArray = (size: number): string => {
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    ).join(", ");
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = parseInt(e.target.value);
    setTestSize(size);
    const generated = generateArray(size);
    setInputStr(generated);
    setError("");
  };

  const openLeetCode = () => {
    window.open("https://leetcode.com/problems/maximum-erasure-value/", "_blank");
  };

  return (
    <div className="flex flex-col gap-3 mb-6 mx-auto mt-10 pt-5">
      <label className="block text-sm font-medium text-orange-100">
        Array (comma-separated):
        <input
          type="text"
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          className={`border px-4 py-2 rounded w-full text-slate-800 ${
            error ? "border-red-500" : "border-gray-400"
          }`}
          placeholder="e.g. 4, 2, 4, 5, 6"
        />
      </label>

      <div className="flex items-center gap-3">
        <label htmlFor="size" className="block text-sm font-medium text-orange-100">
          Select test size:
          <select
            id="size"
            value={testSize}
            onChange={handleSizeChange}
            className="border border-gray-400 px-2 py-1 rounded text-slate-800 ml-5 w-60"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 pt-4 flex justify-end space-x-3 text-lg">
        <button
          className="inline-flex items-center gap-x-1 bg-orange-100 text-slate-800 px-4 py-2 rounded shadow"
          onClick={openLeetCode}
        >
          Solve on LeetCode
          <ExternalLink className="w-4 h-4" />
        </button>
        <button
          onClick={handleSubmit}
          disabled={!!error}
          className={`px-4 py-2 rounded shadow text-white ${
            error ? "bg-gray-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-600"
          }`}
        >
          Animate
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
