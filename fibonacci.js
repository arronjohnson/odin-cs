// two functions which generate an array containing the first n Fibonacci numbers

// iterative
function fibs(n) {
  return Array.from({ length: n }).reduce(
    (acc, _, i) => acc.concat(i < 2 ? i : acc.at(-2) + acc.at(-1)),
    []
  );
}

// recursive
function fibsRec(n) {
  if (n <= 2) return [0, 1].slice(0, n);
  const sequence = fibsRec(n - 1);
  sequence.push(sequence.at(-2) + sequence.at(-1));
  return sequence;
}
