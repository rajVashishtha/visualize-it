"use client";

import React from "react";
import { Card, CardContent } from "@/components/Cards/Card";
import { CodeBlock, dracula } from "react-code-blocks";

export default function minSizeSubarraySum() {
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
    <>
      <div className="min-h-screen bg-orange-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center text-slate-800">
            Leetcode: Minimum Size Subarray Sum
          </h1>

          <Card className="bg-gray-800 text-orange-100">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">📝 Problem Description</h2>
              <p>
                Given an array of positive integers <code>nums</code> and an
                integer <code>target</code>, return the minimal length of a{" "}
                <code>subarray</code> whose sum is greater than or equal to{" "}
                <code>target</code>. If there is no such subarray, return 0
                instead.
              </p>

              <h2 className="text-2xl font-semibold">📘 Example</h2>
              <pre className="bg-gray-700 p-4 rounded text-sm">
                {`
    Input: target = 7, nums = [2,3,1,2,4,3]
    Output: 2
    Explanation: The subarray [4,3] has the minimal length under the problem constraint.
  `}
              </pre>

              <section>
                <h2 className="text-2xl font-semibold">🛠️ Approach</h2>
                <pre className="bg-gray-700 p-4 rounded text-sm mt-4">
                  {`
    Use a sliding window technique in which we can expand the window by moving right and adds to curSum,
    then shrinks it from left while curSum ≥ target to find the smallest valid subarray.
    The shortest such window length is tracked in minLen and returned.
                  `}
                </pre>
              </section>

              <h2 className="text-2xl font-semibold">✅ Solutions</h2>
              <CodeBlock
                text={minSizeSubarraySumCode}
                language="javascript"
                showLineNumbers={true}
                theme={dracula}
              />
              {/* <InputForm /> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
