"use client";
import { useInputContext } from "@/hooks/useInputContext";
import { ExternalLink } from "lucide-react";
import React, { useState } from "react";


export default function ReverseLinkedListInput() {
  const { setInputState } = useInputContext();
  const [inputStr, setInputStr] = useState("1, 2, 3, 4, 5");
  const [error, setError] = useState("");
  const [testSize, setTestSize] = useState(5);

  const handleSubmit = () => {
    try {
      let arr: number[];

      // Try parsing if input is in JSON array format
      if (inputStr.trim().startsWith("[") && inputStr.trim().endsWith("]")) {
        arr = JSON.parse(inputStr.trim());
        if (!Array.isArray(arr)) {
          throw new Error("Parsed input is not an array.");
        }
      } else {
        // Otherwise, parse comma-separated values
        arr = inputStr
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
          .map((n) => {
            const num = Number(n);
            if (!Number.isInteger(num)) {
              throw new Error(`"${n}" is not a valid integer.`);
            }
            return num;
          });
      }

      if (arr.length === 0) {
        throw new Error("Array cannot be empty.");
      }

      setInputState({
        reverseLinklist: {
          inputArray: inputStr
        }
      });
      setError("");
    } catch (err) {
      setError((err as Error).message);
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
    window.open("https://leetcode.com/problems/reverse-linked-list/", "_blank");
  };

  return (
    <div className="flex flex-col gap-3 mb-6 mx-auto mt-10 pt-5">
      <label className="block text-sm font-medium text-orange-100">
        Array (comma-seperated):
        <input
          type="text"
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          className="border border-gray-400 px-4 py-2 rounded w-full text-slate-800"
          placeholder="1, 2, 3"
        />
      </label>

      <div className="flex items-center gap-3">
        <label htmlFor="size" className="block text-sm font-medium text-orange-10">
          Select test size:
          <select
            id="size"
            value={testSize}
            onChange={handleSizeChange}
            className="border border-gray-400 px-2 py-1 rounded text-slate-800 ml-5 w-60"
          >
            {[5, 10, 15, 20, 50].map((size) => (
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
            className="bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Animate
          </button>
        </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
