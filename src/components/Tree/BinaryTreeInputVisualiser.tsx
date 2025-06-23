/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as d3 from "d3";
import React, { JSX, useState, useEffect, useRef } from "react";
import { TreeNode } from "../Animations/LevelOrderTraversalTree/utils";

function convertToD3Hierarchy(root: TreeNode | null) {
  if (!root) return null;

  const wrap = (node: TreeNode): any => ({
    name: node.val,
    children: [
      node.left ? wrap(node.left) : null,
      node.right ? wrap(node.right) : null,
    ].filter(Boolean),
  });

  return d3.hierarchy(wrap(root));
}

function getTreeLayout(root: TreeNode | null) {
  const hierarchy = convertToD3Hierarchy(root);
  if (!hierarchy) return { nodes: [], lines: [] };

  const treeLayout = d3.tree().nodeSize([60, 80]); // [horizontalGap, verticalGap]
  const treeData = treeLayout(hierarchy);

  const nodes: JSX.Element[] = [];
  const lines: JSX.Element[] = [];

  treeData.descendants().forEach((d: any, i: React.Key | null | undefined) => {
    const x = d.x + 400; // center horizontally
    const y = d.y + 40;

    nodes.push(
      <g key={i}>
        <circle cx={x} cy={y} r="18" className="fill-indigo-500 stroke-white stroke-2" />
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

    if (d.parent) {
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
}


function buildTree(values: (number | null)[]): TreeNode | null {
  if (!values.length || values[0] === null) return null;
  const root: TreeNode = { val: values[0] as number, left: null as unknown as TreeNode, right: null as unknown as TreeNode };
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < values.length) {
    const current = queue.shift();
    if (!current) break;

    const leftVal = values[i++];
    const rightVal = values[i++];

    if (leftVal != null) {
      current.left = { val: leftVal, left: null as unknown as TreeNode, right: null as unknown as TreeNode };
      queue.push(current.left);
    }

    if (rightVal != null) {
      current.right = { val: rightVal, left: null as unknown as TreeNode, right: null as unknown as TreeNode };
      queue.push(current.right);
    }
  }

  return root;
}

// const TreeNodeBox = ({
//   x,
//   y,
//   value,
// }: {
//   x: number;
//   y: number;
//   value: number;
// }) => (
//   <>
//     <circle cx={x} cy={y} r="18" className="fill-indigo-500 stroke-white stroke-2" />
//     <text
//       x={x}
//       y={y + 5}
//       textAnchor="middle"
//       className="fill-white font-semibold text-sm"
//     >
//       {value}
//     </text>
//   </>
// );

// function renderTree(
//   node: TreeNode | null,
//   x: number,
//   y: number,
//   depth: number,
//   gap: number,
//   lines: JSX.Element[],
//   nodes: JSX.Element[]
// ) {
//   if (!node) return;

//   nodes.push(<TreeNodeBox key={x + '-' + y} x={x} y={y} value={node.val} />);

//   if (node.left) {
//     const newX = x - gap;
//     const newY = y + 80;
//     lines.push(
//       <line
//         key={`${x},${y}-left`}
//         x1={x}
//         y1={y}
//         x2={newX}
//         y2={newY}
//         className="stroke-gray-500"
//       />
//     );
//     renderTree(node.left, newX, newY, depth + 1, gap * 0.6, lines, nodes);
//   }

//   if (node.right) {
//     const newX = x + gap;
//     const newY = y + 80;
//     lines.push(
//       <line
//         key={`${x},${y}-right`}
//         x1={x}
//         y1={y}
//         x2={newX}
//         y2={newY}
//         className="stroke-gray-500"
//       />
//     );
//     renderTree(node.right, newX, newY, depth + 1, gap * 0.6, lines, nodes);
//   }
// }

interface Props {
  onTreeUpdate: (tree: TreeNode | null) => void;
}

export default function TreeInputVisualizer({ onTreeUpdate }: Props) {
  const [input, setInput] = useState("1,2,3,null,4,5,6");
  const [tree, setTree] = useState<TreeNode | null>(
    buildTree([1, 2, 3, null, 4, 5, 6])
  );
  const [error, setError] = useState("");
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    onTreeUpdate(tree);
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll("circle")
      .attr("r", 0)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .delay((_: any, i: number) => i * 80)
      .attr("r", 18)
      .style("opacity", 1);

    svg.selectAll("text")
      .style("opacity", 0)
      .transition()
      .duration(600)
      .delay((_: any, i: number) => i * 80 + 150)
      .style("opacity", 1);
  }, [tree]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value;
  setInput(raw);

  try {
    const parsed = raw
      .split(",")
      .map((v) => v.trim())
      .map((v) => {
        if (v === "null") return null;
        const num = parseInt(v, 10);
        if (isNaN(num)) throw new Error(`Invalid token "${v}"`);
        return num;
      });

    const tree = buildTree(parsed);
    setTree(tree);
    setError(""); // clear error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    setError(err.message || "Invalid input");
    setTree(null);
  }
};


  // const lines: JSX.Element[] = [];
  // const nodes: JSX.Element[] = [];
  // if (tree) renderTree(tree, 400, 40, 0, 160, lines, nodes); // center (x=400)

  const { nodes, lines } = getTreeLayout(tree);

  return (
    <div className="bg-orange-100 shadow p-6 rounded-lg space-y-6 text-slate-800">
      <h2 className="text-xl font-semibold text-gray-800">Tree Visualizer</h2>
      <label
        className="block font-lg"
      >
        Enter values to create a binary tree
      <input
        value={input}
        onChange={handleChange}
        placeholder="e.g., 1,2,3,null,4"
        className="w-full p-2 border border-gray-300 rounded"
      />
      </label>
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded text-sm">
          ❌ {error}
        </div>
      )}
    {
      !error && (
        <div className="overflow-auto border rounded bg-gray-100 mt-4 p-4">
          <svg ref={svgRef} width="1000" height="500" className="mx-auto">
            {lines}
            {nodes}
          </svg>
        </div>
      )
    }
    </div>
  );
}
