/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useRef, JSX } from "react";
import * as d3 from "d3";
import { getLevelOrderTrace, TreeNode } from "./utils";

function LevelOrderVisualizer({ root }: { root: TreeNode | null }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<any>(null);

  const traceData = getLevelOrderTrace(root as TreeNode);
  const step = traceData.length > 0 ? traceData[stepIndex] : null;

  const play = () => {
    if (stepIndex >= traceData.length - 1) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= traceData.length - 1) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isPlaying ? pause() : play();
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const convertToD3Hierarchy = (root: TreeNode | null) => {
    if (!root) return null;
    const wrap = (node: TreeNode): any => ({
      name: node.val,
      children: [
        node.left ? wrap(node.left) : null,
        node.right ? wrap(node.right) : null,
      ].filter(Boolean),
    });
    return d3.hierarchy(wrap(root));
  };

  const getTreeLayout = (root: TreeNode | null) => {
    const hierarchy = convertToD3Hierarchy(root);
    if (!hierarchy) return { nodes: [], lines: [] };

    const treeLayout = d3.tree().nodeSize([60, 80]);
    const treeData = treeLayout(hierarchy);

    const nodes: JSX.Element[] = [];
    const lines: JSX.Element[] = [];

    treeData.descendants().forEach((d: any, i: number) => {
      const x = d.x + 400;
      const y = d.y + 40;
      const isActive = step && step.current == d.data.name;

      nodes.push(
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r="18"
            className={`stroke-white stroke-2 ${
              isActive ? 'fill-green-500 animate-ping-fast' : 'fill-indigo-500'
            }`}
            data-node-id={d.data.name}
          />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            className="fill-white font-semibold text-sm"
          >
            {d.data.name}
          </text>
        </g>
      );

      if (d.parent && traceData.findIndex(s => s.current == d.data.name) <= stepIndex) {
        const px = d.parent.x + 400;
        const py = d.parent.y + 40;
        lines.push(
          <line
            key={`line-${i}`}
            x1={px}
            y1={py}
            x2={x}
            y2={y}
            className="stroke-gray-500"
          />
        );
      }
    });

    return { nodes, lines };
  };

  const { nodes, lines } = getTreeLayout(root);

  if (!step) return null;

  return (
    <div className="bg-gray-100 p-6 font-mono">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded shadow-md space-y-4 relative">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">
          Level Order Traversal Visualizer
        </h1>

        {/* Controls */}
        <div className="flex justify-between mb-4">
          <div>
            Step: {stepIndex + 1}/{traceData.length}
          </div>
          <button
            onClick={togglePlay}
            className={`px-4 py-1 rounded text-white font-semibold shadow ${
              isPlaying ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {/* Tree Layout */}
        <div className="overflow-auto border rounded bg-gray-100 mt-4 p-4">
          <svg width="1000" height="500" className="mx-auto">
            {lines}
            {nodes}
          </svg>
        </div>

        {/* Step Info */}
        {step?.level_complete ? (
          <div className="bg-green-100 p-4 rounded border border-green-500 text-green-700">
            ✅ Completed Level: {JSON.stringify(step.nodes)}
          </div>
        ) : (
          <>
            <div className="text-lg text-gray-800">
              🧠 Visiting Node: <span className="text-blue-600 font-bold">{step.current}</span>
            </div>
            <div className="text-gray-700">
              📦 Queue: {" "}
              {step.queue.map((val: string, i: number) => (
                <span
                  key={i}
                  className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 m-1 rounded border"
                >
                  {val}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LevelOrderVisualizer;