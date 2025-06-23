'use client';

import React from "react";
import { Card, CardContent } from "@/components/Cards/Card";
import { CodeBlock, dracula } from "react-code-blocks";
import InputForm from "@/components/Animations/TwoSum/AnimationSection";

const twoSumCode = `// Optimal - O(n) using HashMap
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

export default function TwoSumPage() {

  return (
    <>
      <div className="min-h-screen bg-orange-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center text-slate-800">Leetcode: Two Sum</h1>

          <Card className="bg-gray-800 text-orange-100">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">📝 Problem Description</h2>
              <p>
                Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
              </p>
              <p>
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
              </p>
              <p>You can return the answer in any order.</p>

              <h2 className="text-2xl font-semibold">📘 Example</h2>
              <pre className="bg-gray-700 p-4 rounded text-sm">
                {`
    Input: nums = [2,7,11,15], target = 9 
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
  `}
              </pre>

              <section>
                <h2 className="text-2xl font-semibold">🛠️ Approach</h2>
                <pre className="bg-gray-700 p-4 rounded text-sm mt-4">
                {
                  `
    Use a hash map to store the complement of each number while iterating.
    For each number, check if its complement exists in the map. If it does, return both indices.
    This gives an efficient O(n) time solution.
                  `
                }
              </pre>
              </section>

              <h2 className="text-2xl font-semibold">✅ Solutions</h2>
              <CodeBlock
                text={twoSumCode}
                language="javascript"
                showLineNumbers={true}
                theme={dracula}
              />
              <InputForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
    
  );
} 
