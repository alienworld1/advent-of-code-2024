if (import.meta.main) {
  const textContent = await Deno.readTextFile("actual.txt");
  const lines = textContent.split("\n");

  let numSafe = 0;
  let numDampenedSafe = 0;
  
  for (const line of lines) {
    const numbers = line.split(" ").map(Number);
    if (isSafe(numbers)) {
      numSafe++;
    }
    if (dampenedIsSafe(numbers)) {
      numDampenedSafe++;
    }
  }
  console.log('Number of safe records:', numSafe);
  console.log('Number of safe records (a single level is removed):', numDampenedSafe);
}

export function isSafe(list: number[]): boolean {
  if (list.length === 1) {
    return true;
  }

  const isIncreasing = list[1] > list[0];

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i + 1] === list[i] || list[i + 1] > list[i] !== isIncreasing) {
      return false;
    }

    const difference = isIncreasing ? list[i + 1] - list[i] : list[i] - list[i + 1];
    if (difference > 3) return false;
  }

  return true;
}

export function dampenedIsSafe(list: number[]): boolean {
  if (isSafe(list)) return true;

  if (list.length <= 2) {
    return true;
  }

  for (let i = 0; i < list.length; i++) {
    const newList = list.slice(0, i).concat(list.slice(i + 1));
    if (isSafe(newList)) {
      return true;
    }
  }

  return false;
}
