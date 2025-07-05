
export interface MinSubarraySumTraceStep {
  start: number;
  end: number;
  sum: number;
  minLength: number;
  action: 'expand' | 'shrink' | 'update_min';
  description: string;
}

export function generateMinSubarrayTraces(nums: number[], target: number): MinSubarraySumTraceStep[] {
  const trace: MinSubarraySumTraceStep[] = [];
  let minLen = Infinity;
  let left = 0;
  let curSum = 0;

  for (let right = 0; right < nums.length; right++) {
    curSum += nums[right];
    trace.push({
      start: left,
      end: right,
      sum: curSum,
      minLength: minLen,
      action: 'expand',
      description: `Expanded window to include nums[${right}] = ${nums[right]}. Current sum = ${curSum}.`,
    });

    while (curSum >= target) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        trace.push({
          start: left,
          end: right,
          sum: curSum,
          minLength: minLen,
          action: 'update_min',
          description: `Found smaller window from ${left} to ${right}. Updated minimum length to ${minLen}.`,
        });
      }

      curSum -= nums[left];
      trace.push({
        start: left,
        end: right,
        sum: curSum,
        minLength: minLen,
        action: 'shrink',
        description: `Shrinking window. Removed nums[${left}] = ${nums[left]}. New sum = ${curSum}.`,
      });

      left++;
    }
  }

  return trace;
}

export function generateMinSumCase(size: number, maxValue: number = 100): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1); // values from 1 to maxValue
  }
  return arr;
}

export function validateMinSumInputs(arrayInput: string, targetInput: string) {
  const errors: Record<string, string> = {};
  let array: number[] = [];
  const target = Number(targetInput);

  // Validate array
  try {
    array = arrayInput
      .split(',')
      .map(str => parseInt(str.trim()))
      .filter(num => !isNaN(num));
    if (array.length === 0) {
      errors.array = 'Array must contain at least one valid number.';
    }
  } catch {
    errors.array = 'Invalid array input.';
  }

  // Validate target
  if (isNaN(target) || target <= 0) {
    errors.target = 'Target must be a positive number.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    array,
    target,
    errors,
  };
}
