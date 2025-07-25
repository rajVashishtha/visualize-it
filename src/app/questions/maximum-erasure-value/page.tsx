"use client";

import React from "react";
import { Card, CardContent } from "@/components/Cards/Card";
import { CodeBlock, dracula } from "react-code-blocks";
import MaximumErasureValueVisualizer from "@/components/Animations/MaximumErasureValue/MaximumErasureVisualiser";
import MaximumErasureValueInput from "@/components/Animations/MaximumErasureValue/MaximumErasureValueInput";

export default function MaximumErasureValue() {
  const maximumErasureValueCode = `// Sliding window using a set (O(n))
var maximumUniqueSubarray = function(nums) {
    let seen = new Set();
    let left = 0, maxSum = 0, currSum = 0;

    for (let right = 0; right < nums.length; right++) {
        while (seen.has(nums[right])) {
            seen.delete(nums[left]);
            currSum -= nums[left];
            left++;
        }
        seen.add(nums[right]);
        currSum += nums[right];
        maxSum = Math.max(maxSum, currSum);
    }
    return maxSum;
};`;

  return (
    <>
      <div className="min-h-screen bg-orange-100 p-6">
        <div className="mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center text-slate-800">
            Leetcode: Maximum Erasure Value
          </h1>

          <Card className="bg-gray-800 text-orange-100">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2">
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-semibold">📝 Problem Description</h2>
                  <p>
                    You are given an integer array <code>nums</code>. Let <b>uniqueScore</b> of a subarray be the sum of all elements, only if all the elements of that subarray are <b>unique</b> (no duplicates).
                    <br />
                    Find the <b>maximum possible uniqueScore</b> among all subarrays of <code>nums</code>.
                  </p>

                  <h2 className="text-2xl font-semibold">📘 Example</h2>
                  <pre className="bg-gray-700 p-4 rounded text-sm">
{`
Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The maximum sum of a subarray with all unique elements is [2,4,5,6] with sum 17.
`}
                  </pre>
                  <section>
                    <h2 className="text-2xl font-semibold">🛠️ Approach</h2>
                    <pre className="bg-gray-700 p-4 rounded text-sm mt-4">
{`
- Use a sliding window with a set to keep track of unique numbers.
- Expand the right pointer; if a duplicate is found, move the left pointer forward and 
  remove those elements from the set (and sum).
- Always update max sum as you go.
- This ensures only unique elements are in the window and we track the max sum.
`}
                    </pre>
                  </section>

                  <h2 className="text-2xl font-semibold">✅ Solution</h2>
                  <CodeBlock
                    text={maximumErasureValueCode}
                    language="javascript"
                    showLineNumbers={true}
                    theme={dracula}
                  />
                  <div className="mt-10">
                    <MaximumErasureValueInput />
                  </div>
                </div>
                <div>
                  <MaximumErasureValueVisualizer />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
