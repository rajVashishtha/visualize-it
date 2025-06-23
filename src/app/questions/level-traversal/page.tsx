'use client';

import React from "react";
import { Card, CardContent } from "@/components/Cards/Card";
import { CodeBlock, dracula } from "react-code-blocks";
import LevelTraversalAnimationSection from "@/components/Animations/LevelOrderTraversalTree/AnimationSection";

const levelOrderCode = `// JavaScript - Level Order Traversal
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const level = [];
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}`;

export default function LevelOrderPage() {
  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Leetcode: Level Order Traversal
        </h1>

        <Card className="bg-gray-800 text-orange-100">
          <CardContent className="p-6 space-y-6">
            {/* Problem Description */}
            <section>
              <h2 className="text-2xl font-semibold">📝 Problem Description</h2>
              <p className="mt-5">
                Given the <code>root</code> of a binary tree, return the level order traversal of its nodes’ values.
              </p>
              <p>
                (i.e., from left to right, level by level).
              </p>
            </section>

            {/* Example */}
            <section>
              <h2 className="text-2xl font-semibold">📘 Example</h2>
              <pre className="bg-gray-700 p-4 rounded text-sm mt-5">
{`
Input: root = [1,2,3,4,5,6,7]
Output: [[1],[2,3],[4,5,6,7]]
`}
              </pre>
            </section>

            {/* Approach */}
            <section>
              <h2 className="text-2xl font-semibold">🛠️ Approach</h2>
              <pre className="bg-gray-700 p-4 rounded text-sm mt-5">
{`
Use Breadth-First Search (BFS) with a queue:
- Start by enqueuing the root
- For each level, process all nodes at that depth
- Push left and right children of each node to the queue
- Save each level’s node values as a list
`}
              </pre>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-2xl font-semibold mb-5">✅ Solution</h2>
              <CodeBlock
                text={levelOrderCode}
                language="javascript"
                showLineNumbers={true}
                theme={dracula}
              />
            </section>
            <LevelTraversalAnimationSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
