export function generateMaxErasureTraces(nums: number[]) {
  const traces = [];
  const seen = new Set<number>();
  let left = 0, currSum = 0, maxSum = 0;

  for (let right = 0; right < nums.length; right++) {
    while (seen.has(nums[right])) {
      traces.push({
        left,
        right,
        currSum,
        maxSum,
        window: Array.from(seen),
        hashState: Array.from(seen),
        action: `Remove nums[${left}] = ${nums[left]}`,
      });

      seen.delete(nums[left]);
      currSum -= nums[left];
      left++;
    }

    seen.add(nums[right]);
    currSum += nums[right];
    maxSum = Math.max(maxSum, currSum);

    traces.push({
      left,
      right,
      currSum,
      maxSum,
      window: Array.from(seen),
      hashState: Array.from(seen),
      action: `Add nums[${right}] = ${nums[right]}`,
    });
  }

  return traces;
}
