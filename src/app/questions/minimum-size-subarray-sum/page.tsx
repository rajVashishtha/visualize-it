'use client';

import React from "react";
import { Card, CardContent } from "@/components/Cards/Card";
import { CodeBlock, dracula } from "react-code-blocks";
import MinSubarraySumInputForm from "@/components/Animations/MinimumSumSubarrayVisualizer/MinimumSumSubarrayInputForm";
import MinimumSubarrayVisualizer from "@/components/Animations/MinimumSumSubarrayVisualizer/MinimumSumSubarrayVisualizer";

export default function MinSizeSubarraySumPage() {
  const minSizeSubarraySumCode = `// Optimal - O(n) using Sliding Window
var minSubArrayLen = function(target, nums) {
  let minLen = Infinity;
  let left = 0;
  let curSum = 0;

  for (let right = 0; right < nums.length; right++) {
      curSum += nums[right];

      while (curSum >= target) {
          if (right - left + 1 < minLen) {
              minLen = right - left + 1;
          }
          curSum -= nums[left];
          left++;
      }
  }

  return minLen !== Infinity ? minLen : 0;    
};`;

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <div className="mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Leetcode: Minimum Size Subarray Sum
        </h1>

        <Card className="bg-gray-800 text-orange-100">
          <CardContent className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Left Column - Problem Description */}
              <div className="space-y-6">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold">📝 Problem Description</h2>
                  <p>
                    Given an array of positive integers <code>nums</code> and an
                    integer <code>target</code>, return the minimal length of a{" "}
                    <code>subarray</code> whose sum is greater than or equal to{" "}
                    <code>target</code>. If there is no such subarray, return 0 instead.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold">📘 Example</h2>
                  <pre className="bg-gray-700 p-4 rounded text-sm whitespace-pre-wrap">
{`Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.`}
                  </pre>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold">🛠️ Approach</h2>
                  <pre className="bg-gray-700 p-4 rounded text-sm whitespace-pre-wrap">
{`Use a sliding window technique where we expand the window by moving the right pointer and adding to curSum,
then shrink it from the left while curSum ≥ target to find the smallest valid subarray.
The shortest such window length is tracked in minLen and returned.`}
                  </pre>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold">✅ Solution</h2>
                  <CodeBlock
                    text={minSizeSubarraySumCode}
                    language="javascript"
                    showLineNumbers={true}
                    theme={dracula}
                  />
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold">🔧 Try it Yourself</h2>
                  <MinSubarraySumInputForm />
                </section>
              </div>

              {/* Right Column - Visualizer */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">🎥 Visualizer</h2>
                <MinimumSubarrayVisualizer />
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
