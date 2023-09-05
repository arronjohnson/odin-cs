// two functions which generate an array containing the first n Fibonacci numbers

// iterative
function fibs(n) {
  const sequence = [0, 1];
  if (n <= 2) return sequence.slice(0, n);
  for (let i = 2; i < n; i++) {
    sequence.push(sequence.at(-2) + sequence.at(-1));
  }
  return sequence;
}

// recursive
function fibsRec(n) {
  if (n <= 2) return [0, 1].slice(0, n);
  const sequence = fibsRec(n - 1);
  sequence.push(sequence.at(-2) + sequence.at(-1));
  return sequence;
}
