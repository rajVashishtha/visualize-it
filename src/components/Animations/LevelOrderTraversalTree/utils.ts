/* eslint-disable @typescript-eslint/no-explicit-any */

export class TreeNode {
  right: TreeNode;
  val: string | number;
  left: TreeNode;
  constructor(val: number | string, left?: TreeNode, right?: TreeNode) {
    this.val = val;
    this.left = left as unknown as TreeNode;
    this.right = right as unknown as TreeNode;
  }
}

export function getLevelOrderTrace(root: TreeNode) {
  const trace: any[] = [];
  if (!root) return trace;

  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNodes = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelNodes.push(node?.val);

      trace.push({
        current: node?.val,
        queue: queue.map((n) => n.val),
        action: `Visited ${node?.val}`,
      });

      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }

    trace.push({
      level_complete: true,
      nodes: levelNodes,
    });
  }

  return trace;
}
