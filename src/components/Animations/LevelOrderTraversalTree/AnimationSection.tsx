import TreeInputVisualizer from "@/components/Tree/BinaryTreeInputVisualiser";
import { ExternalLink } from "lucide-react"
import { useState } from "react";
import { TreeNode } from "./utils";
import Modal from "@/components/Modal";
import LevelOrderVisualizer from "./LevelOrderVisualizer";

const LevelTraversalAnimationSection = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [tree, setTree] = useState<TreeNode | null>(null);

  const navigateToLeetcode = () => {
    window.open("https://leetcode.com/problems/binary-tree-level-order-traversal/description/", "_blank");
  }

  const handleTreeUpdate = (tree: TreeNode | null) => {
    setTree(tree);
  }

  const toggleVisualizerModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div>
        <TreeInputVisualizer 
          onTreeUpdate={handleTreeUpdate}
        />
      </div>
      <div className="mt-10 pt-10 flex justify-end space-x-3 text-lg">
        <button
          className="inline-flex items-center gap-x-1 bg-orange-100 text-slate-800 px-4 py-2 rounded shadow"
          onClick={navigateToLeetcode}
        >
          Solve on Leetcode
          <ExternalLink className="w-4 h-4" />
        </button>
        <button onClick={toggleVisualizerModal}disabled={!tree} className="bg-green-700 text-white px-4 py-2 rounded shadow">Animate</button>
      </div>
      <Modal 
        isOpen={isOpen}
        onClose={toggleVisualizerModal}
        title="Animate"
      >
        <LevelOrderVisualizer 
          root={tree}
        />
      </Modal>
    </div>
  )
}

export default LevelTraversalAnimationSection;