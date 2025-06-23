type ValidationResult = {
  valid: boolean;
  array: number[];
  target: number;
  errors: {
    array?: string;
    target?: string;
  };
};

export function validateTwoSumInputs(arrayInput: string, targetInput: string): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  let array: number[] = [];
  let target: number = NaN;

  // Validate array
  try {
    array = arrayInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map((s) => {
        const num = Number(s);
        if (isNaN(num)) throw new Error();
        return num;
      });

    if (array.length === 0) {
      errors.array = 'Array cannot be empty';
    }
  } catch {
    errors.array = 'Array must be a comma-separated list of numbers';
  }

  // Validate target
  target = Number(targetInput);
  if (isNaN(target)) {
    errors.target = 'Target must be a valid number';
  }

  const valid = Object.keys(errors).length === 0;
  return { valid, array, target, errors };
}

export function generateTwoSumCase(length: number, target: number): number[] {
  const arr: number[] = [];
  const idx1 = Math.floor(Math.random() * (length - 1));
  const idx2 = Math.floor(Math.random() * (length - 1));
  const val1 = Math.floor(Math.random() * 90) + 10;

  let val2 = target - val1;
  if (val2 === val1) val2 += 1;

  for (let i = 0; i < length; i++) {
    if (i === idx1) arr.push(val1);
    else if (i === idx2) arr.push(val2);
    else arr.push(Math.floor(Math.random() * 90) + 10);
  }

  return arr;
}
