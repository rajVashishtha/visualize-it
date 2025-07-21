/* eslint-disable @typescript-eslint/no-explicit-any */
 
export type TraceStep = {
  values: number[];
  highlights: {
    prev: number | null;
    curr: number | null;
    next: number | null;
  };
  stepDescription: string;
};

type ListNode = {
  val: number;
  next: ListNode | null;
};

export function generateReverseLinkedListTrace(input: number[]): TraceStep[] {
  const trace: TraceStep[] = [];
  const nodes = input.map(val => ({ val, next: null as ListNode | null }));

  // Link all nodes
  nodes.forEach((node, i) => { node.next = nodes[i + 1] || null; });

  let prev: ListNode | null = null;
  let curr: ListNode | null = nodes[0] || null;

  // Helper: reconstruct the list starting at 'prev', then attach the rest from 'curr'
  function reconstructOrder(prevPtr: ListNode | null, currPtr: ListNode | null): number[] {
    const reversed: number[] = [];
    let n = prevPtr;
    while (n) { reversed.push(n.val); n = n.next; }
    const rest: number[] = [];
    n = currPtr;
    while (n) { rest.push(n.val); n = n.next; }
    return [...reversed, ...rest];
  }

  while (curr !== null) {
    const valuesPre = reconstructOrder(prev, curr);
    trace.push({
      values: valuesPre,
      highlights: {
        prev: prev ? valuesPre.indexOf(prev.val) : null,
        curr: valuesPre.indexOf(curr.val),
        next: curr.next ? valuesPre.indexOf(curr.next.val) : null
      },
      stepDescription: `Step ${trace.length + 1}: Set 'current' to node ${curr.val}${
        prev ? `, 'prev' is at node ${prev.val}` : ", 'prev' is null"
      }. Next, we'll reverse the 'next' pointer of 'current'.`
    });

    // Reverse step
    const next: any = curr.next;
    curr.next = prev;

    const valuesPost = reconstructOrder(curr, next);
    trace.push({
      values: valuesPost,
      highlights: {
        prev: valuesPost.indexOf(curr.val),
        curr: prev ? valuesPost.indexOf(prev.val) : null,
        next: next ? valuesPost.indexOf(next.val) : null
      },
      stepDescription: `Step ${trace.length + 1}: Reversed the pointer of node ${curr.val} to point to ${
        prev ? prev.val : "null"
      }. Moving 'prev' forward, and 'current' to ${next ? next.val : "null"}.`
    });

    prev = curr;
    curr = next;
  }

  // Final state
  const finalValues = reconstructOrder(prev, null);
  trace.push({
    values: finalValues,
    highlights: { prev: null, curr: null, next: null },
    stepDescription: `All nodes are now reversed. The algorithm is complete, and the head now points to node ${finalValues[0]}.`
  });

  return trace;
}



export function parseAndValidateInput(input: string): { valid: boolean; data?: number[]; error?: string } {
  try {
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (parts.length === 0) {
      return { valid: false, error: "Input cannot be empty." };
    }

    const numbers = parts.map((part) => {
      const num = Number(part);
      if (!Number.isInteger(num)) {
        throw new Error(`"${part}" is not a valid integer.`);
      }
      return num;
    });

    return { valid: true, data: numbers };
  } catch (error) {
    return { valid: false, error: (error as Error).message };
  }
}
