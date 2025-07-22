"use client";

import React from "react";
import { Card, CardContent } from "@/components/Cards/Card";
import { CodeBlock, dracula } from "react-code-blocks";
import ReverseLinkedListInput from "@/components/Animations/ReverseLinkList/ReverseLinklistInput";
import ReverseLinkedListVisualizer from "@/components/Animations/ReverseLinkList/ReverseLinkListVisualiser";

export default function reverseLinkedList() {
  const reverseLinkedListCode = `// Optimal - O(n) using two pointers
var reverseList = function(head) {
    let node = null;

    while (head) {
        const temp = head.next;
        head.next = node;
        node = head;
        head = temp;
    }

    return node;    
};`;

  return (
    <>
      <div className="min-h-screen bg-orange-100 p-6">
        <div className="mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-center text-slate-800">
            Leetcode: Reverse Linked List
          </h1>

          <Card className="bg-gray-800 text-orange-100">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2">
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-semibold">📝 Problem Description</h2>
                  <p>
                    Given the <code>head</code> of a singly linked list, reverse the
                    list, and return the reversed list.
                  </p>

                  <h2 className="text-2xl font-semibold">📘 Example</h2>
                  <pre className="bg-gray-700 p-4 rounded text-sm">
                    {`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
                    `}
                  </pre>
                  <section>
                    <h2 className="text-2xl font-semibold">🛠️ Approach</h2>
                    <pre className="bg-gray-700 p-4 rounded text-sm mt-4">
                      {`
Use a pointer node to build the reversed list starting from null.
Loop through each node: reverse its .next pointer to point to node,
then move both node and head forward.
Return node, which ends up pointing to the new head of the reversed list. ✅
                      `}
                    </pre>
                  </section>

                  <h2 className="text-2xl font-semibold">✅ Solutions</h2>
                  <CodeBlock
                    text={reverseLinkedListCode}
                    language="javascript"
                    showLineNumbers={true}
                    theme={dracula}
                  />
                  <ReverseLinkedListInput />
                </div>
                <div>
                  <ReverseLinkedListVisualizer />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
