export const generateLinearNumericArray = (
  limit: number,
  min = 0,
): number[] => {
  const linearNumericArray: number[] = [];
  let current = min;

  while (current < limit) {
    linearNumericArray.push(current);
    current += 1;
  }

  return linearNumericArray;
};

export const getRandomInt = (): number => {
  const intArray = new Uint32Array(1);
  window.crypto.getRandomValues(intArray);
  return intArray[0] ?? 0;
};

export const getRandomIntWithLimit = (limit: number): number =>
  getRandomInt() % limit;

export const getUniqueRandomIntsWithLimit = (
  limit: number,
  count: number,
  min = 0,
): number[] => {
  const randomNumArray: number[] = [];
  const availableInts = generateLinearNumericArray(limit, min);

  for (let i = 0; i < count; i += 1) {
    const nextIndex = getRandomIntWithLimit(availableInts.length);
    const nextValue = availableInts[nextIndex];

    if (nextValue === undefined) {
      break;
    }

    randomNumArray.push(nextValue);
    availableInts.splice(nextIndex, 1);
  }

  return randomNumArray;
};

export const randomCheck = (threshold: number): boolean =>
  getRandomIntWithLimit(10) < threshold;
