export type TraceStep = {
  index: number;                    // current index being checked
  num: number;                      // value at current index
  complement: number;              // target - num
  hashmap: Record<number, number>; // current hashmap state
  action: 'check' | 'found';        // what's happening
  result?: [number, number];        // indices of the result (if found)
};


export function generateTwoSumTrace(nums: number[], target: number): TraceStep[] {
  const trace: TraceStep[] = [];
  const hashmap: Record<number, number> = {};

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    // Create a snapshot of the current state
    const snapshot: TraceStep = {
      index: i,
      num,
      complement,
      hashmap: { ...hashmap },
      action: 'check',
    };

    if (complement in hashmap) {
      snapshot.action = 'found';
      snapshot.result = [hashmap[complement], i];
      trace.push(snapshot);
      break; // stop after finding the result
    }

    hashmap[num] = i;
    trace.push(snapshot);
  }

  return trace;
}
